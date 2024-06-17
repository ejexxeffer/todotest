export type PriorityT = 'none' | 'hight' | 'medium' | 'low'
export interface TodoObj {
  id: number
  title: string | undefined
  description: string | undefined
  completed: boolean
  deadline: Date | null
  priority: PriorityT
}

export interface Priority {
  id: number
  value: PriorityT
}
