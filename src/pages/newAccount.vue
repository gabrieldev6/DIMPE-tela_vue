<script setup lang="ts">

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import logo from '../assets/logoDrone.svg'
import logo1 from '../assets/logoDimpe.svg'
import { ref } from 'vue';
import api from '../service/api'
library.add(fas);

let nome = ref<string>('')
let email = ref<string>('')
let senha = ref<string>('')
let confirmacao = ref<string>('')
let senhaConfere = ref(false)
let campoNull = ref(false)
let tudoCerto = ref(false)

const submit = () => {
    if (nome.value != '' && email.value != '' && senha.value != '' && confirmacao.value != '') {
        if (senha.value == confirmacao.value) {

            console.log(nome.value, email.value, senha.value, confirmacao.value)
            api.post("/usuario", {
                nome: nome.value,
                email: email.value,
                senha: senha.value

            }).then((response: any) => {
                if (response.status == 200) {
                    tudoCerto.value = true
                    senhaConfere.value = false
                    campoNull.value = false
                }
                console.log(response.status)
            })
        } else {
            senhaConfere.value = true
            campoNull.value = false
            tudoCerto.value = false
            console.log('senhas sao diferentes')
        }
    } else {
        campoNull.value = true
        senhaConfere.value = false
        tudoCerto.value = false
        console.log('algum campo ficou em branco')
    }
}

</script>

<template>
    <div class="flex justify-center items-center text-center bg-gray-100 w-full h-full">
        <div class="bg-white flex w-full h-full">

            <div class="w-full px-10 py-5  sm:w-30%">
                <div class="w-full h-90%">
                    <img :src="logo1" alt="logo" class="w-150px mt-8 2xl:w-250px">
                    <div class="w-full flex justify-start">
                        <h2 class="mt-12 font-normal">Cadastrar</h2>
                    </div>


                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray">
                        <FontAwesomeIcon icon="fa-solid fa-user" class="p-2"></FontAwesomeIcon>
                        <input v-model="nome" type="text" placeholder="Nome"
                            class="p-4 w-full rounded-1 text-4 font-bold dark:bg-gray-800">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" class="p-2"></FontAwesomeIcon>
                        <input v-model="email" type="Email" placeholder="Email"
                            class="p-4 w-full rounded-1 text-4 font-bold">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="senha" type="password" placeholder="Senha"
                            class="p-4 w-full rounded-1 text-4 font-bold">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray ">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="confirmacao" type="password" placeholder="Confirme a senha"
                            class="p-4 w-full rounded-1 text-4 font-bold">

                    </div>
                    <h5 v-if="senhaConfere" class="text-red mt-3">senhas são diferentes</h5>
                    <h5 v-if="campoNull" class="text-red mt-3">Um ou mais campos estao vazios</h5>
                    <h5 v-if="tudoCerto" class="text-black mt-3">Conta criada com sucesso</h5>
                    
                    <div class="flex w-full justify-start items-center pt-4 underline-0">
                        <input class="mx-4 w-6 h-6" type="checkbox">
                        <h4 class="font-normal">Eu li e concordo com o <a class="no-underline color-blue-700 cursor-pointer font-bold" href="">termos de serviço</a> e <a class="no-underline color-blue-700 cursor-pointer font-bold"  href="">politica de privacidade</a> da companhia</h4>
                    
                    
                    </div>
                    <button @click="submit"
                        class=" shadow w-full mt-7 p-4 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        <h3>Cadastrar-se</h3>
                    </button>

                    <div class="flex mt-3 items-center">
                        <h4 class="font-normal">ja possui uma conta?</h4>
                        <router-link :to="{ name: 'login' }" class="ml-2 flex items-center no-underline hover:color-blue-800 text-blue-500 cursor-pointer font-bold">
                            <h3 class="font-bold ">Fazer login</h3>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="p-2"></FontAwesomeIcon>
                        </router-link>
                        
                    </div>
                    
                </div>
                
                    
                    


            </div>
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
        </div>
    </div>
</template>