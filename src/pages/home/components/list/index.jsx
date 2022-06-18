import { useEffect, useState } from 'react'
import { TaskService } from 'app-services'
import { PLAY_ICON } from 'app-statics'
import { isSameDay } from 'app-utils'
import {
  groupTasks,
  getDayOfWeek,
  calculateTimeFromSeconds,
  findTaskById
} from '../../utils'
import style from './style.module.scss'
import Image from 'next/image'

export function TaskList({ newTask, handleReplayTask, newTaskTime }) {
  const [tasks, setTasks] = useState([])
  const [currentDate, setCurrentDate] = useState(null)
  const [newestDate, setNewestDate] = useState(null)
  const [hasMoreTasks, setHasMoreTasks] = useState(true)
  const [triggerRequest, setTriggerequest] = useState({})
  const [openedInfo, setOpenedInfo] = useState([])
  const { getTasksByDay } = TaskService()

  useEffect(() => {
    if (newTask) {
      const newTasks = tasks.slice()
      const hasTaskFromSameDay = isSameDay(newestDate, newTask.createdAt)
      if (hasTaskFromSameDay) newTasks[0].unshift(newTask)
      else newTasks.unshift([newTask])

      setTasks(newTasks)
    }
  }, [newTask])

  useEffect(() => {
    if (newTaskTime) {
      const { idTask } = newTaskTime
      const newTasks = tasks.slice()
      const foundedTask = findTaskById(newTasks, idTask)
      if (foundedTask) {
        foundedTask.times.push(newTaskTime)
        foundedTask.totalTime = foundedTask.totalTime + newTaskTime.difference
      }

      setTasks(newTasks)
    }
  }, [newTaskTime])

  useEffect(() => {
    async function getTasks() {
      try {
        const { data } = await getTasksByDay(currentDate)
        if (data.length) {
          const grouped = groupTasks(data)
          const newTasks = Object.values(grouped)
          const oldTasks = tasks.slice()
          oldTasks.push(newTasks[0])
          setTasks(oldTasks)
          handleDate(data)
        } else setHasMoreTasks(false)
      } catch (error) {
        console.error(error)
      }
    }

    getTasks()
  }, [triggerRequest])

  function handleDate(tasks) {
    const newDate = tasks[0].createdAt
    setCurrentDate(newDate)
    if (!newestDate) setNewestDate(newDate)
  }

  function handleClickLoadMore() {
    setTriggerequest({})
  }

  function handleClickOpenInfo(taskId) {
    const copyOpenedInfo = openedInfo.slice()
    const taskIndex = copyOpenedInfo.findIndex(id => id === taskId)

    if (taskIndex >= 0) {
      const newOpenedItems = copyOpenedInfo.filter(id => id !== taskId)
      setOpenedInfo(newOpenedItems)
    } else {
      copyOpenedInfo.push(taskId)
      setOpenedInfo(copyOpenedInfo)
    }
  }

  function getIsOpen(taskId) {
    return openedInfo.includes(taskId)
  }

  function renderTaskInfo(task) {
    const { description, link, taskId } = task
    const isOpen = getIsOpen(taskId)
    const hasLink = !!link

    return (
      <div
        className={`${style['container-info']} ${isOpen ? style['open'] : ''}`}
      >
        <div
          className={`${style['info']} ${style['description']} ${
            hasLink ? '' : style['no-link']
          }`}
        >
          <span className={style['prefix']}>Descrição:</span>
          {description}
        </div>
        {hasLink && (
          <div className={`${style['info']} ${style['link']}`}>
            <a className={style['text']} href={link} target='blank'>
              <span className={style['prefix']}>Link: </span> {link}
            </a>
          </div>
        )}
      </div>
    )
  }

  function renderTaskByDay(tasks) {
    return tasks.map((task, index) => {
      const { title, description, link, totalTime, taskId } = task
      const titleToUse = title ? title : 'Sem Titulo'
      const { seconds, minutes, hours } = calculateTimeFromSeconds(totalTime)
      const hasExtraInfo = description || link
      const isOpen = getIsOpen(taskId)

      return (
        <>
          <div className={style['container-tasks']}>
            {hasExtraInfo && (
              <button
                className={`${style['open-button']} ${
                  isOpen ? style['opened'] : ''
                }`}
                onClick={() => handleClickOpenInfo(taskId)}
              />
            )}
            <div className={style['task-info']}>
              <span className={style['task-title']}>{titleToUse}</span>
              <span className={style['total-time']}>
                {hours}:{minutes}:{seconds}
              </span>
            </div>
            <button
              onClick={() => handleReplayTask(task)}
              className={style['play-button']}
            >
              <Image src={PLAY_ICON} width={30} height={30} />
            </button>
          </div>
          {hasExtraInfo && renderTaskInfo(task)}
        </>
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

  function renderTasks() {
    return (
      <>
        {renderTasksByDay()}
        {renderLoadMoreButton()}
      </>
    )
  }

  function renderNoTasksWarning() {
    return (
      <div className={style['container-warning-message']}>
        <span className={style['warning-message']}>
          Não há registro de tarefas.
        </span>
      </div>
    )
  }

  return (
    <div className={style['container-task-list']}>
      {tasks.length ? renderTasks() : renderNoTasksWarning()}
    </div>
  )
}
