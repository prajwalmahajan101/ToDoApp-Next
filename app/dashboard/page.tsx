'use client'
import { FC, useEffect, useState } from 'react'
import { getAllTodos, getTodoById } from '@/utils'
import TodoList from '@/components/TodoList'
import { ITodo } from '@/types'
import { RecoilRoot } from 'recoil'

const Todos: FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
    useEffect(() => {
        getAllTodos().then(({ data }) => setTodos(data))
    }, [])
    return (
        <RecoilRoot>
            <TodoList />
        </RecoilRoot>
    )
}
export default Todos
