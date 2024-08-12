import { userApi } from '~/types/api';
import { encryptPassword } from '~/utils/bcryptUtil';


export default defineEventHandler(async (event) => {
  const { loginId, password, email } = await readBody(event)
  const hash = await encryptPassword(password);
  
  const loginData = {
    loginId: loginId,
    password: hash,
    email: email,
  }

  try {
    await $fetch(`${userApi}/register`, {
      method: 'POST',
      body: loginData
    })
    return { status: 200, message: 'Data saved successfully' };
  } catch (error) {
    return { status: 500, message: 'Failed to save data', error };
  }
})

