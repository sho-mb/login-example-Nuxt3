<template>
  <div class="w-1/2 m-auto mt-20">
    <div class="text-green-500 text-center text-3xl mb-20">
      Reset password
    </div>
    
    <CommonAuthForm
      :schema="resetSchema"
      :state="form"
      :errors="errors"
      @submit="resetPassword"
    >
      <CommonInputText
        label="Password"
        name="password"
        size="xl"
        v-model="form.password"
      />

      <CommonInputText
        label="Confirmation password"
        name="cPassword"
        size="xl"
        v-model="form.cPassword"
      />
      <div v-if="message" :class="{ 'text-green-500': !isError, 'text-red-500': isError }">
          {{ message }}
        </div>

      <CommonSubmitBtn
        title="Reset Password"
        type="submit"
        :block="true"
      />
    </CommonAuthForm>
  </div>
</template>

<script lang="ts" setup>
import { resetSchema, type Reset, type ResetErrors } from '~/types/reset';

const message = ref<string>('')
const isError = ref(false)
const hash = useRoute().query.password as string
const errors = ref<ResetErrors>()
const getInitialData = () => ({
  password: '',
  cPassword: '',
})

const form = ref<Reset>(getInitialData())

const resetPassword = async (data: Reset | ResetErrors) => {
  if ('password' in data) {
    type requestDataType = Omit<Reset, "cPassword">
    try {
      const requestData: requestDataType = {
        password: data.password as string
      }
      
      const response = await $fetch(`/api/resetPassword?hash=${hash}`, {
        method: 'POST',
        body: requestData,
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