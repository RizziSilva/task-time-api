import { useRequest } from 'app-hooks'

export function userService() {
  const { post } = useRequest()

  async function login(body) {
    return await post('/user/login', body)
  }

  return {
    login
  }
}
