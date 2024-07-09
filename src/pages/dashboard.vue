<script setup lang="ts">
// import { RouterView } from 'vue-router'
// import { ref, Transition } from 'vue'

import { watchEffect, ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink } from 'vue-router';

import logo from "../assets/logoDimpe.png"
import { googleLogout } from 'vue3-google-login';

// import { decodeCredential } from 'vue3-google-login';



library.add(fas);

let saudacoes = ref('')
let hours = new Date()
// let props = defineProps([token])

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
    <div class="h-full w-full flex dark:bg-gray-9">
      <!-- sadbar -->
      <div class="h-full min-w-240px max-w-240px bg-white shadow-2xl z-10 px-4 ">
        <ul class="list-none py-4 ">
          <li><img :src="logo" alt="" class="w-120px px-5"></li>

          <li class="py-4">
            <div class="border-solid border-2 border-gray-400 rounded-2 flex justify-between items-center">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="ml-4 text-gray-500 " />
              <input class="border-4 p-2 text-4 rounded-2 focus:outline-none w-80%" type="text" placeholder="Search">
            </div>
          </li>

          <li>
            <router-link :to="{ name: 'video', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline ">
              <button type="submit"
                class=" bg-white shadow transition-shadow w-full text-4 flex items-center text-center my-1 p-2 rounded-2 text-gray-500 border-solid border-l-4 border-l-blue-500">

                <font-awesome-icon icon="fa-solid fa-table-columns" class="mx-2" />
                Dashboard

              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'analitico', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md w-full text-4  flex items-center text-center my-1 p-2 rounded-2  text-gray-500 border-solid border-l-4 border-l-blue-500">
                <font-awesome-icon icon="fa-solid fa-chart-line" class="mx-2 " />
                Analitico
              </button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'rota', query: { nome: $route.query.nome, token: $route.query.token } }"
              class="no-underline">
              <button type="submit"
                class=" bg-white shadow hover:shadow-md w-full text-4  flex items-center text-center my-1 p-2 rounded-2  text-gray-500 border-solid border-l-4 border-l-blue-500">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="mx-2 " />
                Gerador de rota
              </button>
            </router-link>
          </li>
          <li>
            <button type="submit"
              class=" bg-white w-full flex text-4 shadow hover:shadow-md text-gray-500 items-center text-center my-1 p-2 rounded-2 border-solid border-l-4 border-l-blue-500">
              <font-awesome-icon icon="fa-solid fa-toolbox" class="mx-2" />
              Opções
            </button>
          </li>

          <li>
            <router-link :to="{ name: 'login' }" @click="logout" class="no-underline">
              <button type="submit"
                class=" bg-white w-61 flex text-4 shadow hover:shadow-md text-gray-500 items-center text-center my-1 p-2 rounded-2 border-solid border-l-4 border-l-blue-500 absolute bottom-8">
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
        <div class="flex bg-white h-8% drop-shadow-md justify-between items-center px-4">

          <h2 class="color-gray-600">{{ saudacoes }} {{ $route.query.nome }}</h2>
          <div class="flex justify-center items-center">
            <font-awesome-icon icon="fa-solid fa-gear" class="color-gray h-25px w-25px mx-20px" />

            <router-link :to="{ name: 'perfil', query: { nome: $route.query.nome, token: $route.query.token } }"
              :props="{ nome: $route.query.nome }">
              <div class=" rounded-full shadow-md w-40px h-40px flex justify-center items-center">
                <font-awesome-icon icon="fa-solid fa-user" class="color-gray h-20px w-20px m-1" />

                <!-- <img v-else="$route.query.picture" alt="perfil" class="color-gray w-40px h-40px rounded-full" /> -->
              </div>
            </router-link>


          </div>

        </div>
        <div class='dark'></div>
        <!-- visualição das rotas -->
        <div class="flex flex-wrap   bg-gray-200 dark:bg-gray-800 border-4 w-full h-92% overflow-y-scroll">


          <RouterView />

        </div>
        <!-- <Transition>
          <div v-if="isMenuOpen" class="barraLateral flex w-90  bg-gray-500 flex justify-center" ><Element></Element></div>
        </Transition> -->




      </div>


    </div>
  </template>

  <div v-else class="w-full h-full flex items-center justify-center">
    esteja logado para acessar esta pagina

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