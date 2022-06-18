import { useState } from 'react'
import { toast } from 'react-toastify'
import { storageUtil } from 'app-utils'
import { TaskService, TaskTimeService } from 'app-services'
import {
  CREATE_TASK_INPUTS,
  INITIAL_TASK_STATE,
  CREATE_TASK_DEFAULT_ERROR
} from './constants'
import { Timer, TaskList } from './components'
import style from './style.module.scss'

export function Home() {
  const [currentTask, setCurrentTask] = useState(INITIAL_TASK_STATE)
  const [newTask, setNewTask] = useState(undefined)
  const [newTaskTime, setNewTaskTime] = useState(undefined)
  const [triggerReplay, setTriggerReplay] = useState(false)
  const taskService = TaskService()
  const taskTimeService = TaskTimeService()
  const { getUserInformation } = storageUtil()

  function handleTaskInputChange({ target }) {
    const { value, name } = target

    setCurrentTask({ ...currentTask, [name]: value })
  }

  function handleReplayTask(task) {
    const { taskId, title, link, description } = task
    const initiatedAt = new Date()
    initiatedAt.setHours(initiatedAt.getHours() - 3)

    setCurrentTask({ title, description, link, initiatedAt, taskId })
    setTriggerReplay(true)
  }

  async function createTask() {
    try {
      const endedAt = new Date()
      endedAt.setHours(endedAt.getHours() - 3)

      const { idUser } = getUserInformation()
      const body = { ...currentTask, idUser, endedAt }
      const { data } = await taskService.createTask(body)
      setNewTask(data)
      setCurrentTask(INITIAL_TASK_STATE)
    } catch (error) {
      console.error(error)
      const errorMessage =
        error.response?.data?.message || CREATE_TASK_DEFAULT_ERROR
      toast(errorMessage)
    }
  }

  function createTaskOrTaskTime() {
    if (currentTask.taskId) createTaskTime()
    else createTask()
  }

  async function createTaskTime() {
    try {
      const endedAt = new Date()
      endedAt.setHours(endedAt.getHours() - 3)

      const { initiatedAt, taskId } = currentTask
      const body = { endedAt, initiatedAt, idTask: taskId }
      const { data } = await taskTimeService.createTaskTime(body)
      setTriggerReplay(false)
      setCurrentTask(INITIAL_TASK_STATE)
      setNewTaskTime(data[0])
    } catch (error) {
      console.error(error)
    }
  }

  function renderCreateTaskInputs() {
    return CREATE_TASK_INPUTS.map(({ name, placeholder, className }, index) => (
      <input
        key={index}
        className={`${style['input']} ${className ? style[className] : ``}`}
        name={name}
        placeholder={placeholder}
        onChange={handleTaskInputChange}
        value={currentTask[name]}
      />
    ))
  }

  return (
    <div className={style['container-home']}>
      <div className={style['container-header']}>
        <div className={style['container-input']}>
          {renderCreateTaskInputs()}
        </div>
        <Timer
          setCurrentTask={setCurrentTask}
          currentTask={currentTask}
          onStop={createTaskOrTaskTime}
          triggerReplay={triggerReplay}
        />
      </div>
      <TaskList
        handleReplayTask={handleReplayTask}
        newTaskTime={newTaskTime}
        newTask={newTask}
      />
    </div>
  )
}
