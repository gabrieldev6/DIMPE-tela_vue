<script setup lang="ts">


import { watchEffect, ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink } from 'vue-router';

import logo from "../assets/logoDimpe.svg"
import { googleLogout } from 'vue3-google-login';

// import SlideBinary from '../components/slideBinary/slideBinary.vue';

import { useDark } from '@vueuse/core'

const isDark = useDark()


library.add(fas);

let saudacoes = ref('')
let hours = new Date()



watchEffect(() => {

  if (hours.getHours() >= 18 && hours.getHours() <= 24) {
    saudacoes.value = "Boa noite"
  } else if (hours.getHours() >= 12 && hours.getHours() <= 18) {
    saudacoes.value = "Boa tarde"
  } else {
    saudacoes.value = "Bom dia"
  }
})
const logout = () => {
  googleLogout()

}


// const isMenuOpen = ref(false)

</script>

<template>

  <template v-if="$route.query.token">
    <div class="h-full w-full flex dark:bg-gray-900">
      <!-- navigationBar -->
      <div class="h-full min-w-240px max-w-240px z-10 hidden sm:flex bg-white shadow-2xl px-4 dark:bg-gray-900 dark:shadow-black">
        <ul class="list-none py-4 ">
          <li><img :src="logo" alt="" class="w-120px px-5 dark:color-white"></li>

          <li class="py-4">
            <div class="border-solid border-2 border-gray-400 rounded-2 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="ml-4 text-gray-500 " />
              <input class="border-4 p-2 text-4 rounded-2 focus:outline-none w-80% dark:border-l-gray dark:bg-gray-800 dark:color-gray" type="text" placeholder="Search">
            </div>
          </li>

          <li>
            <router-link :to="{ name: 'video', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline ">
              <button type="submit"
                class=" bg-white shadow transition-shadow w-full text-4 flex items-center text-center my-1 p-2 rounded-2 text-gray-500 border-solid border-l-4 border-l-blue-500 dark:border-l-blue-900 dark:bg-gray-800 dark:color-gray">

                <font-awesome-icon icon="fa-solid fa-table-columns" class="mx-2" />
                Dashboard

              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'analitico', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md w-full text-4  flex items-center text-center my-1 p-2 rounded-2  text-gray-500 border-solid border-l-4 border-l-blue-500 dark:border-l-blue-900 dark:bg-gray-800 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-chart-line" class="mx-2 " />
                Analitico
              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'rota', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md w-full text-4  flex items-center text-center my-1 p-2 rounded-2  text-gray-500 border-solid border-l-4 border-l-blue-500 dark:border-l-blue-900 dark:bg-gray-800 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="mx-2 " />
                Gerador de rota
              </button>
            </router-link>
          </li>
          <li>
            <button type="submit"
              class=" bg-white  w-full flex text-4 shadow hover:shadow-md text-gray-500 items-center text-center my-1 p-2 rounded-2 border-solid border-l-4 border-l-blue-500 dark:border-l-blue-900 dark:bg-gray-800 dark:color-gray">
              <font-awesome-icon icon="fa-solid fa-toolbox" class="mx-2" />
              Opções
            </button>
          </li>
          
          <li>
            <router-link :to="{ name: 'login' }" @click="logout" class="no-underline">
              <button type="submit"
                class=" bg-white w-61 flex text-4 shadow hover:shadow-md text-gray-500 items-center text-center my-1 p-2 rounded-2 border-solid border-l-4 border-l-blue-500 absolute bottom-8 dark:border-l-blue-900 dark:bg-gray-800 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="mx-2" />
                Sair da conta
              </button>
            </router-link>

          </li>
        </ul>



      </div>
      <!-- lado direito/ router view -->
      <div class="w-full">

        <!-- barra superior -->
        <div class="flex bg-white h-8% drop-shadow-md justify-between items-center px-4 dark:bg-gray-900 dark:shadow-xl">

          <h2 class="color-gray-600 dark:color-gray text-5 sm:text-7 ">{{ saudacoes }} {{ $route.query.nome }}</h2>
          <div class="flex justify-center items-center">
            <div class="flex items-center px-4">
              
              <font-awesome-icon icon="fa-solid fa-sun" class="color-gray-400 dark:color-gray h-20px w-20px m-1"/>



              <input type="checkbox" v-model="isDark"/>
              <font-awesome-icon icon="fa-solid fa-moon" class="color-gray-400 dark:color-gray h-20px w-20px m-1"/>
            </div>
              

            <router-link :to="{ name: 'perfil', query: { nome: $route.query.nome, token: $route.query.token } }"
              :props="{ nome: $route.query.nome }">
              <div class=" rounded-full shadow-md w-40px h-40px flex justify-center items-center dark:bg-gray-800 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-user" class="color-gray dark:color-gray h-20px w-20px m-1" />

                <!-- <img v-else="$route.query.picture" alt="perfil" class="color-gray w-40px h-40px rounded-full" /> -->
              </div>
            </router-link>


          </div>

        </div>
        
        <!-- visualição das rotas -->
        <div class="flex flex-wrap   bg-gray-200 dark:bg-gray-800 border-4 w-full h-82% sm:h-92% overflow-y-scroll">


          <RouterView />

        </div>
        <!-- <Transition>
          <div v-if="isMenuOpen" class="barraLateral flex w-90  bg-gray-500 flex justify-center" ></div>
        </Transition> -->


        
        <!-- navigation bar mobile -->
        <div class="h-10% flex sm:hidden items-center justify-center shadow-xl">
          <ul class="w-full flex list-none items-center justify-around">
            <li>
            <router-link :to="{ name: 'video', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md h-15 w-15 text-4 m-1 p-2 rounded-2  text-gray-500 border-solid border-b-4 border-b-blue-500 dark:border-l-blue-900 dark:bg-gray-900 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-camera" class="mx-2 w-6 h-6" />
                <h5 class="font-normal">Camera</h5>
                
              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'analitico', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md h-15 w-15 text-4 m-1 p-2 rounded-2  text-gray-500 border-solid border-b-4 border-b-blue-500 dark:border-l-blue-900 dark:bg-gray-900 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-image" class="mx-2 w-6 h-6" />
                <h5 class="font-normal">Galeria</h5>
                
              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'rota', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md h-15 w-15 text-4 m-1 p-2 rounded-2  text-gray-500 border-solid border-b-4 border-b-blue-500 dark:border-l-blue-900 dark:bg-gray-900 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="mx-2 w-6 h-6" />
                <h5 class="font-normal">Rotas</h5>
              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'analitico', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md h-15 w-15 text-4 m-1 p-2 rounded-2  text-gray-500 border-solid border-b-4 border-b-blue-500 dark:border-l-blue-900 dark:bg-gray-900 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-toolbox" class="mx-2 w-6 h-6" />
                <h5 class="font-normal">Opções</h5>
              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'login', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md h-15 w-15 text-4 m-1 p-2 rounded-2  text-gray-500 border-solid border-b-4 border-b-blue-500 dark:border-l-blue-900 dark:bg-gray-900 dark:color-gray">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="mx-2 w-6 h-6" />
                <h5 class="font-normal">Sair</h5>
              </button>
            </router-link>
          </li>
          </ul>
        </div>
      </div>
      

    </div>
  </template>

  <div v-else class="w-full h-full flex items-center justify-center">
    esteja logado para acessar esta pagina

  </div>
</template>
<!-- <style>
.barraLateral.v-enter-active,
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

button:active {
  background-color: #e2e2e2;
  border-radius: 7px;
  transition: all ease-in;
}
</style> -->