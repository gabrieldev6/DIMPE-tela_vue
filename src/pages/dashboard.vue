<script setup lang="ts">
// import { RouterView } from 'vue-router'
// import { ref, Transition } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink } from 'vue-router';

// import Element from './components/element/element.vue'
library.add(fas);
const menus = [
  {id: 1, nome: 'video', path: '/video'}
]

// const isMenuOpen = ref(false)

</script>

<template>
  <div class="h-full w-full flex">
    <!-- sadbar -->
    <div class="h-full w-20% max-w-48 bg-white shadow-2xl z-10 px-4 ">
      <ul class="list-none py-4">
        <li><img src="../assets/loremIpson1.png" alt=""></li>

        <li class="py-4">
          <div class="border-solid border-2 border-gray-400 rounded-2 flex justify-between items-center">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="p-1 text-gray-500 " />
            <input class="border-4 p-2 text-4 rounded-2 focus:outline-none w-80%" type="text" placeholder="Search">
          </div>
        </li>

        <li>
          <button type="submit" class=" bg-white shadow hover:bg-gray-200 w-full flex text-4 text-gray-500 flex items-center text-center my-1 p-2 rounded-2">
            <font-awesome-icon icon="fa-solid fa-table-columns" class="mx-2" />
            
            <router-link :to="menus[0].path">Dashboard</router-link>
          </button>
        </li>
        <li>
          <button type="submit" class=" bg-white w-full flex text-4 shadow text-gray-500 flex items-center text-center my-1 p-2 rounded-2">
            <font-awesome-icon icon="fa-solid fa-chart-line" class="mx-2"/>
            Analitíco
          </button>
        </li>
        <li>
          <button type="submit" class=" bg-white w-full flex text-4 shadow text-gray-500 flex items-center text-center my-1 p-2 rounded-2">
            <font-awesome-icon icon="fa-solid fa-toolbox" class="mx-2"/>
            Opções
          </button>
        </li>
        
        <li>
          <button type="submit" class=" bg-white w-full flex text-4 shadow text-gray-500 flex items-center text-center my-1 p-2 rounded-2">
            <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="mx-2"/>
            sair da conta
          </button>
        </li>
      </ul>



    </div>
    <!-- lado direito -->
    <div class="w-full">

      <!-- barra superior -->
      <div class="flex bg-white h-8%  justify-between items-center px-4">

        <h1>Dashboard</h1>
        <div class="flex justify-center items-center">
          <font-awesome-icon icon="fa-solid fa-gear" class="color-gray h-25px w-25px mx-20px" />
          <a href="">
            <div class=" rounded-full shadow-md"><font-awesome-icon icon="fa-solid fa-user"
                class="color-gray w-20px h-20px p2 bx-4" /></div>
          </a>
        </div>

      </div>


      <div class="flex bg-gray-200 border-4 h-92%">
        <RouterView />
      </div>
      <!-- <Transition>
      <div v-if="isMenuOpen" class="barraLateral flex w-90  bg-gray-500 flex justify-center" ><Element></Element></div>
    </Transition> -->




    </div>


  </div>
</template>

<style>
/* .barraLateral.v-enter-active,
.barraLateral.v-leave-active {
  transition: all 1s ease;
}

.barraLateral.v-enter-from,
.barraLateral.v-leave-to {
  max-width: 0 !important;
}

.barraLateral.v-enter-to,
.barraLateral.v-leave-from {
  @apply: max-w-100;
} */

/* button:active {
  background-color: #e2e2e2;
  border-radius: 7px;
  transition: all ease-in;
} */
</style>