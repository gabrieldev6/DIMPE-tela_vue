<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import { LMap, LTileLayer, LMarker, LPolyline, LPopup } from "@vue-leaflet/vue-leaflet";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { ref, onUnmounted, onMounted, watchEffect} from "vue";

import Slide from '../components/slideBinary/slideBinary.vue'
import { MissionItem } from '../types/misson.ts'
import { Polyline } from '../types/polyline.ts'

let listMark = ref<Array<L.Marker>>([])
let polylines = ref<Array<L.Polyline>>([])
let auxpolylines = ref<Array<Array<number>>>([])
let fileContent = ref<string | ArrayBuffer | null | undefined>('')
    
let nameFile = ref<string>('') 
let index = ref<number>(0)
let listTypeWP = ref<Array<string>>(['Waypoint', 'PH_TIME', 'POI', 'Land'])
let latInput = ref<number>()
let lonInput = ref<number>()
let heightInput = ref<number>()
let distance = ref<number>()
let refMar = ref<boolean>(false)
let centerX = ref<number>(-7.123134)
let centerY = ref<number>(-41.688980)
let zoom = ref<number>(4)
let speed = ref<number>()

onMounted(()=> {
    // o mapa vai iniciar com o centro e zoom nesses valores
    let map = L.map('map').setView([-7.123134, -41.688980], 4)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'}).addTo(map)
    
    // adiciona ação de click
    map.on('click', (e)=> {
        const {lat, lng} = e.latlng
        
        index.value = index.value + 1

        latInput.value = lat
        lonInput.value = lng
        
        auxpolylines.value.push([lat, lng])
        
        let markador = L.marker([lat, lng]).addTo(map).bindPopup('ponto: '+ index.value).openPopup()
        
        markador.on('click', (e) => {

            const {lat, lng} = e.latlng
            console.log(e)
            latInput.value = lat
            lonInput.value = lng
            heightInput.value = index.value
        })

        
        L.polyline(auxpolylines.value).addTo(map)
        
    })

})









watchEffect(()=> {
    // if(listMark.value != undefined && latInput.value && lonInput.value) {
    //     listMark.value[listMark.value.length-1].setLatLng([latInput.value, lonInput.value])
    //     auxpolylines.value[listMark.value.length-1].lat = latInput.value
    //     auxpolylines.value[listMark.value.length-1].lng = lonInput.value
    // }
    
})

// destruindo os valores
onUnmounted(() => {

    listMark.value = []
    polylines.value = []
    fileContent.value = ""

})


// lendo o arquivo upado
let pegarValor = async (event: any) => {
    let valor = event.target.files[0]
    nameFile.value = valor.name
    const reader = new FileReader()

    reader.onload = (e) => {

        fileContent.value = e.target?.result

        // if (typeof fileContent.value === 'string') {
        //     const { missionItems, polyline } = parseMissonItems(fileContent.value)
        //     listMark.value = missionItems
        //     polylines.value = polyline

        // }

    }
    reader.onerror = (e) => {
        console.error('Erro ao ler o arquivo:', e);
    };
    reader.readAsText(valor)


}

