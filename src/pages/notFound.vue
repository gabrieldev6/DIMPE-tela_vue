<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);



</script>
<template>
    <div class="w-full h-full flex justify-center items-center text-center text-black">
        <div>
            <h1>Ooops!</h1>
            <div class="flex">
                <h2>Pagina não encontrada</h2>
                <font-awesome-icon icon="fa-solid fa-face-sad-tear" class="text-5 p-2"/>
                
            </div>
            <router-link :to="{name: 'login'}">
            <button class=" shadow w-full mt-10 p-2 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                Voltar a pagina inicial
            </button>
            </router-link>
            
        </div>
        
        
    </div>
</template>