import { useState } from 'react'
import { toast } from 'react-toastify'
import { storageUtil } from 'app-utils'
import { TaskService } from 'app-services'
import {
  CREATE_TASK_INPUTS,
  INITIAL_TASK_STATE,
  CREATE_TASK_DEFAULT_ERROR
} from './constants'
import { Timer } from './components'
import style from './style.module.scss'

export function Home() {
  const [currentTask, setCurrentTask] = useState(INITIAL_TASK_STATE)
  const taskService = TaskService()
  const { getUserInformation } = storageUtil()

  function handleTaskInputChange({ target }) {
    const { value, name } = target

    setCurrentTask({ ...currentTask, [name]: value })
  }

  async function createTask() {
    try {
      const endedAt = new Date()
      const { idUser } = getUserInformation()
      const body = { ...currentTask, idUser, endedAt }
      await taskService.createTask(body)
      setCurrentTask(INITIAL_TASK_STATE)
    } catch (error) {
      console.error(error)
      const errorMessage =
        error.response?.data?.message || CREATE_TASK_DEFAULT_ERROR
      toast(errorMessage)
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
          onStop={createTask}
        />
      </div>
    </div>
  )
}
