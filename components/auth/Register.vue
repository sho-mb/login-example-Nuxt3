<template>
  <div class="w-1/3 m-auto mt-20">
    <div class="text-green-500 text-center text-3xl m-20">
      Register your account
    </div>
    <CommonAuthForm
      :schema="registerSchema"
      :state="form"
      :errors="errors"
      @submit="register"
      class="space-y-8"
    >
      <CommonInputText
        label="Login ID"
        name="loginId"
        size="xl"
        v-model="form.loginId"
      />

      <CommonInputText
        label="E-mail"
        name="email"
        size="xl"
        v-model="form.email"
      />    

      <CommonInputText
        label="Password"
        name="password"
        size="xl"
        v-model="form.password"
        type="password"
      />

      <CommonInputText
        label="Confirm Password"
        name="cPassword"
        size="xl"
        v-model="form.cPassword"
      />

      <CommonSubmitBtn
        title="Register"
        type="submit"
        :block="true"
      />
    </CommonAuthForm>

    <CommonAlertResponse 
      :message="message"
      :color="color"
    />
    
    <div class="mt-4 text-blue-300">
      <NuxtLink to="/login">
        Back to Login
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { registerSchema, type Register, type RegisterErrors } from '~/types/register';

const errors = ref<RegisterErrors>()
const message = ref<string>('')
const color = ref<string>('')

const getInitialData = () => ({
  loginId: '',
  password: '',
  email: '',
  cPassword:'',
})

const form = ref<Register>(getInitialData())

const register = async (data : Register | RegisterErrors) => {
  if ('loginId' in data) {
    try {
      const response = await $fetch('/api/register', {
        method: 'POST',
        body: data,
      })
      message.value = response.message 
      if (response.status === 200) {
        color.value = 'primary'
      } else {
        color.value = 'red'
      }
      form.value = getInitialData()
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