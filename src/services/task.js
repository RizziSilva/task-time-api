import { useRequest } from 'app-hooks'
import { storageUtil } from 'app-utils'

export function TaskService() {
  const { post, get } = useRequest()
  const { getUserInformation } = storageUtil()

  async function createTask(body) {
    return await post('/task/create', body)
  }

  async function getTasksByDay(day) {
    const params = { day }
    const { idUser } = getUserInformation()

    return await get(`/task/day/${idUser}`, { params })
  }

  return {
    createTask,
    getTasksByDay
  }
}
