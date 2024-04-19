<script setup lang="ts" props="props">
import { defineProps } from 'vue';


const props = defineProps(['data', 'nome']) //

function fetchListFrame() {
    
   

    
}
</script>

<template>
    <div class="ml-4 mt-4 bg-white rounded-lg w-72 ">

        


        <canvas class="bg-black w-full h-180px rounded-t-lg"></canvas>
        <div class="p4">
            <div class="flex justify-between pb2 ">
            <div class="flex">
                <div class="bg-gray rounded-full shadow-md w-40px h-40px flex justify-center items-center"></div>
                <div class="px-2">
                    <h4 class="">Nome</h4>
                    <h6>{{props.data}}</h6>
                </div>
            </div>

            
        </div>
        <router-link :to="{name: 'relatorio', query: {nome: $route.query.nome, token: $route.query.token, picture: $route.query.picture}}">
            <button @click="fetchListFrame" class="shadow w-full  p-2 hover:bg-blue-500 text-white bg-blue rounded-1">Analisar</button>
        </router-link>
        </div>
        
        
    </div>
</template>