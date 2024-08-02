import { z } from 'zod'

export const registerSchema = z.object({
  loginId: z.string({
    required_error: "Login ID is required"
  }).min(8, 'Must be at least 8 characters'),
  password: z.string({
    required_error: "Password is required",
  })
    .min(8, 'Must be at least 8 characters')
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, 'Password should be inclued character and numbers'),
  email: z.string({
    required_error: "E-mail is required",
  })
    .email('Invalid e-mail address'),
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

export type Register = z.infer<typeof registerSchema>
export type RegisterErrors = z.inferFormattedError<typeof registerSchema>