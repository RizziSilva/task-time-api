const ONE_HOUR_IN_SECONDS = 3600
const ONE_MINUTE_IN_SECONDS = 60

export function calculateTimeFromSeconds(time) {
  let hours = Math.floor(time / ONE_HOUR_IN_SECONDS)
  const removeHoursFromMinutes = time - hours * ONE_HOUR_IN_SECONDS
  let minutes = Math.floor(removeHoursFromMinutes / ONE_MINUTE_IN_SECONDS)
  let seconds = removeHoursFromMinutes - minutes * ONE_MINUTE_IN_SECONDS
  const shouldHaveZeroInHours = hours < 10
  const shouldHaveZeroInMinutes = minutes < 10
  const shouldHaveZeroInSeconds = seconds < 10

  if (shouldHaveZeroInHours) hours = `0${hours}`
  if (shouldHaveZeroInMinutes) minutes = `0${minutes}`
  if (shouldHaveZeroInSeconds) seconds = `0${seconds}`

  return { seconds, minutes, hours }
}
