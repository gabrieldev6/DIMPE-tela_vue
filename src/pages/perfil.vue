<script setup lang="ts">

</script>
<template>
    <div class="w-full h-full flex justify-center items-center bg-gray-200">
        <div class="bg-white w-300px h-500px flex justify-center rounded-xl p-15 text-center">
            <div class="w-full">
                <div class="w-full flex justify-around items-center ">
                    <div class="rounded-full shadow-md w-150px h-150px flex justify-between items-center">
                        <img :src="$route.query.picture" alt="foto do perfil" class="color-gray w-full h-full rounded-full">
                    </div>
    
                    <h1>{{ $route.query.nome }}</h1>
                </div>
                <router-link :to="{name: 'dashboard', query: {nome: $route.query.nome, picture: $route.query.picture, token: $route.query.token}}">
                    <button
                        class=" shadow w-full mt-10 p-2 hover:bg-blue-500 text-white bg-blue rounded-1 ">
                        Voltar ao dashboard
                    </button>
                </router-link>
                
            </div>
            
            
        </div>
    </div>
    
</template>