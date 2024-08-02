import { promises as fs } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const dataPath = join(process.cwd(), 'data', 'data.json');

  try {
    const rawData = await fs.readFile(dataPath, 'utf8')
    const data = JSON.parse(rawData)

    if (data.password === body.password && data.loginId === body.loginId) {
      return { status: 200, message: 'Login successfully' };
    } else {
      return { status: 400, message: 'Login Id or password is not correct'}
    }
  } catch (error) {
    return { status: 500, message: 'Failed to save data', error };
  }
})
