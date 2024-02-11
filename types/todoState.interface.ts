import { ITodo } from '@/types'

export interface ITodoState {
    todos: ITodo[]
    setTodos: (todos: ITodo[]) => void
}