// traduzindo arquivo string para xml e depois para objeto
let parseMissonItems = (xmlString: string) => {
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

    // val pegar o valor de zoom do arquivo
    for (let i = 0; i < mwp.length; i++) {
        const item = mwp[i]
        let valor = item.getAttribute("zoom")
        if(valor != null) {
            
            zoom.value = parseInt(valor)
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
    for(let i = 0; i < polyline.length-1; i++) {
        acumulador = acumulador + distanceCalculation(polyline[i].lat, polyline[i].lon, polyline[i+1].lat, polyline[i+1].lon)
    }
    // preenche os campos de input
    latInput.value = missionItems[0].lat
    lonInput.value = missionItems[0].lon
    centerX.value = missionItems[0].lat
    centerY.value = missionItems[0].lon
    
    heightInput.value = missionItems[0].alt
    distance.value = Math.round(acumulador)
    speed.value = missionItems[0].parameter1

    if(missionItems[0].parameter3 == 0) {
        refMar.value = false
    } else {
       refMar.value = true 
    }

    
    
    
    return { missionItems, polyline }
}

let toRadians = (degress: number) => {
    return degress * (Math.PI / 180)
}

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
// vai legar o estado do slide
let handleStateChanged = (newState: boolean) => {
    
    refMar.value = newState

}

</script>

<template>

    <div class="w-100% h-100% z-0 flex">

        <!-- menu lateral -->
        <div class="bg-white rounded-xl min-w-380px max-w-380px h-90% m-4 ">
            <div class=" pt-15px pl-15px w-full">
                    <h4 class="mb-5px">Menu de ações</h4>
                </div>
            <ul class="list-none px-15px flex justify-around">
                
                <li class="mr-2">

                    <div class="w-full flex mb-5px  text-white bg-blue hover:bg-blue-500 rounded-1 ">
                        <label for="inputFoto" class="shadow flex justify-center items-center w-full p-2 text-sm">
                            <font-awesome-icon class="pr-5px" icon="fa-solid fa-file-arrow-up" />
                            <h4 class="flex justify-center">Subir arquivo</h4>
                        </label>
                        <input @change="pegarValor" name="image" id="inputFoto" type="file" class="hidden">
                    </div>

                </li>

                <li class="mr-2"> <button
                        class=" text-sm shadow w-100% flex items-center font-120px p-2 mb-5px hover:bg-blue-500 text-white bg-blue rounded-1">
                        <font-awesome-icon class="pr-5px" icon="fa-solid fa-file-arrow-down" />
                        <h4>Baixar arquivo</h4>
                    </button> </li>
                <li class="mr-2"> <button
                        class="shadow w-100% flex items-center text-sm p-2 mb-5px  hover:bg-red-500 text-white bg-red rounded-1"><font-awesome-icon
                            class="pr-5px" icon="fa-solid fa-trash" />
                        <h4>Deletar Arquivo</h4>
                    </button> </li>
            </ul>
            <ul class="list-none px-15px">
                <li>
                    <h4>Informações do arquivo</h4>
                </li>
                <li class="mb-5px">Nome do arquivo carregado: <label class="color-blue" for="">{{ nameFile }}</label></li>
                <li class="mb-5px">Distância (m): {{ distance }}</li>
            </ul>
            <ul class="list-none px-15px">
                <li>
                    <h4>Editar ponto {{ }}</h4>
                </li>
                <!-- tipo -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px "><label for="">Tipo:</label></div> <select
                        class="border-solid border-gray border-1px rounded-md w-165px h-20px px-1" id="">
                        <option v-for="types in listTypeWP" :value="types">{{ types }}</option>
                    </select>
                </li>
                <!-- latitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"> <label for="">Latitude:</label> </div>
                    <input v-model="latInput" class="border-solid border-gray border-1px rounded-md h-20px px-1" type="text" name="" id="" >
                </li>
                <!-- longitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Longitude:</label> </div>
                    <input v-model="lonInput" class="border-solid border-gray border-1px rounded-md h-20px px-1" type="text" name="" id="">
                </li>
                <!-- altitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Altura (m):</label> </div>
                    <input v-model="heightInput" class="border-solid border-gray border-1px rounded-md h-20px px-1" type="text" name="" id="">

                </li>
                <!-- slider -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Referência do nível do mar:</label> </div>
                    <Slide :parentState="refMar" @stateChanged="handleStateChanged"/>

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
                    <input v-model="speed" class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id="">

                </li>
                <li class="flex items-center mb-10px">
                    <button
                        class="shadow w-100% flex items-center p-2 mb-5px hover:bg-red-500 text-white bg-red rounded-1">
                        <font-awesome-icon class="pr-5px" icon="fa-solid fa-trash" />
                        <h4>Deletar ponto</h4>
                    </button>
                </li>
            </ul>

        </div>
        <!-- mapa -->
        <div id="map" class="w-full h-full cursor-auto"></div>
        
    </div>    
</template>
