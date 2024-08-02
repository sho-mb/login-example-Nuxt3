import { promises as fs } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const dataPath = join(process.cwd(), 'data', 'data.json');

  try {
    await fs.mkdir(join(process.cwd(), 'data'), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(body, null, 2), 'utf8');
    return { status: 200, message: 'Data saved successfully' };
  } catch (error) {
    return { status: 500, message: 'Failed to save data', error };
  }
})
