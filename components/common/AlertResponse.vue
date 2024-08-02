<template>
 <UAlert
    v-if="message"
    class="mt-4 text-center"
    :color="color"
    variant="solid"
    :title="message"
  />
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    message: string,
    color?: string,
  }>(),
  {
    message: '',
    color: 'primary'
  }
)
</script>

<style>

</style>