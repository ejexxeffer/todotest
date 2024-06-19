export const deadlineMatch = (deadline: number): string => {
  return deadline >= 0 ? deadline.toString() : 'times up'
}
