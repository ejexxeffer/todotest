interface TodoObj {
  id: number
  title: string | undefined
  completed: boolean
  deadline: Date | null
  priority: 'hight' | 'medium' | 'low' | null
}
