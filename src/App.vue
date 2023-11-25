<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, Transition } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Element from './components/element/element.vue'
  library.add(fas);
    

const isMenuOpen = ref(false)

</script>

<template>
  <div class="flex bg-[#01091C] h-12%">
    <div class="container mx-auto flex justify-between items-center">
      <img src='./assets/Logo.png' alt="" class="h-16">

      <button @click="isMenuOpen = !isMenuOpen" class="bg-[#01091C] h-50px w-50px cursor-pointer">
        <font-awesome-icon icon="fa-solid fa-bars" class="c-white h-30px w-30px"/>
      </button>


    </div>
  </div>
  <div class="flex w-full h-88% bg-gray">

    <div class="flex-1 h-100% ">
      <RouterView />
    </div>
    <Transition>
      <div v-if="isMenuOpen" class="barraLateral flex w-90  bg-gray-500 flex justify-center" ><Element></Element></div>
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