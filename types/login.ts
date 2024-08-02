import { z } from 'zod'

export const loginSchema = z.object({
  loginId: z.string({
    required_error: "Login ID is required"
  }).min(8, 'Must be at least 8 characters'),
  password: z.string({
    required_error: "Password is required",
  })
})

export type Login = z.infer<typeof loginSchema>
export type LoginErrors = z.inferFormattedError<typeof loginSchema>