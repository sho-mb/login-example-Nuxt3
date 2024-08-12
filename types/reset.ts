import { z } from 'zod'

export const resetSchema = z.object({
  password: z.string({
    required_error: "Password is required",
  })
    .min(8, 'Must be at least 8 characters')
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, 'Password should be inclued character and numbers'),
  cPassword: z.string({
    required_error: "Confirmation password is required",
  })
    .min(1, 'Please enter confirmation password')
})
  .superRefine(({ password, cPassword }, ctx) => {
    if (password !== cPassword) {
      ctx.addIssue({
        path: ['cPassword'],
        code: 'custom',
        message: 'This password is not same password you entered',
      });
  }
})

export type Reset = z.infer<typeof resetSchema>
export type ResetErrors = z.inferFormattedError<typeof resetSchema>