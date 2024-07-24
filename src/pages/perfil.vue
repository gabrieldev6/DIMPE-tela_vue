<script setup lang="ts">
// vue
import { ref } from 'vue';
// icone
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// api
import api from '../service/api';

const img = ref()
const imgSafeS = ref(false)
// const props = defineProps(['nome'])
const pegarValor = async (event: any) => {

    img.value = event.target.files[0]
    console.log(img.value)
    let formData = new FormData()
    formData.append('image', img.value)

    console.log(formData)
    await api.post("/imgUser", formData, {
        'headers': {
            'Content-Type': 'multipart/form-data'
        }
    }
    ).then((response: any) => {
        if (response.status == 200) {
            console.log(response.data)
            imgSafeS.value = true
        }

    }).catch((err) => {
        console.log(err)
    })

}

</script>
<template>
    <div class="w-full h-full flex justify-center items-center bg-gray-200">
        <div class="bg-white w-330px h-500px flex justify-center rounded-xl p-12 text-center">
            <div class="w-full h-full">
                <div class="w-full h-20% bg-gray rounded-t-2">

                    <div class="w-full flex justify-start items-center">



                        <div class="rounded-full m-4 shadow-md w-120px h-120px flex justify-center items-center bg-white">
                            <font-awesome-icon icon="fa-solid fa-user" class="color-gray h-50% w-50%" />
                        </div>



                    </div>
                </div>

                <div>
                    <h3>nome</h3>
                    <h4>email</h4>
                </div>

                <router-link
                    :to="{ name: 'dashboard', query: { nome: $route.query.nome, picture: $route.query.picture, token: $route.query.token } }">
                    <button class=" shadow w-full mt-25 p-2 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        Voltar ao dashboard
                    </button>
                </router-link>
                <div class="flex justify-center items-center ">
                            <label for="inputFoto"
                                class="shadow p-1 bg-blue  hover:bg-blue-500 bg-white rounded-1 ">
                                
                                trocar foto
                            </label>
                            <input @change="pegarValor" name="image" id="inputFoto" type="file" class="hidden">
                        
                        
                    </div>

            </div>


        </div>
    </div>
</template>