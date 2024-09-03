<script setup lang="ts">
import Modal from "../components/modal/modal.vue"
</script>
<template>
    <div class="w-full h-full">
       
        <Modal label="Termos de uso" :show=true>
            conteudo de modal
            <button
                        class="w-100px h-40px shadow  flex items-center justify-center p-2 mx-5px text-black hover:bg-gray-100 bg-white rounded-1 dark:bg-gray-800 dark:color-gray dark:hover:bg-gray-700">
                        <h4>Cancelar</h4>
                    </button>

                    <button 
                        class="w-100px h-40px shadow flex items-center justify-center p-2 mx-5px text-white hover:bg-red-600 bg-red-500 rounded-1 ">
                        <h4>Deletar</h4>
                    </button>
        </Modal>
    </div>
</template>