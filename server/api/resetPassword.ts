import { promises as fs } from 'fs';
import { join } from 'path';
import { encryptPassword } from '~/utils/bcryptUtil';

export default defineEventHandler(async (event) => {
  const reset =  getQuery(event)
  const { password: newPassword } = await readBody(event)
  const dataPath = join(process.cwd(), 'data', 'data.json');

  try {
    const rawData = await fs.readFile(dataPath, 'utf8')
    const { loginId, password, email } = JSON.parse(rawData) //Actually if you have backend search by password
    if (password === reset.hash) {

      const encryptedPassword = await encryptPassword(newPassword);
      const newData = {
        loginId: loginId,
        password: encryptedPassword,
        email: email,
      }

      try {
        await fs.writeFile(dataPath, JSON.stringify(newData, null, 2), 'utf8');
        return { status: 200, message: 'New password saved successfully' };
      } catch (error) {
        return { status: 500, message: 'Failed to save data', error };
      }
    } else {
      return { status: 400, message: 'Invalid magic link' };
    }
  } catch (error) {
    return { status: 500, message: 'Server error please try again later', error };
  }
})
