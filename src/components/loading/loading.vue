<script lang="ts" setup>


const props = defineProps(['max', 'progress', 'ready'])


console.log(props.max, props.progress)
</script>

<template>
  <div class=" w-full h-70%  flex justify-center items-center">
    <ul class=" w-full list-none ">
      <li class="w-full flex justify-center">
        <div class=" w-30px h-30px animate-spin rounded-full border-solid border-6 border-blue-500 border-t-blue-400 "></div>
      </li >
      <li class="w-full flex justify-center pt-3">
        <h4>Inicializando...{{parseInt(props.progress)}}%</h4>
      </li>
    </ul>
    
    
    
      
    </div>
  
</template>
