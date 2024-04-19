<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { watchEffect, ref } from 'vue';
import api from '../../service/api';

library.add(fas);

// let frames = ref<Array<Buffer>>([])

let img = ref<Array<any>>([])


function voltar() {

}
watchEffect(() => {
    let numberList = 1

    api.get(`/getFrame/${numberList}`

    ).then((response) => {
        if (response.status == 200) {
            let imagens = response.data.frames
            imagens.map((frame: any) => {
                frame.caminho = 'http://localhost:3030/files/' + frame.nome + '.png'
                img.value.push(frame)
                return frame
            })

            console.log(img.value.length)
        }
    })
})


</script>

<template>
    <div class="w-full h-full ">
        <div class="bg-white w-full h-12 flex items-center ">
            <router-link
                :to="{ name: 'analitico', query: { nome: $route.query.nome, picture: $route.query.picture, token: $route.query.token } }">
                <button @click="voltar" class="bg-white rounded-full p-10px hover:cursor-pointer hover:bg-gray-200">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" class="h-25px w-25px c-gray-500" />
                </button>
            </router-link>
        </div>
        
            <div class="h-90% flex flex-wrap ml-4 overflow-y-scroll">

                <div v-for="imagem in img" class="mx-2 mt-4">
                    <img class="w-45" :src=imagem.caminho :key="imagem.id_frame" alt="">
                </div>
            </div>

        



    </div>
</template>
