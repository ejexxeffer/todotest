export type PriorityT = 'none' | 'high' | 'medium' | 'low'
export type PriorityClassT =
  | 'priority_none'
  | 'priority_high'
  | 'priority_medium'
  | 'priority_low'
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
