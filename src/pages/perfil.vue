<script setup lang="ts">
import { ref } from 'vue';
import api from '../service/api';

const img = ref()
const imgSafeS = ref(false)
const pegarValor = async (event: any) => {

    img.value = event.target.files[0]
    console.log(img.value)
    let formData = new FormData()
    formData.append('image', img.value)
    
    console.log(formData)
    await api.post("/imgUser", formData, {
        'headers': {
            'Content-Type': 'multipart/form-data'
        }}
            ).then((response: any) => {
            if (response.status == 200) {
                console.log(response.data)
                imgSafeS.value = true
            }

            }).catch((err)=> {
                console.log(err)
            })
    // const file: Array<File> = event.target.files
    
    //     const reader = new FileReader()

    // reader.onload = async () => {
    //     const base64String = reader.result
    //     img.value = base64String
    //     )
    // }
    // reader.onerror = error => {
    //     console.log(error)
    // }
    // reader.readAsDataURL(file[0])

}

</script>
<template>
    <div class="w-full h-full flex justify-center items-center bg-gray-200">
        <div class="bg-white w-330px h-500px flex justify-center rounded-xl p-12 text-center">
            <div class="w-full">
                <div class="w-full flex justify-around items-center ">
                    <div class="rounded-full shadow-md w-150px h-150px flex justify-between items-center">
                        <img alt="foto do perfil" class="color-gray w-full h-full rounded-full">
                        <!-- <img :src="$route.query.picture" alt="foto do perfil" class="color-gray w-full h-full rounded-full"> -->
                    
                    </div>
                    <div>
                        <h1>{{ $route.query.nome }}</h1>
                        <div class="py-3 w-full flex ">
                            <label for="inputFoto"
                                class="shadow w-full p-1 hover:bg-blue-500 text-white bg-blue rounded-1 ">Trocar foto de
                                perfil</label>
                            <input @change="pegarValor" name="image" id="inputFoto" type="file" class="hidden">
                        </div>
                        <p v-if="imgSafeS" class="text-red-500">imagem salva com sucesso</p>
                    </div>
                </div>

                <router-link
                    :to="{ name: 'dashboard', query: { nome: $route.query.nome, picture: $route.query.picture, token: $route.query.token } }">
                    <button class=" shadow w-full mt-10 p-2 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        Voltar ao dashboard
                    </button>
                </router-link>


            </div>


        </div>
    </div>
</template>