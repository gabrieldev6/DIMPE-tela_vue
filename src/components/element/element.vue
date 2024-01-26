<script setup lang="ts">
let data = new Date()


</script>

<template>
    <div class="flex h-50px w-340px m-2 bg-orange rounded-lg">
        <canvas></canvas>
        <p>classe </p>
        <p>{{ data.getHours() }}:{{ data.getMinutes() }} </p>
        <p>{{ data.getDay() }}/{{ data.getMonth()+1 }}/{{ data.getFullYear() }}</p>
    </div>
</template>