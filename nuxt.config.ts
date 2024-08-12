// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "nuxt-auth-utils", 'nuxt-nodemailer'],
  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24
    }
  },
  nodemailer: {
    from: `Mango-byte example <${process.env.MAIL_ACCOUNT}>`,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASS,
    }
  }
})