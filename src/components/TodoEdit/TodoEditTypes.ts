interface TodoObj {
    id: number;
    title: string | undefined,
    description: string,
    completed: boolean,
    deadline: Date | null,
    priority: 'hight' | 'medium' | 'low' | null
}