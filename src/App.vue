<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, Transition } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  library.add(fas);
    

const isMenuOpen = ref(false)

</script>

<template>
  <div class="flex bg-[#01091C] h-12vh">
    <div class="container mx-auto flex justify-between items-center">
      <img src='./assets/Logo.png' alt="" class="h-16">

      <button @click="isMenuOpen = !isMenuOpen" class="bg-[#01091C] h-50px w-50px">
        <font-awesome-icon icon="fa-solid fa-bars" class="c-white h-30px w-30px"/>
      </button>


    </div>
  </div>
  <div class="flex w-full h-88vh bg-gray">

    <div class="flex-1">
      <RouterView />
    </div>
    <Transition>
      <div v-if="isMenuOpen" class="w-90 barraLateral bg-gray-500"></div>
    </Transition>

    

  </div>
</template>

<style>
  .barraLateral.v-enter-active, .barraLateral.v-leave-active {
    transition: all 1s ease;
  }
  .barraLateral.v-enter-from, .barraLateral.v-leave-to {
    max-width: 0 !important;
  }
  .barraLateral.v-enter-to, .barraLateral.v-leave-from {
    @apply: max-w-100;
  }

  button:active {
    background-color: #042570;
    border-radius: 7px;
    transition: all ease-in;
  }
</style>