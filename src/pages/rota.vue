<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { ref, onUnmounted, onMounted, watchEffect} from "vue";

import Slide from '../components/slideBinary/slideBinary.vue'

// componentes
import { MissionItem } from '../types/misson.ts'
import { Polyline } from '../types/polyline.ts'
import { Mwp } from '../types/mwp.ts'

// icones de marcadores
import iconBlue from '../assets/marker-icon-blue.svg'
import iconRed from '../assets/marker-icon-red.svg'

let mapContainer = ref()
let map: L.Map
// camadas independentes que armazenam os marcadores e as linhas
let layerGroup = L.layerGroup()
let layerGroupLines = L.layerGroup()

let defaultIcon = new L.Icon({
    iconUrl: iconBlue,
    iconSize: [40, 40],
    iconAnchor: [20, 33],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});

let clickedIcon = new L.Icon({
    iconUrl: iconRed,
    iconSize: [40, 40],
    iconAnchor: [20, 33],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
});

// armazena os dados dos pontos para criar arquivo
let listPoint = ref<Array<MissionItem>>([]) //meta dados
let listMarker = ref<Array<any>>([]) //marcadores visuais

let mwpRef = ref<Mwp>()
// armazena as linhas do mapa
let polylines = ref<Array<any>>([]) //metadados
let polylineRef = ref<any>() //referencia da linhas visuais


let listTypeWP = ref<Array<string>>(['WAYPOINT', 'POSHOLD_TIME', 'SET_POI', 'LAND'])
let fileContent = ref<string | ArrayBuffer | null | undefined>('')

// inputs
let inputKey = ref(Date.now())
let nameFile = ref<string>('')

let indexPoint = ref<number>(0)
let typeInput = ref<string>('WAYPOINT')
let latInput = ref<number>(0)
let lonInput = ref<number>(0)
let heightInput = ref<number>(0)
let distance = ref<number>(0)
let refMar = ref<boolean>(false)
let centerX = ref<number>(-7.123134)
let centerY = ref<number>(-41.688980)
let zoom = ref<number>(4)
let speedInput = ref<number>(0)
let waitTimeInput = ref<number>(0)

let isPHTIMEactive = ref<boolean>(false)
let warningActive = ref<boolean>(false)


onMounted(() => {
    

    // o mapa vai iniciar com o centro e zoom nesses valores
    map = L.map(mapContainer.value).setView([centerX.value, centerY.value], zoom.value)


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map)


    layerGroup.addTo(map)
    layerGroupLines.addTo(map)

    map.on('click', addMarker)
})

const addMarker = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng

    let point = new MissionItem(listPoint.value.length+1, typeInput.value, lat, lng, heightInput.value || 1, speedInput.value || 1, refMar.value ? 1 : 0, waitTimeInput.value, 0)
    listPoint.value.push(point)

    const marker = L.marker(e.latlng, { icon: defaultIcon}) //, draggable: true

    listMarker.value.push(marker)
    polylines.value.push(e.latlng)

    marker.addTo(layerGroup)

    const polyline = L.polyline([polylines.value]).addTo(layerGroupLines)
    polylineRef.value = polyline

    marker.on('click', (e: L.LeafletMouseEvent) => {

        const { lat, lng } = e.latlng

        // troca a cor quando clica
        setAllMarkersToDefault()
        const currentIcon = marker.getIcon()
        marker.setIcon(currentIcon === defaultIcon ? clickedIcon : defaultIcon)

        // atualiza os inputs 
        listPoint.value.forEach((point) => {
            if (point.lat == lat, point.lon == lng) {

                indexPoint.value = point.no
                typeInput.value = point.action
                latInput.value = point.lat
                lonInput.value = point.lon
                heightInput.value = point.alt
                speedInput.value = point.parameter1
                point.parameter1 = speedInput.value || 1
                refMar.value = point.parameter2 ? true : false
                waitTimeInput.value = point.parameter3
            }
        })

    })
    marker.on('dragend', dragendingMarker)

    // calcula a distancia de todos os pontos
    updateDistance()
}
const dragendingMarker = (e: any) => {
    const { lat, lng } = e.latlng
    latInput.value = lat
    lonInput.value = lng
    console.log(e)
}

// vai atualizar a cor do marcador quando clicar no marcador
const setAllMarkersToDefault = () => {
    listMarker.value.forEach(marker => {
        marker.setIcon(defaultIcon);
    });
};

// deletar todos os estados
const deleteAllPoints = () => {

    listPoint.value = []
    polylines.value = []

    listMarker.value = []

    // // inputs
    distance.value = 0
    indexPoint.value = 0
    lonInput.value = 0
    latInput.value = 0
    heightInput.value = 0
    refMar.value = false
    speedInput.value = 0

    // // arquivo
    nameFile.value = ''
    fileContent.value = ''

    layerGroup.clearLayers()
    layerGroupLines.clearLayers()

    inputKey.value = Date.now()
}

