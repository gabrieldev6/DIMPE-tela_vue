<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';
import api from '../../service/api';
import { useRoute } from 'vue-router'

import { DataImg } from './dataImg.ts'
import Loading from '../loading/loading.vue'
library.add(fas);

// let frames = ref<Array<Buffer>>([])

let listImg = ref<Array<DataImg>>([])
let index = ref<number>(0)
let progressRef = ref<number>(0)
const route = useRoute()

onMounted( async () => {
    progressRef.value = 25
    await api.get(`/getFrame/${route.query.id}`)
    .then((response) => {
        progressRef.value = 50
        if (response.status == 200) {
            let imagens = response.data.frames
            imagens.map((frame: any) => {
                let img = new DataImg(frame.id_frame, 'http://localhost:3030/files/'+ frame.nome +'.png', frame.nome , frame.indice_lista)

                listImg.value.push(img)
                
                return frame
            })
        }
       
    })
    progressRef.value=100
})

const backImage = () => {
    if(index.value <= 0) {
        console.log(index.value)
        index.value = 0
    } else {
        index.value = index.value-1
    }
    
}

const nextImage = () => {
    if(index.value >= listImg.value.length-1) {
        console.log(index.value)
        index.value = listImg.value.length-1
    } else {
        index.value = index.value+1
    }
    
}

const jumpIndex = (e: number) => {
    index.value = e
    
}
</script>

<template>
    <div class="w-full h-full">
        <ul class="w-full h-full">
            <li>
                <div class="bg-white w-full h-12 flex items-center">
                    <router-link
                        :to="{ name: 'analitico', query: { nome: $route.query.nome, picture: $route.query.picture, token: $route.query.token } }">
                        <button class="bg-white flex justify-center items-center rounded-full p-2 mx-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl">
                            <font-awesome-icon icon="fa-solid fa-x" class="h-18px w-18px c-gray-500" />
                        </button>
                    </router-link>

                </div>
            </li>
            <li v-if="listImg.length > 0" class="h-72% x-0 flex justify-center items-center">
                <div class="bg-white w-1100px h-90% flex items-center justify-center px-2 py-4 rounded-xl">

                    <button @click="backImage"
                        class="w-50px h-50px bg-white flex justify-center items-center rounded-full m-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" class="h-20px w-20px c-gray-500" />
                    </button>

                    <div  class="max-w-600px w-60% flex justify-center items-center">
                        <img :src="listImg[index].caminho" class="bg-black color-white w-full h-full " alt="e aaae">
                    </div>

                    <button @click="nextImage"
                        class="w-50px h-50px bg-white flex justify-center items-center rounded-full m-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl">
                        <font-awesome-icon icon="fa-solid fa-chevron-right" class="h-20px w-20px c-gray-500" />
                    </button>

                </div>
            </li>
            <li v-else class="h-72% x-0 flex justify-center items-center">
                <div class="bg-white w-1100px h-90% flex items-center justify-center px-2 py-4 rounded-xl">
                    <Loading :progress="progressRef" ></Loading>
                </div>
            </li>
            <li class="flex justify-center">
                <div class="shadow-xl z-1 bg-white w-1100px h-90px flex mx-4 p-2 rounded-xl items-center overflow-x-auto focus:overscroll-contain">

                    <div v-for="(imagem, indexImg) in listImg" :class="['thumbnail', indexImg === index ? 'bg-gray-300 rounded-lg p-1 mx-1 hover:bg-gray-300 ' : 'rounded-lg p-1 mx-1 hover:bg-gray-300 ']">
                        
                            <img @click="jumpIndex(indexImg)" :src="imagem.caminho" class="w-80px hover:cursor-pointer" :key="imagem.id_frame" alt="">
                        
                        
                        
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>
