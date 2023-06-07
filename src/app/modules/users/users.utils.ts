import { User } from './users.model'

export const getLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}
export const generatedUserId = async () => {
  const currentId = (await getLastUserId()) || (0).toString().padStart(5, '0')
  const incrementId = parseInt(currentId) + 1
  return incrementId.toString().padStart(5, '0')
}
