export function isSameDay(dateOne, dateTwo) {
  const newDateOne = new Date(dateOne)
  const newDateTwo = new Date(dateTwo)
  const isSameDay = newDateOne.getDate() === newDateTwo.getDate()
  const isSameMonth = newDateOne.getDate() === newDateTwo.getDate()
  const isSameYear = newDateOne.getDate() === newDateTwo.getDate()

  return isSameDay && isSameMonth && isSameYear
}
