<script setup lang="ts">
import { ref } from 'vue';
    const classe = ref('')
    const porcentagem = ref('')
    const data = ref(Date.toString)
</script>

<template>
    <div>
        <p>ALERTA DETECTADO</p>
        <p>{{ classe }}</p>
        <p>{{ porcentagem }}</p>
        <p>{{ data }}</p>

        <img src="" alt="">
        <button>Cancelar</button>
        <button>Reportar</button>
    </div>
</template>