<script setup lang="ts">

const props = defineProps(['classe', 'porcentagem'])
let data = new Date()

</script>

<template>
    <div class="bg-gray-500 rounded-lg p-2">
        <p class="text-2xl font-semibold text-white dark:text-white">ALERTA DETECTADO</p>


        <img src="" alt="" class="w-50px h-50px bg-black">

        <div class="flex justify-around">
            <p class="tracking-tighter text-white md:text-lg dark:text-gray-400">{{ props.classe }}</p>
            <p class="tracking-tighter text-white md:text-lg dark:text-gray-400">{{ props.porcentagem }}</p>
            <p class="tracking-tighter text-white md:text-lg dark:text-gray-400">{{ `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}` }}</p>

        </div>
        <div class="flex justify-around">
            <button class="c-white bg-blue rounded-2 w-100px h-20px">Cancelar</button>
            <button class="c-white bg-red rounded-2 w-100px h-20px">Reportar</button>

        </div>

    </div>
</template>