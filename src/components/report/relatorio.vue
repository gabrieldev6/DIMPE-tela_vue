<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref, computed, watchEffect } from 'vue';
import DropDownMenu from '../menudd/dropdownMenu.vue'

import api from '../../service/api';
import { useRoute } from 'vue-router'
const route = useRoute()

import { DataImg } from '../../types/dataImg'
import { BoundingBox } from '../../types/boudingbox.ts'
import Loading from '../loading/loading.vue'
library.add(fas);



let listImg = ref<Array<DataImg>>([])
let index = ref<number>(0)
let progressRef = ref<number>(0)

let listBoundingBox = ref<Array<Array<BoundingBox>>>([])
let listFrame = ref()
let date = ref<Date>()
let person = ref<number>(0)
let vehycle = ref<number>(0)
let length = ref<number>(0)
// canvas
let canvas = ref<HTMLCanvasElement>()
const ctx = computed(() => canvas.value?.getContext('2d'))


const BOX_STYLE = {
    box: {
        borderSize: 3,
    },
    label: {
        fontSize: 15,
        fontFamily: 'Arial',
        color: 'white',
        padding: {
            x: 3,
            y: 2
        }
    }
}

async function loop() {

    if (!canvas.value || !ctx.value) {
        return
    }
    const draw = ctx.value;

    // precisa ajusta de acordo com a dimensão da imagem
    canvas.value!.width = listImg.value[index.value].largura
    canvas.value!.height = listImg.value[index.value].altura

    draw.clearRect(0, 0, canvas.value.width, canvas.value.height)

    for (const box of listBoundingBox.value[index.value]) {

        draw.strokeStyle = 'red' //cor do box
        draw.lineWidth = 2 //espessura do box

        // box
        draw.strokeRect(box.x, box.y, box.width, box.heigth)

        const label = draw.measureText(box.classe)
        const labelHeight = BOX_STYLE.label.fontSize + (BOX_STYLE.label.padding.y)

        draw.font = `bolder ${BOX_STYLE.label.fontSize}px ${BOX_STYLE.label.fontFamily}` //propriedade texto
        draw.textBaseline = 'top' //alinhamento vertical
        draw.textAlign = 'left' // alinhamento horizontal
        draw.fillStyle = 'red' // cor do fundo

        // preenche o fundo do nome
        draw.fillRect(
            box.x - (BOX_STYLE.box.borderSize),
            box.y - labelHeight,
            BOX_STYLE.label.padding.x + label.width + BOX_STYLE.label.padding.x + BOX_STYLE.label.fontSize,
            labelHeight
        )

        draw.fillStyle = BOX_STYLE.label.color //cor da fonte

        // escreve o nome da classe
        draw.fillText(
            box.classe,
            box.x + BOX_STYLE.label.padding.x,
            box.y - labelHeight + BOX_STYLE.label.padding.y,
        )
    }





}




onMounted(async () => {
    progressRef.value = 25
    await api.get(`/getFrame/${route.query.id}`)
        .then((response) => {
            progressRef.value = 50
            if (response.status == 200) {
                let imagens = response.data.frames
                listBoundingBox.value = response.data.listBoundingBox
                listFrame.value = response.data.listFrame
                imagens.map((frame: any) => {
                    let img = new DataImg(frame.id_frame, 'http://localhost:3030/files/' + frame.nome + '.png', frame.nome, frame.indice_lista, frame.altura, frame.largura)

                    listImg.value.push(img)

                    return frame
                })

            }

        })
    date.value = new Date(listFrame.value.data)
    countObject()
})

// volta a lista de imagem
const backImage = () => {
    if (index.value <= 0) {
        console.log(index.value)
        index.value = 0
    } else {
        index.value = index.value - 1
    }
    countObject()
}
// passa para proxima imagem
const nextImage = () => {

    if (index.value >= listImg.value.length - 1) {
        console.log(index.value)
        index.value = listImg.value.length - 1
    } else {
        index.value = index.value + 1
    }
    countObject()
}
// pula para imagem expecifica clicada
const jumpIndex = (e: number) => {
    index.value = e

    countObject()
}

const countObject = async () => {
    person.value = 0
    vehycle.value = 0
    length.value = listBoundingBox.value[index.value].length
    listBoundingBox.value[index.value].forEach((box) => {



        if (box.classe == 'pessoa') {
            console.log(box)
            person.value++
        } else if (box.classe == 'veiculo') {
            vehycle.value++
        }
    })

}

watchEffect(() => {
    loop()
    console.log(listBoundingBox.value[0])

})
</script>

