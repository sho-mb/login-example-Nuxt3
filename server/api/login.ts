import { promises as fs } from 'fs';
import { join } from 'path';
import { checkPassword } from '~/utils/bcryptUtil';

export default defineEventHandler(async (event) => {
  const { password :inputPassword, loginId: inputLoginId} = await readBody(event)
  const dataPath = join(process.cwd(), 'data', 'data.json');

  try {
    const rawData = await fs.readFile(dataPath, 'utf8')
    const { password: hash, loginId } = JSON.parse(rawData)

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
