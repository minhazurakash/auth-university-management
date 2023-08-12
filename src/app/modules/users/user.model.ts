import { model, Schema } from 'mongoose'
import { IUser, IUserMethods, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.isUserExists = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1, role: 1 }
  )
  return user
}

userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(givenPassword, savePassword)
  return result
}

userSchema.pre('save', async function (next) {
  // hash password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  )
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
