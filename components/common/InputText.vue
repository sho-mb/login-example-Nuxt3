<template>
  <UFormGroup :label="label" :name="name" :size="size" >
    <UInput v-model="formModel" :type="type" />
  </UFormGroup>
</template>

<script lang="ts" setup>

const props = withDefaults(
  defineProps<{
    label?: string | undefined,
    name?: string | undefined,
    size: string,
    type?: string | undefined,
  }>(),
  {
    label: undefined,
    name: undefined,
    type: undefined,
    size: 'md',
  }
)

const formModel = defineModel<string>({ required: true })
</script>

<style>

</style>