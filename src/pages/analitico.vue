<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from '../components/card/card.vue'
import api from '../service/api';

let listsFrames = ref<Array<any>>([])

onMounted(async ()=> {
    const response = await api.get('/getListsframes').then((response)=> {
        if(response.status == 200) {
            response.data.listFrame.forEach((list: any)=> {
                
                listsFrames.value.push(list)
                
                return list
            })
        }
    })
    console.log(`response: ${response}`)
    
})


</script>
<template>
    <div class=" w-100% h-30% flex flex-wrap ">
        
            <Card v-for="list in listsFrames" :key="list.id_list" :data="list.data" :id="list.id_list"></Card>
            
       

    </div>
</template>
