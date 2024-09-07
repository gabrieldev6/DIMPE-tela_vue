<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
let props = defineProps(['label', 'show']);
let show = ref<boolean>(props.show)

watchEffect(()=> {
    show.value = props.show
})
</script>
<template>
  <Transition name="slide-fade">
    <div v-if="show" class="w-100% h-full z-1000 flex fixed justify-center items-center backdrop-blur-sm ">
        
        <!-- popup -->
        
        <div v-show="$props.show"
            class="sm:w-600px sm:max-h-600px w-500px shadow fixed justify-around items-center bg-white rounded-2 border-solid border-l-4 border-l-blue-500 dark:bg-gray-900 dark:color-gray dark:border-l-blue-900">
            <div class="flex justify-between items-center p3">
                <h3>{{ props.label }}</h3>

                <button @click="show=!show" class="w-50px h-50px cursor-pointer bg-white hover:bg-gray-1 rounded-md dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700"> <font-awesome-icon icon="fa-solid fa-x" /></button>
            </div>
            <div class="flex justify-center p3 ">
                <slot class="">

                </slot>

            </div>

        </div>
        
    </div>
  </Transition>
</template>
<style>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>