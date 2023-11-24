<script setup lang="ts">
const props = defineProps(['max', 'progress', 'ready'])


console.log(props.max, props.progress)
</script>

<template>
  <div class="items-center text-center">
    <p>Inicializando...</p>
    <div class="bg-white p-1px rounded-2.1 flex justify-center items-center">
      
      <progress indeterminate class="progress w-full"  :max="props.max" :value="props.progress" ></progress>
      <p>{{parseInt(props.progress)}}</p>
    </div>
  </div>
</template>

<style>

.progress::-webkit-progress-bar {
  background-color: #e0e0e0;
  border-radius: 10px;
  
}

progress::-webkit-progress-value {
  background-color: #4c8baf;
  border-radius: 10px;
  
}

progress::-moz-progress-bar {
  background-color: #4c8baf;
  border-radius: 10px;
  
}

progress::-ms-fill {
  background-color: #4c8baf;
  border-radius: 10px;
  
}
</style>