<template>
    <div class="w-full h-full">
        <div class="bg-white w-full h-8% flex items-center dark:bg-gray-900">
            <router-link
                :to="{ name: 'analitico', query: { nome: $route.query.nome, picture: $route.query.picture, token: $route.query.token } }">
                <button
                    class="bg-white flex justify-center items-center rounded-md p-2 mx-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700 ">
                    <font-awesome-icon icon="fa-solid fa-x" class=" c-gray-500" />
                </button>
            </router-link>

        </div>
        <ul class="w-full h-88% flex list-none">

            <li class="w-70%  h-full flex">

                <!-- imagem completa -->
                <div
                    class="bg-white w-full h-full flex items-center justify-center ml-4 mt-4 rounded-xl shadow-xl dark:bg-gray-900 dark:color-gray">

                    <button @click="backImage"
                        class="w-50px h-50px bg-white flex justify-center items-center rounded-full m-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700">
                        <font-awesome-icon icon="fa-solid fa-chevron-left" class="h-20px w-20px c-gray-500" />
                    </button>

                    <div v-if="listImg.length > 0" class="w-80% max-w-970px flex justify-center items-center">
                        <!--  -->
                        <img :src="listImg[index].caminho" class="w-650px bg-black color-white w-full h-full "
                            alt="imagem">
                        <canvas ref="canvas" class="w-650px h-475px absolute opacity-50 "></canvas>
                    </div>
                    <div v-else class="h-94% flex items-center justify-center px-2 py-4 rounded-xl dark:color-gray">

                        <Loading :progress="progressRef"></Loading>
                    </div>
                    <button @click="nextImage"
                        class="w-50px h-50px bg-white flex justify-center items-center rounded-full m-4 hover:cursor-pointer hover:bg-gray-200 transition-colors shadow-xl dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700 ">
                        <font-awesome-icon icon="fa-solid fa-chevron-right" class="h-20px w-20px c-gray-500" />
                    </button>

                </div>
            </li>


            <li class="w-25% h-full ">
                <div
                    class="bg-white w-full max-w-370px h-full mx-4 mt-4 px-4 rounded-xl shadow-xl dark:bg-gray-900 dark:color-gray overflow-x-auto focus:overscroll-contain">
                    <h3 class="py-4">Relatorio de patrulha</h3>
                    
                    <DropDownMenu label='Lista de imagens'>
                        <div
                        class=" bg-white w-60 h-25 flex rounded-xl items-center overflow-x-auto focus:overscroll-contain dark:bg-gray-900">

                        <div v-for="(imagem, indexImg) in listImg"
                            :class="['thumbnail', indexImg === index ? 'bg-gray-300 flex justify-center items-center rounded-lg p-1 dark:bg-gray-600 dark:hover:bg-gray-600' : ' flex justify-center items-center rounded-lg p-1 mx-1 hover:bg-gray-300 dark:hover:bg-gray-600']">

                            <img @click="jumpIndex(indexImg)" :src="imagem.caminho" class="w-80px hover:cursor-pointer"
                                :key="imagem.id_frame" alt="">

                        </div>
                    </div>
                    </DropDownMenu>

                    <DropDownMenu label='Informações gerais de patrulha'>
                        <div class="flex justify-between">
                            <p c>Quantos objetos no total </p>
                            <p>{{ length }}</p>
                        </div>


                        <div class="bg-gray-200 mt-4 flex justify-between rounded-md px-2 py-0.5 dark:bg-gray-800">
                            <p>Classe</p>
                            <p>Score</p>
                        </div>
                        <div v-for="obj in listBoundingBox[index]"
                            class="flex justify-between rounded-md px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <p>{{ obj.classe }} </p>
                            <p>{{ parseFloat(obj.acertividade.toFixed(3)) * 100 }}%</p>
                        </div>
                        <div class="bg-gray-200 mt-4 flex justify-between rounded-md px-2 py-0.5 dark:bg-gray-800">
                            <p>Classe</p>
                            <p>Quantidade</p>
                        </div>
                        <div class=" flex justify-between rounded-md px-2 py-0.5 ">
                            <p>pessoa </p>
                            <p>{{ person }}</p>
                        </div>
                        <div class=" flex justify-between rounded-md px-2 py-0.5 ">
                            <p>veiculo </p>
                            <p> {{ vehycle }}</p>
                        </div>
                    </DropDownMenu>
                    <DropDownMenu label='Informações de imagens'>
                        <div class="flex justify-between">
                            <p>Total de imagens</p>
                            <p>{{ listImg.length }}</p>
                        </div>
                        <div class="flex pt-4 justify-between">
                            <p>Data</p>
                            <p>{{ date?.getDate() }}/{{ date?.getMonth() }}/{{ date?.getFullYear() }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Hora</p>
                            <p>{{ date?.getHours() }}:{{ date?.getMinutes() }}</p>
                        </div>
                    </DropDownMenu>

                </div>
            </li>
        </ul>

    </div>
</template>