export type PriorityT = 'none' | 'high' | 'medium' | 'low'
export interface TodoObj {
  id: number
  title: string | undefined
  description: string | undefined
  completed: boolean
  deadline: Date | null
  priority: Priority
}

export interface Priority {
  id: number
  value: PriorityT
}
