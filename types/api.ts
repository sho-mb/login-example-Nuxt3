export const userApi = `${process.env.BACKEND_API}/user`

export type userData = {
  id?: number,
  loginId?: string,
  password?: string,
  email?: string,
}