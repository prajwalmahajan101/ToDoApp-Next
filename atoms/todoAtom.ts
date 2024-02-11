import { atom } from 'recoil'
import { ITodo } from '@/types'

export interface ITodoState {
    todos: ITodo[]
}

const initialState = {
    todos: [],
}

export const todosState = atom<ITodoState>({
    key: 'todoState',
    default: initialState,
})
