<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from '../components/card/card.vue'
import api from '../service/api';


let listsFrames = ref<Array<any>>([])

onMounted(async ()=> {
    await api.get('/getListsframes').then((response)=> {
        if(response.status == 200) {
            response.data.listFrame.forEach((list: any)=> {
                console.log(list)
                listsFrames.value.push(list)
                
                return list
            })
        }
    })

    
})


</script>
<template>
    <div class=" w-full h-30% flex items-center flex-wrap">
        
            <Card v-for="list in listsFrames" :key="list.id_list" :data="list.data" :capa="list.capa" :id="list.id_list"></Card>
            
            <div v-if="listsFrames.length == 0" class="w-full h-full flex justify-center items-center color-gray-600 dark:color-gray">
                <div>
                    <h2>Ainda está vazio :/</h2>
                    Crie algum relatorio para que ele possa aparecer aqui...
                </div>
                
            </div>
       

    </div>
</template>
