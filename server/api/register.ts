import { promises as fs } from 'fs';
import { join } from 'path';
import { encryptPassword } from '~/utils/bcryptUtil';


export default defineEventHandler(async (event) => {
  const { loginId, password, email } = await readBody(event)
  const dataPath = join(process.cwd(), 'data', 'data.json');
  const hash = await encryptPassword(password);
  
  const loginData = {
    loginId: loginId,
    password: hash,
    email: email,
  }

  try {
    await fs.mkdir(join(process.cwd(), 'data'), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(loginData, null, 2), 'utf8');
    return { status: 200, message: 'Data saved successfully' };
  } catch (error) {
    return { status: 500, message: 'Failed to save data', error };
  }
})

