<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue'
import logo from '../assets/logoDrone.svg'

import logo1 from "../assets/logoDimpe.svg"

import { GoogleLogin, decodeCredential } from 'vue3-google-login';
import api from '../service/api.ts'

import { userData } from '../types/user'
import router from '../router';



library.add(fas);

let email = ref<string>('')
let senha = ref<string>('')
let campoNull = ref<boolean>(false)


// login feito pelo backend
let submit = async () => {

    // valida se os campos nao estao vazios
    if (email.value != '' && senha.value != '') {
        api.post("/login", {
            email: email.value,
            senha: senha.value

        }).then((response: any) => {

            if (response.status == 200) {

                router.push({ name: 'dashboard', query: { nome: response.data.user.nome, token: response.data.token } })

            } else {

                response.value = true
            }
            console.log(response.data)


        })
        // se estiver vazio vai gerar um alerta
    } else {
        campoNull.value = true
    }


}
// pega os dados de nome, token e foto do usario que logou com a conta do google
const validacao = (response: any) => {

    if (response.credential != null) {
        //usa esse tipo para pegar as informações principais necessarias
        const userData = decodeCredential(response.credential) as userData

        // joga para tela de dashboard as informações do usuario pela barra de navegação
        router.push({
            name: 'dashboard',
            query: {
                nome: userData.given_name,
                token: response.credential,
            }

        })
    }
}

</script>

<template>
    <div class="w-full h-full flex justify-center items-center text-center bg-gray-200 dark:bg-gray-900">
        <div class="bg-white w-full h-full 2xl:max-w-1800px sm:flex dark:bg-gray-900">
            <div class="w-70% shadow-xl shadow-gray-400 hidden sm:block">
                <!--  -->
                <div class="w-full h-95% flex justify-around items-center bg-gradient-to-t from-blue-300 to-gray-700">
                    <div class="w-40 h-40">
                        <img :src="logo" alt="imagem meramente ilustrativa" class="w-full h-full">
                    </div>
                    <h1 class="color-white">Olá, seja bem vindo ao futuro!</h1>
                </div>
                <button class="w-full h-5% hover:bg-gray-300">O que é Dimpe?</button>
            </div>
            
            <div class="px-10 h-90% py-5 sm:w-30% dark:bg-gray-900 dark:color-white">
                <div class="w-full h-95%">
                    <img :src="logo1" alt="logo" class="w-150px mt-8 2xl:w-250px">
                    <div class="w-full flex justify-start"><h2 class="mt-12 font-normal dark:color-gray">Entrar</h2></div>
                    

                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800 dark:color-gray">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" class="p-2"></FontAwesomeIcon>
                        <input v-model="email" type="Email" placeholder="Email" class="p-4 w-full rounded-1 text-4 font-bold dark:bg-gray-800 dark:color-gray">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray dark:bg-gray-800 dark:color-gray">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="senha" type="password" placeholder="Senha" class="p-4 w-full rounded-1  text-4 font-bold dark:bg-gray-800 dark:color-gray">

                    </div>
                    
                    <h5 v-if="campoNull" class="text-red mt-3">Um ou mais campos estão vazios</h5>

                    <button @click="submit"
                        class=" shadow w-full mt-10 p-4 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        <h3>Entrar</h3>
                    </button>

                    <div class="flex justify-between py-8 mx-2">
                        
                        <router-link :to="{ name: 'newAccount' }" class="no-underline">
                            <h3 class="color-black font-normal dark:color-gray" >Esqueceu a senha?</h3>
                        </router-link>
                        <router-link :to="{ name: 'newAccount' }" class="no-underline">
                            <h3 class="color-black font-normal dark:color-gray">Criar conta</h3>
                        </router-link>
                    </div>
                    
                    <GoogleLogin :callback="validacao"></GoogleLogin>
                    
                    
                </div>
                <div class="flex w-full justify-center dark:bg-gray-900 dark:color-gray">
                    <span>Versão 12.17.0</span>
                </div>
                <div class="flex w-full justify-center dark:color-gray">
                    <span>Copyright © 2024 - DIMPE - Todos os direitos reservados</span>
                </div>
                <div class="w-full flex justify-around pt-2 dark:bg-gray-900 dark:color-gray">
                    <span>Segurança da Informação</span>
                    <span>Politica de Privacidade</span>
                    <span>Código de Ética</span>
                </div>
            </div>
            
        </div>
        

    </div>
</template>
