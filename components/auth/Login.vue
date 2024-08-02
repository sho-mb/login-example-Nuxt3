<template>
  <div class="w-1/3 m-auto mt-20">
    <div class="text-green-500 text-center text-3xl mb-20">
      Login
    </div>
    <CommonAuthForm
      :schema="loginSchema"
      :state="form"
      :errors="errors"
      @submit="login"
      class="space-y-8"
    >
      <CommonInputText 
        label="Login ID"
        name="loginId"
        size="xl"
        v-model="form.loginId"
      />

      <CommonInputText 
        label="Password"
        name="password"
        size="xl"
        v-model="form.password"
        type="password"
      />

    <CommonSubmitBtn
        title="Login"
        type="submit"
        :block="true"
      />
    </CommonAuthForm>

    <CommonAlertResponse 
      :message="message"
      :color="color"
    />

    <div class="mt-4">
      <NuxtLink to="/forget" class="text-blue-400">
        Forget password?
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loginSchema, type Login, type LoginErrors } from '~/types/login';

const message = ref<string>('')
const router = useRouter()
const color = ref<string>('')
const errors = ref<LoginErrors>()
const getInitialData = () => ({
  loginId: '',
  password: '',
})

const form = ref<Login>(getInitialData())

const login = async (data : Login | LoginErrors) => {
  if ('loginId' in data) {
    try {
      const response = await $fetch('/api/login', {
        method: 'POST',
        body: data,
      })
      message.value = response.message 
      if (response.status === 200) {
        color.value = 'primary'
        router.push({path: '/'})
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