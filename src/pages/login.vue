<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue'
import logo from '../assets/imgLogin2.jpg'

import { GoogleLogin, decodeCredential } from 'vue3-google-login';
import api from '../service/api.ts'

// import User from '../models/user'
import router from '../router';
interface userData {
    giver_name: string
    picture: string
}

library.add(fas);

let email = ref<string>('')
let senha = ref<string>('')



let submit = async () => {
    console.log(email.value, senha.value)

    api.post("/login", {
        email: email.value,
        senha: senha.value

    }).then((response: any) => {
        // let token = response.data.token
        // let id = response.data.user.id_usuario
        // let nome = response.data.user.nome
        // let email = response.data.user.email
        // let user = new User(token, id, nome, email )
        // console.log(user)
        if (response.status == 200) {

            router.push({ name: 'dashboard', query: { nome: response.data.user.nome, token: response.data.token } })

        } else {
            response.value = true
        }


    })

}

const validacao = (response: any) => {
    if (response.credential != null) {

        const userData = decodeCredential(response.credential)
        console.log(userData)
        router.push({ name: 'dashboard', query: { nome: userData.given_name, token: response.credential, picture: userData.picture } })
    }
}

</script>

<template>
    <div class="flex justify-center items-center text-center bg-gray-100 w-full h-full">
        <div class="bg-white flex w-200 h-120 rounded-xl">
            <img :src="logo" alt="imagem meramente ilustrativa" class="w-120 rounded-xl shadow-xl shadow-gray-400">
            <div class="w-full px-10 py-5 flex justify-center" >
                <div>
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


                    <button @click="submit"
                        class=" shadow w-full mt-10 p-2 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        Entrar
                    </button>


                    <GoogleLogin :callback="validacao" class="w-full m1"></GoogleLogin>
                </div>

            </div>
        </div>


    </div>
</template>

