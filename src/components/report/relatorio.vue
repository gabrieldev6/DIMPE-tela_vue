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

onMounted(async () => {
    progressRef.value = 25
    await api.get(`/getFrame/${route.query.id}`)
        .then((response) => {
            progressRef.value = 50
            if (response.status == 200) {
                let imagens = response.data.frames
                imagens.map((frame: any) => {
                    let img = new DataImg(frame.id_frame, 'http://localhost:3030/files/' + frame.nome + '.png', frame.nome, frame.indice_lista)

                    listImg.value.push(img)

                    return frame
                })
            }

        })
    progressRef.value = 100
})

const backImage = () => {
    if (index.value <= 0) {
        console.log(index.value)
        index.value = 0
    } else {
        index.value = index.value - 1
    }

}

const nextImage = () => {
    if (index.value >= listImg.value.length - 1) {
        console.log(index.value)
        index.value = listImg.value.length - 1
    } else {
        index.value = index.value + 1
    }

}

const jumpIndex = (e: number) => {
    index.value = e

}
</script>

<template>
    <div class="w-full h-full">
        <div class="bg-white w-full h-12 flex items-center dark:bg-gray-900">
                    <router-link
                        :to="{ name: 'analitico', query: { nome: $route.query.nome, picture: $route.query.picture, token: $route.query.token } }">
                        <button
                            class="bg-white flex justify-center items-center rounded-full p-2 mx-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700 ">
                            <font-awesome-icon icon="fa-solid fa-x" class="h-18px w-18px c-gray-500" />
                        </button>
                    </router-link>

        </div>
        <ul class="w-full h-88% flex list-none">

            <li v-if="listImg.length > 0" class="w-75% h-full flex">
                <div
                    class=" bg-white h-full mx-4 mt-4 px-3 rounded-xl shadow-xl items-center overflow-x-auto focus:overscroll-contain dark:bg-gray-900">

                    <div v-for="(imagem, indexImg) in listImg"
                        :class="['thumbnail', indexImg === index ? 'bg-gray-300 flex justify-center items-center rounded-lg p-1 m-1 dark:bg-gray-600 dark:hover:bg-gray-600' : ' flex justify-center items-center rounded-lg p-1 mx-1 hover:bg-gray-300 dark:hover:bg-gray-600']">

                        <img @click="jumpIndex(indexImg)" :src="imagem.caminho" class="w-80px hover:cursor-pointer"
                            :key="imagem.id_frame" alt="">

                    </div>
                </div>
                <div
                    class="bg-white w-full h-full flex items-center justify-center mt-4 rounded-xl shadow-xl dark:bg-gray-900 dark:color-gray">

                    <button @click="backImage"
                        class="w-50px h-50px bg-white flex justify-center items-center rounded-full m-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" class="h-20px w-20px c-gray-500" />
                    </button>

                    <div class="w-80% flex justify-center items-center">
                        <img :src="listImg[index].caminho" class="bg-black color-white w-full h-full " alt="e aaae">
                    </div>

                    <button @click="nextImage"
                        class="w-50px h-50px bg-white flex justify-center items-center rounded-full m-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700 ">
                        <font-awesome-icon icon="fa-solid fa-chevron-right" class="h-20px w-20px c-gray-500" />
                    </button>

                </div>
            </li>
            
            <li v-else class="h-72% flex justify-center items-center">
                <div class="h-94% flex items-center justify-center px-2 py-4 rounded-xl dark:color-gray">
                    <Loading :progress="progressRef"></Loading>
                </div>
            </li>
            <li class="w-20% h-full ">
                <div class="bg-white w-full h-full mx-4 mt-4 px-4 rounded-xl shadow-xl dark:bg-gray-900 dark:color-gray">
                    <h3 class="py-4">Relatorio de patrulha</h3>

                    
                </div>
            </li>
        </ul>
        
    </div>
</template>
