<script setup lang="ts">
const route = useRoute()
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div class="text-center mt-40 text-red-400 text-4xl">
    Congrats login success
  </div>
</template>
