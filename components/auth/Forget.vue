<template>
  <div class="w-1/2 m-auto mt-20">
    <div class="text-green-500 text-center text-3xl mb-20">
      Do you forget a password?
    </div>
    <p class=" text-center">
      Please enter your email address which is registered
    </p>
    <p class=" text-center mb-20">
      We will send you magic link for reseting password by sendding an email
    </p>

    <CommonAuthForm
      :schema="emailSchema"
      :state="form"
      :errors="errors"
      @submit="requestMagicLink"
    >
      <CommonInputText
        label="E-mail address"
        name="email"
        size="xl"
        v-model="form.email"
      />
        <div v-if="message" :class="{ 'text-green-500': !isError, 'text-red-500': isError }">
          {{ message }}
        </div>

      <CommonSubmitBtn
        title="Send reset email"
        type="submit"
        :block="true"
      />
    </CommonAuthForm>
  </div>
</template>

<script lang="ts" setup>
import { emailSchema, type Email, type EmailErrors } from '~/types/forget';

const message = ref<string>('')
const isError = ref(false)
const errors = ref<EmailErrors>()
const getInitialData = () => ({
  email: ''
})

const form = ref<Email>(getInitialData())

const requestMagicLink = async (data: Email | EmailErrors) => {
  if ('email' in data) {
    try {
      const response = await $fetch('/api/resetEmail', {
        method: 'POST',
        body: data,
      })
      message.value = response.message 
      form.value = getInitialData()
      if (response.status !== 200) {
        isError.value = true
      } 
    } catch (e) {
      console.log(e)      
    }
  } else {
    errors.value = data
  }
}

</script>

<style>

</style>