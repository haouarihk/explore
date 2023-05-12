import { z } from "zod"

export const nameSchema = z.string().min(3).max(5)
export const emailSchema = z.string().email()
export const passwordSchema = z.string().min(4).max(24)