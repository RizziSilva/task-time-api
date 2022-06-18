import { useState, useEffect } from 'react'
import Image from 'next/image'
import { STOP_ICON, PLAY_ICON } from 'app-statics'
import { calculateTimeFromSeconds } from '../../utils'
import { PLACEHOLDER_TIME } from '../../constants'
import style from './style.module.scss'

export function Timer({ setCurrentTask, currentTask, onStop, triggerReplay }) {
  const [isPlaying, setIsPlay] = useState(false)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let count

    if (isPlaying) {
      count = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    } else if (!isPlaying) {
      setTimer(0)
      clearInterval(count)
    }

    return () => {
      clearInterval(count)
    }
  }, [isPlaying])

  useEffect(() => {
    if (triggerReplay) setIsPlay(true)
  }, [triggerReplay])

  function handlePlayStopClick() {
    if (!isPlaying) {
      const initiatedAt = new Date()
      initiatedAt.setHours(initiatedAt.getHours() - 3)

      setCurrentTask({ ...currentTask, initiatedAt })
    } else {
      onStop()
    }

    setIsPlay(!isPlaying)
  }

  function getPlayStopImage() {
    return isPlaying ? STOP_ICON : PLAY_ICON
  }

  function getTimeToShow() {
    const hasTime = timer != 0
    return hasTime
      ? calculateTimeFromSeconds(timer)
      : getTimeValues(PLACEHOLDER_TIME)
  }

  function getTimeValues({ minutes, hours, seconds }) {
    const formattedSeconds = seconds === 0 ? '00' : seconds
    const formattedMinutes = minutes === 0 ? '00' : minutes
    const formattedHours = hours === 0 ? '00' : hours

    return {
      minutes: formattedMinutes,
      seconds: formattedSeconds,
      hours: formattedHours
    }
  }

  function renderTime() {
    const { seconds, minutes, hours } = getTimeToShow()

    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className={style['container-time']}>
      <button onClick={handlePlayStopClick} className={style['button-time']}>
        <Image width={50} height={50} src={getPlayStopImage()} />
      </button>
      <div className='time'>
        <span>{renderTime()}</span>
      </div>
    </div>
  )
}
