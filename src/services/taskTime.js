import { useRequest } from 'app-hooks'

export function TaskTimeService() {
  const { post } = useRequest()

  async function createTaskTime(body) {
    return await post('/task-time/create', body)
  }

  return {
    createTaskTime
  }
}
