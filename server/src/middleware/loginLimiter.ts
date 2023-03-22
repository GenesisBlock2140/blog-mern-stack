import { rateLimit } from "express-rate-limit"

export const loginLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 min
	max: 5,
  message: "Trop de connexion tenté pour cette IP, patientez avant de recommencer.", // Limit each IP to 5 requests
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})