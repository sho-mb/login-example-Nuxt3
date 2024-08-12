import { userApi, userData } from '~/types/api';
import { encryptPassword } from '~/utils/bcryptUtil';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { password: newPassword } = await readBody(event);

  try {
    const user = await $fetch<userData>(`${userApi}/find?password=${query.hash}`);
    if (user) {
      const encryptedPassword = await encryptPassword(newPassword);
      try {
        $fetch<userData>(`${userApi}/reset/${user.id}`, {
          method: "PATCH",
          body: encryptedPassword
        });
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
