<script lang="ts" setup>
// funções auxiliares
import { computed, onUnmounted, ref, watch, watchEffect } from 'vue';
import { useDevicesList, useLocalStorage } from '@vueuse/core'

// tensorflow
import * as tf from '@tensorflow/tfjs'
import { BoundingBox } from '../../core/Detector';
import DetectorWorker from '../../core/worker?worker'

// componentes
import Loading from "../loading/loading.vue"
import api from "../../service/api"
// icones
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

// timestamp para relatorio
let click = ref<boolean>(false)
let descricao = ref<string>('Iniciar')

// Dados
let listFrame = ref<File>()
let listBoundingBox = ref<Array<any>>([])

const worker = new DetectorWorker()
let boundingBoxes: BoundingBox[] = []
let dateBoundingBoxes = ref<Array<any>>([])

let date = ref<Date>(new Date())

const input = useLocalStorage('input', '')
// envia os dados coletados pela ia
watch(click, async (click: any) => {


  if (click == true) {
    descricao.value = "Parar"
    await api.post("/listFrame", {
      tempo: new Date()
    }).then((response: any) => {

      if (response.status == 200) {
        console.log('sucesso')
      }

    })
  } else if (click == false) {
    descricao.value = "Iniciar"



    // limpando variavel
    listBoundingBox.value.splice(0)


  }

})

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

    // vai rastrear os valores que sao encontrados
    dateBoundingBoxes.value = boxes
  },
  ready: () => {

    ready.value = true
    loop()

  }
}

watch(dateBoundingBoxes, async (dateBoundingBoxes) => {
  if (dateBoundingBoxes.length != 0 && click.value == true) {
    let dataNow = `frame_${Date.now()}`


    if (!canvas2.value || !camera || !ctx2.value) {
      return
    }

    canvas2.value!.width = video.videoWidth
    canvas2.value!.height = video.videoHeight

    const draw = ctx2.value;
    draw.clearRect(0, 0, canvas2.value.width, canvas2.value.height)
    draw.drawImage(video, 0, 0)

    const dataURL = canvas2.value.toDataURL('image/png')

    await fetch(dataURL).then(res => res.blob()).then(blob => {

      const arquivo = new File([blob], `${dataNow}`, { type: 'image/png', })
      listFrame.value = arquivo
      let formData = new FormData()

      formData.append('image', arquivo)
      console.log(formData)
      api.post('/frame', formData, {
        'headers': {
          "Content-Type": 'multipart/form-data'
        }

      }).then((response: any) => {

        if (response.status == 200) {
          console.log(response.data)
        }

      }).catch((err) => {

        console.log(err)
      })

      api.post('/listBoundingBox', { list: dateBoundingBoxes, dataNow: dataNow })
        .then((response) => {
          console.log(response.status)
        })
    })


  }

})

worker.addEventListener('message', (e: any) => {
  // desestrutura para receber o nome da função e os argumentos
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
const canvas2 = ref<HTMLCanvasElement>()

const ctx = computed(() => canvas.value?.getContext('2d'))
const ctx2 = computed(() => canvas2.value?.getContext('2d'))
const ready = ref(false)

let nextFrame: number
let camera: MediaStream | void


const BOX_STYLE = {
  box: {
    borderSize: 3,
  },
  label: {
    fontSize: 15,
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

  date.value = new Date()
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
    draw.lineWidth = BOX_STYLE.box.borderSize - 1

    draw.strokeRect(
      box.x,
      box.y,
      box.width,
      box.height
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
    // se for escolhido a tela vai pegar imagem da tela
    : await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: input
      },
      audio: false
    }).catch(err => {
      erro.value = true

      console.log(err)
    })

  if (!camera) {
    return
  }
  erro.value = false
  // Inicia o vídeo
  video.srcObject = camera

  video.play()
}, { immediate: true })



</script>

<template>
  <div class=" p-4 w-full block sm:flex">

    <!-- min-w-900px min-h-450px -->
    <div class="items-center bg-white p4 rounded-2 sm:w-full sm:h-540px dark:bg-gray-900 dark:color-gray">
      <div class="flex w-full my-5px justify-between text-center items-center ">
        <h3>Imagem</h3>
        <select v-model="input" class="px-4 py-2 rounded-lg dark:bg-gray-900 dark:color-gray">
          <option disabled selected value="">Câmera</option>
          <option v-for="device in videoInputs" :key="device.deviceId" :value="device.deviceId">{{ device.label }}
          </option>
          <option value="screen">Tela</option>
        </select>
      </div>


      <div v-if="!ready" class="m-4px items-center w-full h-full ">

        <Loading max="100" :progress="progress * 100" :ready="ready"></Loading>
      </div>


      <canvas v-else ref="canvas" class="w-full "></canvas>


    </div>
    <div class="mt-2 sm:ml-4 w-full">
      <div
        class="bg-white rounded-2 px4 py2 sm:w-350px h-50px flex justify-between items-center dark:bg-gray-900 dark:color-gray">
        <h5>Aperte iniciar para gerar relatorio</h5>
        <button @click="click = !click" class="shadow w-30%  p-2 hover:bg-blue-500 text-white bg-blue rounded-1">
          {{ descricao }}
        </button>
      </div>
      <div class="bg-white rounded-2 p4 sm:w-350px mt-4 dark:bg-gray-900 dark:color-gray">
        <h3 class="py-10px">Relatorio</h3>
        <canvas ref="canvas2" class="bg-black w-full sm:w-350px sm:h-230px rounded-1"></canvas>
        <div class="bg-gray-200 flex justify-between px-4 mt1 rounded-1 text-gray-600 dark:bg-gray-800 dark:color-gray">
          <h5>Classe</h5>
          <h5>Hora</h5>
          <h5>Score</h5>
        </div>
        <div v-for="item in dateBoundingBoxes" :key="item.x" class="flex justify-between px-3 p-2 items-center ">
          <h5>{{ item.label }}</h5>
          <h5>{{ date.getHours() }}:{{ date.getMinutes() }}:{{ date.getSeconds() }}</h5>
          <h5>{{ item.score.toFixed(3) * 100 }}%</h5>
        </div>
      </div>

      <div v-if="erro" class="bg-red-600 rounded-2 p-4 flex my-14px sm:w-350px">
        <font-awesome-icon icon="circle-exclamation" class="c-white h-20px w-20px" />
        <div class="px2">
          <h3 class="text-white ">Câmera não disponivel</h3>
          <p class="text-white ">Verifique se a camera esta conectada corretamente, ou se há erro no hardware</p>
        </div>

      </div>
    </div>


  </div>



</template>
