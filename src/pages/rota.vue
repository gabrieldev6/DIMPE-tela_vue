<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { ref } from "vue";

import Slide from '../components/slideBinary/slideBinary.vue'



let zoom = 6
let listTypeWP = ref<Array<string>>(['Waypoint', 'PH_TIME', 'POI', 'Land'])

let listMark = ref<Array<Array<number>>>([[-4.567525, -37.791641], [-4.5666015, -37.7915278]])
let fileContent = ref<string | ArrayBuffer | null | undefined>('')


let pegarValor = async (event: any) => {
    let valor = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
        
        fileContent.value = e.target?.result
        // console.log(fileContent.value)
        
    }
    reader.onerror = (e) => {
      console.error('Erro ao ler o arquivo:', e);
    };
    reader.readAsText(valor)
    
    
}


</script>

<template>

    <div class="w-100% h-100% z-0 flex">

        <!-- menu inferior -->
        <div class="bg-white rounded-xl min-w-380px max-w-380px h-90% m-4 ">
            <ul class="list-none p-15px">
                <li>
                    <h4 class="mb-5px">Menu de ações</h4>
                </li>
                <li>

                    <div class="w-full flex mb-5px  text-white bg-blue hover:bg-blue-500 rounded-1 ">
                        <label for="inputFoto" class="shadow flex items-center w-full p-2 text-sm">
                            <font-awesome-icon class="pr-5px" icon="fa-solid fa-file-arrow-up" />
                            <h4>Subir arquivo</h4>
                        </label>
                        <input @change="pegarValor" name="image" id="inputFoto" type="file" class="hidden">
                    </div>





                </li>

                <li> <button class=" text-sm shadow w-100% flex items-center font-120px p-2 mb-5px hover:bg-blue-500 text-white bg-blue rounded-1">
                        <font-awesome-icon class="pr-5px" icon="fa-solid fa-file-arrow-down" />
                        <h4>Baixar arquivo</h4>
                    </button> </li>
                <li> <button
                        class="shadow w-100% flex items-center text-sm p-2 mb-5px hover:bg-red-500 text-white bg-red rounded-1"><font-awesome-icon
                            class="pr-5px" icon="fa-solid fa-trash" />
                        <h4>Deletar Arquivo</h4> 
                    </button> </li>
            </ul>
            <ul class="list-none p-15px">
                <li>
                    <h4>Informações do arquivo</h4>
                </li>
                <li class="mb-5px">Nome do arquivo carregado: </li>
                <li class="mb-5px">Distância (m): 528.9</li>
            </ul>
            <ul class="list-none p-15px">
                <li>
                    <h4>Editar ponto</h4>
                </li>
                <!-- tipo -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Tipo:</label></div> <select
                        class="border-solid border-gray border-1px rounded-md w-165px h-20px" id="">
                        <option v-for="types in listTypeWP" :value="types">{{ types }}</option>
                    </select>
                </li>
                <!-- latitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"> <label for="">Latitude:</label> </div>
                    <input class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id="">
                </li>
                <!-- longitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Longitude:</label> </div><input
                        class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id="">
                </li>
                <!-- altitude -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Altura (cm):</label> </div><input
                        class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id="">
                    <h5>50m</h5>
                </li>
                <!-- slider -->
                <li class="flex items-center mb-10px">
                    <div class="w-120px"><label for="">Referência do nível do mar:</label> </div>
                    <Slide></Slide>

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
                    <div class="w-120px"><label for="">Velocidade (cm/s):</label> </div><input
                        class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id="">

                </li>
                <li class="flex items-center mb-10px">
                    <button class="shadow w-100% flex items-center p-2 mb-5px hover:bg-red-500 text-white bg-red rounded-1">
                        <font-awesome-icon class="pr-5px" icon="fa-solid fa-trash" />
                        <h4>Deletar ponto</h4>
                    </button>
                </li>
            </ul>

        </div>

        <!-- mapa -->
        <l-map class="w-100% h-100%" ref="map" v-model:zoom="zoom" :center="[-7.123134, -41.688980]"
            :use-global-leaflet="false">
            <LMarker v-for="point in listMark" :lat-lng="point" :name="'a pretty css popup'" />



            <l-tile-layer ref="mapa" class="w-100% h-100%" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base" name="OpenStreetMap"></l-tile-layer>
        </l-map>


    </div>
</template>
