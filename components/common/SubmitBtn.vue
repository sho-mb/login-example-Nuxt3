<template>
  <UButton type="submit" block class="p-4">
    {{ title }}
  </UButton>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title?: string,
  type?: string,
  block?: boolean,
}>(),
  {
    title: '',
    type: 'submit',
    block: false,
  }
)
</script>

<style>

</style>