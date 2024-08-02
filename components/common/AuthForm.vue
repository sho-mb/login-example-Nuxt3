<template>
 <UForm :schema="schema" :state="state" class="space-y-8" @submit="onSubmit">
  <slot />
 </UForm>
</template>

<script lang="ts" setup>
import {  ZodSchema } from 'zod';

const props = defineProps<{
  schema: ZodSchema;
  state: Record<string, any>;
  errors: Record<string, any> | undefined;
}>();

const emits = defineEmits(['submit']);
const errors = ref(props.errors)

const onSubmit = () => {
  const result = props.schema.safeParse(props.state)

  if (!result.success) {
    errors.value = result.error.format()
    emits('submit', errors.value)
  }

  emits('submit', result.data)
};
</script>
