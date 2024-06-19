export const deadlineCount = (date: Date): number => {
  const targetDate = new Date(date)
  const currentDate = new Date()

  if (targetDate <= currentDate) {
    return -1
  }
  const totalMilliseconds = targetDate.getTime() - currentDate.getTime()
  const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24))
  return days >= 0 ? days : -1
}
