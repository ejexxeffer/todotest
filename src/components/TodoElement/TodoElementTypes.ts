export type PriorityT = 'none' | 'high' | 'medium' | 'low'
export type PriorityClassT =
  | 'no-priority'
  | 'high-priority'
  | 'medium-priority'
  | 'low-priority'
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
