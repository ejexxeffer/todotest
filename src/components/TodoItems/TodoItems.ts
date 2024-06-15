interface TodoObj {
    id: number;
    title: string,
    completed: boolean,
    deadline: Date | null,
    priority: 'hight' | 'medium' | 'low' | null
}