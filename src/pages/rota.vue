<script setup lang="ts">
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref} from "vue";

import Slide from '../components/slideBinary/slideBinary.vue'

let zoom = 6
let listTypeWP = ref<Array<string>>(['Waypoint', 'PH_TIME', 'POI', 'Land'])


</script>

<template>
    <div class="w-100% h-70% z-0">
        <!-- mapa -->
        <l-map class="w-100% h-100%" ref="map" v-model:zoom="zoom" :center="[-7.123134, -41.688980]"
            :use-global-leaflet="false">
            <l-tile-layer class="w-100% h-100%" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base" name="OpenStreetMap"></l-tile-layer>
        </l-map>

        <!-- menu inferior -->
        <div class="bg-white rounded-xl w-80% h-40% flex ml-4 mt-4">
            <ul class="list-none p-15px"> 
                <li>Total Information</li>
                <li>Filename loaded: </li>
                <li>Distance (m): 528.9</li>
            </ul>
            <ul class="list-none p-15px">
                <!-- tipo -->
                <li class="flex items-center">
                    <div class="w-120px"><label for="">Type:</label></div> <select
                        class="border-solid border-gray border-1px rounded-md w-165px " id="">
                        <option v-for="types in listTypeWP" :value="types">{{ types }}</option>
                    </select>
                </li>
                <!-- latitude -->
                <li class="flex items-center">
                    <div class="w-120px"> <label for="">Lat:</label> </div>
                    <input class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id="">
                </li>
                <!-- longitude -->
                <li class="flex items-center">
                    <div class="w-120px"><label for="">Lon:</label> </div><input
                        class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id="">
                </li>
                <!-- altitude -->
                <li class="flex items-center">
                    <div class="w-120px"><label for="">Alt (cm):</label> </div><input
                        class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id=""> 
                        <h5>50m</h5>
                </li>
                <!-- slider -->
                <li class="flex items-center py-5px">
                    <div class="w-120px"><label for="">Sea level Ref:</label> </div>
                    <Slide></Slide>
                    
                </li>
                <li class="flex items-center">
                    <div class="w-120px "><label for="">Elevation (m):</label> </div>
                    <h5>10</h5>
                    
                </li>
                <li class="flex items-center">
                    <div class="w-120px "><label for="">Grd Dist (m):</label> </div>
                    <h5>50</h5>
                    
                </li>
                <li class="flex items-center">
                    <div class="w-120px"><label for="">Speed (cm/s):</label> </div><input
                        class="border-solid border-gray border-1px rounded-md h-20px" type="text" name="" id=""> 
                        
                </li>
            </ul>
            
        </div>
    </div>
</template>
