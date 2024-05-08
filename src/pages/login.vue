<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue'
import logo from '../assets/imgLogin2.jpg'



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
    <div class="flex justify-center items-center text-center bg-gray-200 w-full h-full">
        <div class="bg-white flex w-200 h-120 rounded-xl">
            <img :src="logo" alt="imagem meramente ilustrativa" class="w-120 rounded-xl shadow-xl shadow-gray-400">
            <div class="w-full px-10 py-5 flex justify-center">
                <div class="w-full">
                    <h1 class="mt-4">Login</h1>
                    <h5 class="mb-13">Olá, seja bem vindo ao futuro!</h5>

                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray ">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" class="p-2"></FontAwesomeIcon>
                        <input v-model="email" type="Email" placeholder="Email" class="p-2 w-full rounded-1">

                    </div>
                    <div class="bg-white w-full mt-3 rounded-1 shadow flex items-center text-center text-gray ">
                        <FontAwesomeIcon icon="fa-solid fa-lock" class="p-2"></FontAwesomeIcon>
                        <input v-model="senha" type="password" placeholder="Senha" class="p-2 w-full rounded-1">

                    </div>
                    <div class="flex">
                        <a href="">esqueceu a senha?</a>
                    </div>
                    <h5 v-if="campoNull" class="text-red mt-3">Um ou mais campos estão vazios</h5>

                    <button @click="submit"
                        class=" shadow w-full mt-10 p-2 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        Entrar
                    </button>

                    <div class="flex mb-3">
                        <h5>Ainda não possui conta?</h5>
                        <router-link :to="{ name: 'newAccount' }">
                            <h5>criar conta</h5>
                        </router-link>
                    </div>
                    <GoogleLogin :callback="validacao"></GoogleLogin>
                    

                </div>

            </div>
        </div>


    </div>
</template>
