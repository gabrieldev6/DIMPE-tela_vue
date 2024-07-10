<script setup >
import {useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleState = useToggle(isDark)

</script>
<template>
  <RouterView />
</template>
