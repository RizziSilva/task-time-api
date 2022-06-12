import { DAYS_TEXT, MONTHS_TEXT } from '../constants'

export function groupTasks(tasks) {
  const grouped = {}
  tasks.forEach(task => {
    const { createdAt } = task

    if (!grouped[createdAt]) grouped[createdAt] = []

    grouped[createdAt].push(task)
  })

  return grouped
}

export function getDayOfWeek(date) {
  const todayDay = new Date().toDateString()
  const passedDateAsDate = new Date(date)
  const passedDateDay = passedDateAsDate.toDateString()

  if (todayDay === passedDateDay) return 'Hoje'
  const dayOfWeek = DAYS_TEXT[passedDateAsDate.getDay()]
  const monthOfYear = MONTHS_TEXT[passedDateAsDate.getMonth()]
  const dateText = `${dayOfWeek}, ${passedDateAsDate.getDate()} ${monthOfYear}`

  return dateText
}
