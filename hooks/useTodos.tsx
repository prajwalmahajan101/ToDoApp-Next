import { useRecoilValue, useSetRecoilState } from 'recoil'
import { todosState } from '@/atoms/todoAtom'
import {
    deleteTodo as deleteTodoAPI,
    editStatus as editStatusAPI,
    editTodo as editTodoAPI,
    createTodo as createTodoAPI,
    getAllTodos,
} from '@/utils'
import { ITodoCreate, ITodoUpdate, ResponseStatus, TaskStatus } from '@/types'

const useTodos = () => {
    const { todos } = useRecoilValue(todosState)
    const setTodos = useSetRecoilState(todosState)
    const loadTodos = async () => {
        try {
            const loadedTodos = await getAllTodos()
            if ((loadedTodos.status = ResponseStatus.SUCCESS))
                setTodos((prevState) => ({
                    todos: loadedTodos.data,
                }))
        } catch (err) {
            console.log(err)
        }
    }

    const updateStatus = async (id: number, status: TaskStatus) => {
        try {
            const updatedTodo = await editStatusAPI(id, status)
            if (updatedTodo.status === ResponseStatus.SUCCESS) {
                setTodos((prevState) => ({
                    todos: prevState.todos.map((todo) => {
                        if (todo.id === id) return updatedTodo.data
                        return todo
                    }),
                }))
            }
        } catch (err) {
            console.log(err)
        }
    }

    const editTodo = async (newTodo: ITodoUpdate) => {
        try {
            const updatedTodo = await editTodoAPI(newTodo)
            if (updatedTodo.status == ResponseStatus.SUCCESS)
                setTodos((prevState) => ({
                    todos: prevState.todos.map((todo) => {
                        if (todo.id === newTodo.id) return updatedTodo.data
                        return todo
                    }),
                }))
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTodo = async (id: number) => {
        try {
            const res = await deleteTodoAPI(id)
            if (res.status === ResponseStatus.SUCCESS)
                setTodos((prevState) => ({
                    todos: prevState.todos.filter((todo) => todo.id !== id),
                }))
        } catch (err) {
            console.log(err)
        }
    }

    const createTodo = async (newTodo: ITodoCreate) => {
        try {
            const todo = await createTodoAPI(newTodo)
            if (todo.status === ResponseStatus.SUCCESS)
                setTodos((prevState) => ({
                    todos: [...prevState.todos, todo.data],
                }))
        } catch (err) {
            console.log(err)
        }
    }

    return {
        todos,
        deleteTodo,
        updateStatus,
        loadTodos,
        editTodo,
        createTodo,
    }
}

export default useTodos
