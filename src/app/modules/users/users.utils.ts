import { User } from './users.model'

export const getLastUserId = async () => {
  const lastId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAT: -1,
    })
    .lean()
  return lastId
}
export const generatedUserId = async () => {
  const currentId = (await getLastUserId()) || (0).toString().padStart(5, '0')
  return currentId
}
