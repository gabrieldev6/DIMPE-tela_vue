<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
let props = defineProps(['label', 'number'])
let click = ref<boolean>(true)

</script>

<template>
    <div class="w-full bg-white rounded-xl pb-4 dark:bg-gray-900">
        <div class="bg-gray-300 flex justify-between items-center px-2 py-1 rounded-t-lg dark:bg-gray-800">
            <h4>{{ props.label }}{{ props.number }}</h4>
            <button @click="click = !click"
                class="w-20px h-20px bg-gray-300 flex  justify-center items-center rounded-sm p-2 m-1 hover:cursor-pointer hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700">



                <font-awesome-icon icon="fa-solid fa-chevron-down"
                    :class="['thumbnail', click ? 'icone rotate-180 border-none' : 'icone rotate-0 border-none']" />

            </button>
        </div>
        <Transition>
            <div v-show="click" class="p-4 shadow-lg rounded-b-lg">
                <slot>

                </slot>
            </div>
        </Transition>

    </div>


</template>
<style>
.icone {
    transition: all 0.5s ease;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
    transform: translateY(-10px);
    opacity: 0;
    ;
}
</style>