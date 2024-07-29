import * as z from "zod"

const SignUpSchema = z.object({
  fullName: z.string().min(5).max(150),
  email: z.string().email(),
  password: z.string().min(8),
})

export { SignUpSchema }
