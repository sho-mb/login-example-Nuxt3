import { promises as fs } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const { email: inputEmail } = await readBody(event)
  const dataPath = join(process.cwd(), 'data', 'data.json');
  const { sendMail } = useNodeMailer()

  try {
    const rawData = await fs.readFile(dataPath, 'utf8')
    const { email, password: hash } = JSON.parse(rawData)
    const magicLink = `${process.env.BASE_URL}/reset?password=${hash}`
    const text = `Please reset your password via access to this link ${magicLink}`

    if (inputEmail === email) {
      sendMail({ subject: 'This is your magic link for reset your password', text: text, to: email })
      return { status: 200, message: 'We accepted your request \n If not get any email please kindly contact to owner' };
    } else {
      return { status: 400, message: 'This email is not registed' };
    }
  } catch (error) {
    return { status: 500, message: 'Server error please try again later', error };
  }
})
