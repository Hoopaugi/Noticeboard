import userServices from '../api/user/user.services'
import { AppError } from '../errors'
import { passwordCorrect, signUserToken } from './auth.helpers'

const login = async (username: string, password: string) => {
  const user = await userServices.findByUsername(username)

  if (!user) {
    throw new AppError('no user found', 404)
  }

  const correct = await passwordCorrect(password, user.passwordHash)

  if(!correct) {
    throw new AppError('invalid username or password', 400)
  }

  const token = await signUserToken({ username, id: user._id.toString() })

  return token
}

export default { login }
