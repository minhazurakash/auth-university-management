import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_secret_expire: process.env.JWT_SECRET_EXPIRES,
    jwt_secret_refresh: process.env.JWT_SECRET_REFRESH,
    jwt_secret_refresh_expire: process.env.JWT_SECRET_REFRESH_EXPIRES,
  },
}
