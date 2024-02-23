<script setup lang="ts">

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import logo from '../assets/imgLogin.jpg'

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
// watch( nome, (nome: string) => {
//     console.log(nome)
// })
// watch( email, (email: string) => {
//     console.log(email)
// })
// watch( senha, (senha: string) => {
//     console.log(senha)
// })
// watch( confirmacao, (confirmacao: string) => {
//     console.log(confirmacao)

// })
const submit = () => {
    if (nome.value != '' && email.value != '' && senha.value != '' && confirmacao.value != '') {
        if (senha.value == confirmacao.value) {

            console.log(nome.value, email.value, senha.value, confirmacao.value)
            api.post("/usuario", {
                nome: nome.value,
                email: email.value,
                senha: senha.value

            }).then((response: any) => {
                if(response.status == 200) {
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
        <div class="bg-white flex w-200 h-120 rounded-xl ">

            <img :src="logo" alt="imagem meramente ilustrativa" class="w-120 rounded-xl shadow-xl shadow-gray-400">

            <div class="w-full px-10 py-5 flex justify-center">
                <div class="w-full">
                    <h1 class="mt-4">Crie uma conta</h1>
                    <h5 class="mb-7">Olá, seja bem vindo ao futuro!</h5>

                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray">
                        <FontAwesomeIcon icon="fa-solid fa-user" class="p-2"></FontAwesomeIcon>
                        <input v-model="nome" type="text" placeholder="Nome" class="p-2 w-full rounded-1">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" class="p-2"></FontAwesomeIcon>
                        <input v-model="email" type="Email" placeholder="Email" class="p-2 w-full rounded-1">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="senha" type="password" placeholder="Senha" class="p-2 w-full rounded-1">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray ">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="confirmacao" type="password" placeholder="Confirme a senha"
                            class="p-2 w-full rounded-1">

                    </div>
                    <h5 v-if="senhaConfere" class="text-red mt-3">senhas são diferentes</h5>
                    <h5 v-if="campoNull" class="text-red mt-3">Um ou mais campos estao vazios</h5>
                    <h5 v-if="tudoCerto" class="text-black mt-3">Conta criada com sucesso</h5>
                    <button @click="submit"
                        class=" shadow w-full mt-7 p-2 hover:bg-blue-500 text-white bg-blue rounded-1 ">Cadastrar-se</button>
                    
                    <div class="flex mb-3">
                        <h5>ja possui uma conta?</h5>
                        <router-link :to="{ name: 'login' }">
                            <h5>fazer login</h5>
                        </router-link>
                    </div>

                    
                </div>



            </div>

        </div>
</div></template>