import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string({
    required_error: "E-mail is required",
  })
    .email('Invalid e-mail address'),
})

export type Email = z.infer<typeof emailSchema>
export type EmailErrors = z.inferFormattedError<typeof emailSchema>