// delete um ponto especifico
const deletePoint = () => {
    

    listPoint.value.forEach((point) => {

        if (point.no == indexPoint.value) {

            // remove dado do array
            listPoint.value.splice(indexPoint.value-1, 1)

            // remove todas as linhas
            layerGroupLines.clearLayers()
            // tira da lista a linha que nao existe mais
            polylines.value.splice(indexPoint.value-1, 1)

            // adiciona a lista o novo caminh
            polylineRef.value.setLatLngs(polylines.value)
            // add o novo caminho a camada
            polylineRef.value.addTo(layerGroupLines)

            // remove o ponto mapa
            const marker = listMarker.value.splice(indexPoint.value-1, 1)
            layerGroup.removeLayer(marker[0])

        }

    })

    // reorganiza os indices do array de dados apos ser apagado
    for (let i = 0; i < listPoint.value.length; i++) {
        listPoint.value[i].no = i+1
    }

    // atualiza os valores de distancia apos apagar algum ponto
    distance.value = 0
    updateDistance()
}

watchEffect(() => {

    // quando houver algum alteracao nos valores
    listPoint.value.map((point) => {
        if (point.lat == latInput.value, point.lon == lonInput.value) {

            indexPoint.value = point.no
            point.action = typeInput.value
            point.alt = heightInput.value || 1
            point.parameter1 = speedInput.value || 10
            point.parameter2 = refMar.value ? 1 : 0

            if (typeInput.value == 'POSHOLD_TIME') {
                isPHTIMEactive.value = true
                point.parameter3 = waitTimeInput.value
            } else {
                isPHTIMEactive.value = false
                waitTimeInput.value = 0
            }
        }

    })

    // ajuste para centralizar o mapa nos pontos marcados
    if (listPoint.value.length > 1) {
        mwpRef.value = new Mwp(listPoint.value[0].lat, listPoint.value[0].lon, 0, 0, 14)
    }

})

// destruindo os valores
onUnmounted(() => {
    deleteAllPoints()
})

const downloadFile = () => {
    console.log(mwpRef.value)
    console.log(listPoint.value)
}

// lendo o arquivo upado
const getValueFile = (event: any) => {

    deleteAllPoints()
    console.log('passou getvalue')
    let valor = event.target.files[0]
    nameFile.value = valor.name
    const reader = new FileReader()

    reader.onload = (e) => {

        fileContent.value = e.target?.result

        if (typeof fileContent.value === 'string') {
            const { missionItems, polyline } = parseMissonItems(fileContent.value)

            console.log(missionItems, polyline)
            listPoint.value = missionItems
            // polylines.value = polyline
            map.setView([centerX.value, centerY.value], zoom.value)

            listPoint.value.forEach((item) => {
                const marker = L.marker([item.lat, item.lon], { icon: defaultIcon }).addTo(layerGroup)

                listMarker.value.push(marker)
                polylines.value.push([item.lat, item.lon])

                marker.on('click', (e: L.LeafletMouseEvent) => {
                    const { lat, lng } = e.latlng
                    
                    setAllMarkersToDefault()
                    
                    const currentIcon = marker.getIcon()
                    marker.setIcon(currentIcon === defaultIcon ? clickedIcon : defaultIcon)
                    listPoint.value.forEach((point) => {
                        if (point.lat == lat, point.lon == lng) {

                            indexPoint.value = point.no
                            typeInput.value = point.action
                            latInput.value = point.lat
                            lonInput.value = point.lon
                            heightInput.value = point.alt
                            speedInput.value = point.parameter1
                            point.parameter1 = speedInput.value || 1
                            refMar.value = point.parameter2 ? true : false
                            waitTimeInput.value = point.parameter3
                        }
                    })
                })

                const polyline = L.polyline([polylines.value]).addTo(layerGroupLines)
                polylineRef.value = polyline
            })
        }

    }
    reader.onerror = (e) => {
        console.error('Erro ao ler o arquivo:', e);
    };
    reader.readAsText(valor)


}

