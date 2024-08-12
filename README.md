# login-example-Nuxt3

**Login simple exampl** register/login/reset pw

## Feature
1. Register/Login/Password reset
2. Reset password via magic link send to email by node mailer

## Structure
- **Frontend/UI**
  - **framework** : Nuxt3 + Nuxt UI + Nitro with TypeScript
  - **feature**:
    - register
    - login
    - reset password
    - send magicLink by Node mailer
    - save login user in session with login ID via using Nuxt-Auth-Module
    
- **api/backend**
  - **user-service**
    - **framework**: spring-boot 3.3.2 - jave19 SDK
    - **database**: MySql 5.7
    - user data will store in MySql 5.7 (database = default : accounts)
    
### Running development environment
- development `yarn run dev / npm run dev`
- set environment file `.env` by following `.env.example`
- Nodemailer needs user's google app password (less secure) follow by below link
  - https://support.google.com/accounts/answer/185833?hl=en
- For Nuxt-Auth-Module's password will provide automaticaly when you run at first time in `.env` file

- localhost:3000 for ui
- localhost:8080 for backend

## Backend reference 
- https://github.com/sho-mb/java-backend-Nuxt3-login-example
