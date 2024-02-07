<script lang="ts" setup>
import * as tf from '@tensorflow/tfjs'

import { computed, onUnmounted, ref, watch, watchEffect } from 'vue';
import { BoundingBox } from '../../core/Detector';
import DetectorWorker from '../../core/worker?worker'
import { useDevicesList, useLocalStorage } from '@vueuse/core'

import Loading from "../loading/loading.vue"

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// pede permissão e lista os dispositivos de video
const { videoInputs } = useDevicesList({
  requestPermissions: true,
  constraints: {
    video: true,
    audio: false
  }
})
// se a camera nao puder ser aberta ele gera um alerta de erro
let erro = ref<boolean>(false)

const worker = new DetectorWorker()
let boundingBoxes: BoundingBox[] = []

const input = useLocalStorage('input', '')

watchEffect(() => {
  input.value ??= videoInputs.value[0]?.deviceId
})

// barra de progresso
const LISTENERS: Record<string, Function> = {
  progress(_: any, value: number) {
    progress.value = value
  },
  result(_: any, boxes: BoundingBox[]) {
    boundingBoxes = boxes
    // boundingBoxes.map(box => {
      
    //   console.log(box.label)
      
    // })
    
  },
  ready: () => {
    
    ready.value = true
    loop()
  }
}

worker.addEventListener('message', (e: any) => {
  const [event, ...args] = e.data

  if (event in LISTENERS) {
    LISTENERS[event](e, ...args)
  }
})

worker.postMessage(['load', '/yolov7_web_model/model.json'])

const video = document.createElement('video')

video.playsInline = true
video.muted = true
video.autoplay = true
video.play()

const progress = ref(0)
const canvas = ref<HTMLCanvasElement>()
const ctx = computed(() => canvas.value?.getContext('2d'))
const ready = ref(false)

let nextFrame: number
let camera: MediaStream | void


const BOX_STYLE = {
  box: {
    borderSize: 3,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#fff',
    padding: {
      x: 8,
      y: 4
    }
  }
}

// Loop de renderização do canvas
async function loop() {
  nextFrame = requestAnimationFrame(loop)

  if (!canvas.value || !camera || !ctx.value) {
    return
  }

  canvas.value!.width = video.videoWidth
  canvas.value!.height = video.videoHeight

  const draw = ctx.value;
  const frame = tf.browser.fromPixels(video)
  draw.clearRect(0, 0, canvas.value.width, canvas.value.height)

  worker.postMessage(['detect', {
    data: frame.dataSync(),
    shape: frame.shape
  }])

  frame.dispose()
  

  draw.drawImage(video, 0, 0)

  for (const box of boundingBoxes) {
    draw.font = `bolder ${BOX_STYLE.label.fontSize}px ${BOX_STYLE.label.fontFamily}`

    draw.textBaseline = 'top'
    draw.textAlign = 'left'
    draw.fillStyle = BOX_STYLE.label.color
    const label = draw.measureText(box.label)

    draw.fillStyle = box.color
    draw.strokeStyle = box.color
    draw.lineWidth = BOX_STYLE.box.borderSize

    draw.strokeRect(
      box.x,
      box.y,
      box.width,
      box.height,
    )

    const labelHeight = BOX_STYLE.label.fontSize + (BOX_STYLE.label.padding.y * 2)

    draw.fillRect(
      box.x - (BOX_STYLE.box.borderSize / 2),
      box.y - labelHeight,
      BOX_STYLE.label.padding.x + label.width + BOX_STYLE.label.padding.x,
      labelHeight,
    )

    draw.fillStyle = BOX_STYLE.label.color
    draw.fillText(
      box.label,
      box.x + BOX_STYLE.label.padding.x,
      box.y - labelHeight + BOX_STYLE.label.padding.y,
    )

  }
}

// Destroi o loop de renderização
onUnmounted(() => {
  cancelAnimationFrame(nextFrame)
  camera?.getTracks().forEach((track) => track.stop())
  postMessage(['stop'])
  worker.terminate()
  tf.dispose(tf.browser.fromPixels(video))
})



// Inicia a câmera selecionada
watch(input, async (input: any) => {
  if (!input) {
    return;
  }

  // Desliga a câmera anterior
  camera?.getTracks().forEach((track) => track.stop())

  // Inicia a nova câmera
  camera = input === 'screen' ? await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false
  })
  : await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: input
    },
    audio: false
  }).catch(err => {
    erro.value = true
    
    console.log(err)
  })

  if(!camera) {
    return
  }
  erro.value = false
  // Inicia o vídeo
  video.srcObject = camera

  video.play()
}, {immediate: true})



</script>
  
<template>
  <div class="p4">
    <div class="items-center bg-white p4 rounded-2 w-600px min-w-600px h-490px min-h-450px">
      <div class="flex w-full my-5px justify-between text-center items-center">
        <h3>Transmissão de imagem</h3>
        <select v-model="input" class="px-4 py-2 rounded-lg">
          <option disabled selected value="">Câmera</option>
          <option v-for="device in videoInputs" :key="device.deviceId" :value="device.deviceId">{{device.label}}</option>
          <option value="screen">Tela</option>
        </select>
      </div>
      
        <template v-if="!ready">
          <div class="m-4px items-center w-full h-full ">

            <Loading max="100" :progress="progress * 100" :ready="ready"></Loading>
          </div>
        </template>

        <canvas v-else ref="canvas" class="w-full max-w-600px"></canvas>
        
      
    </div>

    <div v-if="erro" class="bg-red-600 rounded-2 p4 flex my-14px">
      <font-awesome-icon icon="circle-exclamation" class="c-white h-20px w-20px"/>
      <div class="px2">
        <h4 class="text-white">Câmera nao disponivel</h4>
        <p class="text-white">Verifique se a camera esta conectada corretamente, ou se há erro no hardware</p>
      </div>
      
    </div>

  </div>
  <div>
    <canvas ref="canvas2" class="w-100px h-60px"></canvas>
  </div>
</template>


