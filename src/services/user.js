import { useRequest } from 'app-hooks'

export function UserService() {
  const { post } = useRequest()

  async function login(body) {
    return await post('/user/login', body)
  }

  return {
    login
  }
}
