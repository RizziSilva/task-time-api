import { useEffect, useState } from 'react'
import { TaskService } from 'app-services'
import { groupTasks, getDayOfWeek, calculateTimeFromSeconds } from '../../utils'
import style from './style.module.scss'

export function TaskList() {
  const [tasks, setTasks] = useState([])
  const [currentDate, setCurrentDate] = useState(null)
  const [hasMoreTasks, setHasMoreTasks] = useState(true)
  const [triggerRequest, setTriggerequest] = useState({})
  const { getTasksByDay } = TaskService()

  useEffect(() => {
    async function getTasks() {
      try {
        const { data } = await getTasksByDay(currentDate)
        const grouped = groupTasks(data)
        const newTasks = Object.values(grouped)
        const oldTasks = tasks.slice()
        oldTasks.push(newTasks[0])
        setTasks(oldTasks)
        handleDate(data)
      } catch (error) {
        console.error(error)
      }
    }

    getTasks()
  }, [triggerRequest])

  function handleDate(tasks) {
    if (!tasks.length) setHasMoreTasks(false)
    else setCurrentDate(tasks[0].createdAt)
  }

  function handleClickLoadMore() {
    setTriggerequest({})
  }

  function renderTaskByDay(tasks) {
    return tasks.map((task, index) => {
      const { title, totalTime } = task
      const titleToUse = title ? title : 'Sem Titulo'
      const { seconds, minutes, hours } = calculateTimeFromSeconds(totalTime)
      return (
        <div className={style['container-taks']}>
          <span className={style['task-title']}>{titleToUse}</span>
          <span className={style['total-time']}>
            {hours}:{minutes}:{seconds}
          </span>
        </div>
      )
    })
  }

  function renderTasksByDay() {
    return tasks.map((allTasks, index) => {
      const { createdAt } = allTasks[0]
      const dayText = getDayOfWeek(createdAt)
      return (
        <div className={style['container-day']}>
          <span className={style['day-text']}>{dayText}</span>
          {renderTaskByDay(allTasks)}
        </div>
      )
    })
  }

  function renderLoadMoreButton() {
    return (
      <div className={style['container-button']}>
        <button
          disabled={!hasMoreTasks}
          className={style['button']}
          onClick={handleClickLoadMore}
        >
          Carregar Mais
        </button>
      </div>
    )
  }

  return (
    <div className={style['container-task-list']}>
      {renderTasksByDay()}
      {renderLoadMoreButton()}
    </div>
  )
}