// traduzindo arquivo string para xml e depois para objeto
const parseMissonItems = (xmlString: string) => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlString, "application/xml")

    const parseError = xmlDoc.getElementsByTagName("parsererror")
    if (parseError.length > 0) {
        throw new Error("Erro ao fazer parsing do XML")
    }

    let missionItems: Array<MissionItem> = []
    let polyline: Array<Polyline> = []
    let acumulador = 0
    const missionItemElements = xmlDoc.getElementsByTagName('missionitem')
    const mwp = xmlDoc.getElementsByTagName('mwp')

    // pegar o valor de zoom do arquivo
    for (let i = 0; i < mwp.length; i++) {
        const item = mwp[i]
        let zoomFile = item.getAttribute("zoom")
        let centerx = item.getAttribute("cx")
        let centery = item.getAttribute("cy")
        if (zoomFile != null && centerx != null && centery != null) {
            console.log(`valor: ${zoomFile}`)
            zoom.value = parseInt(zoomFile)
            centerX.value = parseInt(centerx)
            centerY.value = parseInt(centery)
        }
    }

    for (let i = 0; i < missionItemElements.length; i++) {
        const item = missionItemElements[i]

        //analisa os dados do arquivo e converter para criar os vertices
        const missionItem = new MissionItem(
            parseInt(item.getAttribute("no") || "0", 10),
            item.getAttribute("action") || 'WAYPOINT',
            parseFloat(item.getAttribute("lat") || "0"),
            parseFloat(item.getAttribute("lon") || "0"),
            parseFloat(item.getAttribute("alt") || "0"),
            parseInt(item.getAttribute("parameter1") || "0"),
            parseInt(item.getAttribute("parameter2") || "0"),
            parseInt(item.getAttribute("parameter3") || "0"),
            parseInt(item.getAttribute("flag") || "0", 10),
        )
        // analisa os dados do arquivo e converte para criar as arestas
        const polylineItem = new Polyline(
            parseFloat(item.getAttribute("lat") || "0"),
            parseFloat(item.getAttribute("lon") || "0")
        )

        // carrega a lista pra apresentar
        polyline.push(polylineItem)
        missionItems.push(missionItem)


    }
    // vai passar entre as arestas e calcular a distancia de cada, enquanto soma todo no acumulador
    for (let i = 0; i < polyline.length - 1; i++) {
        acumulador = acumulador + distanceCalculation(polyline[i].lat, polyline[i].lon, polyline[i + 1].lat, polyline[i + 1].lon)
    }
    // preenche os campos de input
    latInput.value = missionItems[0].lat
    lonInput.value = missionItems[0].lon
    centerX.value = missionItems[0].lat
    centerY.value = missionItems[0].lon

    heightInput.value = missionItems[0].alt
    distance.value = Math.round(acumulador)
    speedInput.value = missionItems[0].parameter1

    if (missionItems[0].parameter3 == 0) {
        refMar.value = false
    } else {
        refMar.value = true

    }




    return { missionItems, polyline }
}

const updateDistance = () => {
    // calcula a distancia de todos os pontos
    if (listPoint.value.length > 1) {
        // vai pegar o antipenultimo e o ultimo ponto, calcular a distancia e soma ao que ja foi calculado 
        for (let i = listPoint.value.length - 2; i < listPoint.value.length - 1; i++) {

            distance.value = distance.value + distanceCalculation(listPoint.value[i].lat, listPoint.value[i].lon, listPoint.value[i + 1].lat, listPoint.value[i + 1].lon)

        }

    }
}

let toRadians = (degress: number) => {
    return degress * (Math.PI / 180)
}
// calcula a distancia em metros da rota 
let distanceCalculation = (lat1: number, lon1: number, lat2: number, lon2: number) => {

    let R = 6371000 //raio da terra em metros

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = R * c

    return distance

}
// vai pegar o estado do slide
const handleStateChanged = (newState: boolean) => {

    refMar.value = newState

}
const switchPopupDelete = () => {
    warningActive.value = !warningActive.value
}

const confirmDeleteAllPoint = () => {
    deleteAllPoints()
    switchPopupDelete()
}
</script>

