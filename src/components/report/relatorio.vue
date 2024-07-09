<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';
import api from '../../service/api';
import { useRoute } from 'vue-router'

import { DataImg } from './dataImg.ts'

library.add(fas);

// let frames = ref<Array<Buffer>>([])

let listImg = ref<Array<DataImg>>([])
let index = ref<number>(0)


const route = useRoute()

onMounted( async () => {


    await api.get(`/getFrame/${route.query.id}`)
    .then((response) => {
        if (response.status == 200) {
            let imagens = response.data.frames
            imagens.map((frame: any) => {
                let img = new DataImg(frame.id_frame, 'http://localhost:3030/files/'+ frame.nome +'.png', frame.nome , frame.indice_lista)

                listImg.value.push(img)
                
                return frame
            })
        }
    })
    
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

const jumpIndex = (e: any) => {
    listImg.value.map((img, indexImg) => {
        
        if(img.id_frame === e) {
            index.value = indexImg
            
        }
    })
    
}
</script>

<template>
    <div class="w-full h-full">
        <ul class="w-full h-full">
            <li>
                <div class="bg-white w-full h-12 flex items-center">
                    <router-link
                        :to="{ name: 'analitico', query: { nome: $route.query.nome, picture: $route.query.picture, token: $route.query.token } }">
                        <button class="bg-white flex justify-center items-center rounded-full p-5px mx-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl">
                            <font-awesome-icon icon="fa-solid fa-x" class="h-18px w-18px c-gray-500" />
                        </button>
                    </router-link>

                </div>
            </li>
            <li class="h-72% flex justify-center items-center">
                <div class="w-full h-full flex items-center justify-center">

                    <button @click="backImage"
                        class="w-50px h-50px bg-white flex justify-center items-center rounded-full m-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" class="h-20px w-20px c-gray-500" />
                    </button>

                    <div v-if="listImg.length > 0" class="max-w-600px w-60% flex justify-center items-center">
                        <img :src="listImg[index].caminho" class="bg-black color-white w-full h-full " alt="e aaae">
                    </div>

                    <button @click="nextImage"
                        class="w-50px h-50px bg-white flex justify-center items-center rounded-full m-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl">
                        <font-awesome-icon icon="fa-solid fa-chevron-right" class="h-20px w-20px c-gray-500" />
                    </button>

                </div>
            </li>
            <li class="flex justify-center">
                <div class="shadow-xl bg-white w-1100px h-90px flex mx-4 p-2 rounded-xl items-center overflow-x-auto focus:overscroll-contain">

                    <div v-for="imagem in listImg" class="bg-gray-300 rounded-lg p-2 mx-1">
                        
                        <img @click="jumpIndex(imagem.id_frame)" :src="imagem.caminho" class="w-90px hover:cursor-pointer" :key="imagem.id_frame" alt="">
                        
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>
