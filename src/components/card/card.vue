<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
    <div class="m-2 bg-white rounded-lg p3 m4 h-300px">

        <div class="flex justify-between py2 ">
            <div class="flex">
                <div class="bg-gray rounded-full shadow-md w-40px h-40px flex justify-center items-center"></div>
                <div class="px-2">
                    <h4 class="">Nome</h4>
                    <h6>Setembro 14, 2024</h6>
                </div>
            </div>

            <button class="rounded-full w-40px bg-white hover:bg-gray-200 cursor-pointer flex items-center justify-center"><font-awesome-icon icon="fa-solid fa-trash" class="text-4"/></button>
        </div>


        <canvas class="bg-black w-250px h-180px rounded-1"></canvas>
        <div class="flex ">
            <button class="shadow w-30% mt-2 mr-3 p-2 hover:bg-blue-500 text-white bg-blue rounded-1">Analisar</button>
            <button class="shadow w-30% mt-2 p-2 hover:bg-red-500 text-white bg-red rounded-1">Reportar</button>
        </div>
        
    </div>
</template>