<template>

    <div class="w-100% h-100% z-0 flex">

        <!-- menu lateral -->
        <div class="bg-white dark:bg-gray-900 dark:color-gray rounded-xl min-w-380px max-w-380px h-97% m-4 ">
            <div class=" pt-15px pl-15px w-full">
                <h4 class="mb-5px font-bold text-5">Menu de ações</h4>
            </div>
            <ul class="list-none px-15px flex justify-around">

                <li class="mr-2">

                    <div class="w-full flex mb-5px  text-white bg-blue-500 hover:bg-blue-600 rounded-1 ">
                        <label for="inputFoto"
                            class="shadow flex font-bold justify-center items-center w-full p-2 text-sm">
                            <font-awesome-icon class="pr-5px" icon="fa-solid fa-file-arrow-up" />
                            <h4 class="flex justify-center items-center">Carregar arquivo</h4>
                        </label>

                        <input :key="inputKey" @change="getValueFile" name="image" id="inputFoto" type="file" class="hidden">
                    </div>

                </li>

                <li class="mr-2"> <button @click="downloadFile"
                        class=" text-sm shadow w-full flex items-center font-120px p-2 mb-5px  bg-blue-500 hover:bg-blue-600 text-white  rounded-1">
                        <font-awesome-icon class="pr-5px" icon="fa-solid fa-file-arrow-down" />
                        <h4>Baixar arquivo</h4>
                    </button> </li>
                <li class="mr-2"> <button @click="switchPopupDelete"
                        class="shadow w-full flex items-center text-sm p-2 mb-5px bg-red-500 hover:bg-red-600 text-white  rounded-1"><font-awesome-icon
                            class="pr-5px" icon="fa-solid fa-trash" />
                        <h4>Deletar todos os pontos</h4>
                    </button> </li>
            </ul>
            <ul class="list-none p-4 ">
                <li>
                    <h4>Informações do arquivo</h4>
                </li>
                <li class="mb-5px">Nome do arquivo carregado: <label class="color-blue" for="">{{ nameFile }}</label>
                </li>
                <li class="mb-5px">Distância (m): {{ Math.round(distance) }}</li>
            </ul>
            <ul class="list-none px-15px ">
                <li>
                    <h4 class="flex">Editar ponto: {{ indexPoint }}</h4>
                </li>
                <!-- tipo -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px "><label for="">Tipo:</label></div> <select v-model="typeInput"
                        class="border-solid border-gray border-1px rounded-md w-165px h-20px px-1 dark:bg-gray-800 dark:color-gray dark:border-gray-700" id="">
                        <option v-for="types in listTypeWP" :value="types">{{ types }}</option>
                    </select>
                </li>
                <!-- latitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"> <label for="">Latitude:</label> </div>
                    <input v-model="latInput" class="border-solid border-gray border-1px rounded-md h-20px px-1 dark:bg-gray-800 dark:color-gray dark:border-gray-700"
                        type="text" name="" id="">
                </li>
                <!-- longitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Longitude:</label> </div>
                    <input v-model="lonInput" class="border-solid border-gray border-1px rounded-md h-20px px-1 dark:bg-gray-800 dark:color-gray dark:border-gray-700"
                        type="text" name="" id="">
                </li>
                <!-- altitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Altura (m):</label> </div>
                    <input v-model="heightInput" class="border-solid border-gray border-1px rounded-md h-20px px-1 dark:bg-gray-800 dark:color-gray dark:border-gray-700"
                        type="number" min="0" max="100" name="" id="">

                </li>
                <!-- slider -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Referência do nível do mar:</label> </div>
                    <Slide :parentState="refMar" @stateChanged="handleStateChanged" />

                </li>
                <li class="flex items-center mb-10px">
                    <div class="w-120px "><label for="">Elevação (m):</label> </div>
                    <h5>10</h5>

                </li>
                <li class="flex items-center mb-10px">
                    <div class="w-120px "><label for="">Distância de Grau (m):</label> </div>
                    <h5>50</h5>

                </li>
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Velocidade (cm/s):</label> </div>
                    <input v-model="speedInput" class="border-solid border-gray border-1px rounded-md h-20px px-1 dark:bg-gray-800 dark:color-gray dark:border-gray-700"
                        type="number" min="0" max="1000" name="" id="">

                </li>
                <li v-if="isPHTIMEactive" class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Tempo de espera (s):</label> </div>
                    <input v-model="waitTimeInput" class="border-solid border-gray border-1px rounded-md h-20px px-1 dark:bg-gray-800 dark:color-gray dark:border-gray-700"
                        type="number" min="1" max="1000" name="" id="">

                </li>
                <li class="flex items-center mb-10px">
                    <button @click="deletePoint"
                        class="shadow w-100% flex items-center p-2 mb-5px hover:bg-red-600  text-white bg-red-500 rounded-1">
                        <font-awesome-icon class="pr-5px" icon="fa-solid fa-trash" />
                        <h4>Deletar ponto</h4>
                    </button>
                </li>
            </ul>

        </div>

        <!-- mapa -->
        <div id="map" ref="mapContainer" class="w-full h-full"></div>

        <!-- fundo popup -->
        <div v-if="warningActive" class="w-100% h-92% z-1000 flex fixed justify-center items-center backdrop-blur-sm">

            <!-- popup -->
            <div
                class="w-500px h-80px shadow flex fixed justify-around items-center bg-white rounded-2 border-solid border-l-4 border-l-blue-500 dark:bg-gray-900 dark:color-white dark:border-l-blue-900">
                <h4>Quer mesmo deletar tudo?</h4>
                <div class="flex">

                    <button @click="switchPopupDelete"
                        class="w-100px h-40px shadow  flex items-center justify-center p-2 mx-5px text-black hover:bg-gray-100 bg-white rounded-1 dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700">
                        <h4>Cancelar</h4>
                    </button>

                    <button @click="confirmDeleteAllPoint"
                        class="w-100px h-40px shadow flex items-center justify-center p-2 mx-5px text-white hover:bg-red-600 bg-red-500 rounded-1 ">
                        <h4>Deletar</h4>
                    </button>
                </div>

            </div>
        </div>

    </div>
</template>
