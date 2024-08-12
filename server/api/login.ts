import { userApi } from '~/types/api';
import { Login } from '~/types/login';
import { checkPassword } from '~/utils/bcryptUtil';

export default defineEventHandler(async (event) => {
  const { password :inputPassword, loginId: inputLoginId} = await readBody(event)

  try {
    const { password: hash, loginId } = await $fetch<Login>(`${userApi}/find?loginId=${inputLoginId}`)

    if (await checkPassword(inputPassword, hash) && loginId === inputLoginId) {
      await setUserSession(event, {
        user: loginId
      })
      return { status: 200, message: 'Login successfully' };
    } else {
      return { status: 400, message: 'Login Id or password is not correct'}
    }
  } catch (error) {
    return { status: 500, message: 'Failed to save data', error };
  }
})
