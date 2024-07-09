<script setup lang="ts" props="props">
import {ref, watchEffect} from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps(['data', 'id', 'capa'])

const capa = ref<string>("")

watchEffect(()=> {
    capa.value = 'http://localhost:3030/files/' + props.capa + '.png'
    
})
function fetchListFrame() {
    
   

    
}
</script>

<template>
    <div class="ml-4 mt-4 bg-white rounded-lg w-72 ">

        


        <img class="bg-black w-full h-180px rounded-t-lg" :src="capa"></img>
        <div class="p4">
            <div class="flex justify-between pb2 ">
            <div class="flex">
                <div class="bg-white rounded-full shadow-md w-40px h-40px flex justify-center items-center">
                    <font-awesome-icon icon="fa-solid fa-user" class="color-gray h-20px w-20px m-1" />
                </div>
                <div class="px-2">
                    <h4 class="">{{props.id}}</h4>
                    <h6>{{props.data}}</h6>
                </div>
            </div>

            
        </div>
        <router-link :to="{name: 'relatorio', query: {nome: $route.query.nome, token: $route.query.token, picture: $route.query.picture, id: props.id}}">
            <button @click="fetchListFrame" class="w-full shadow-sm  p-2 hover:bg-blue-500 text-white bg-blue rounded-1">Analisar</button>
        </router-link>
        </div>
        
        
    </div>
</template>