import type { TodoObj } from './UtilTypes'

export const editInArr = (value: TodoObj, values: TodoObj[]) => {
  values[values.findIndex((v) => v.id === value.id)] = { ...value }
  return [...values]
}
