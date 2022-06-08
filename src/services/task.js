import { useRequest } from 'app-hooks'

export function TaskService() {
  const { post } = useRequest()

  async function createTask(body) {
    return await post('/task/create', body)
  }

  return {
    createTask
  }
}
