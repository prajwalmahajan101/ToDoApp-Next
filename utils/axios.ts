import axios from 'axios'
import { API_ENDPOINTS, API_HOST } from '@/utils/constants'
import {
    IApiResponse,
    ITodo,
    ITodoCreate,
    ITodoUpdate,
    ResponseStatus,
    TaskStatus,
} from '@/types'
import { errorToast, successToast } from '@/utils/toast'

const axiosInstance = axios.create({
    baseURL: API_HOST,
})

axiosInstance.interceptors.response.use(
    (response) => {
        successToast(response.data.msg)
        return response.data
    },
    (error) => {
        if (
            error.response.data &&
            error.response.data.status == ResponseStatus.FAILURE &&
            error.response.data.data
        ) {
            Object.values(error.response.data.data).map((value) =>
                errorToast(value as string)
            )
        } else if (
            error.response.data &&
            error.response.data.status == ResponseStatus.FAILURE
        )
            errorToast(error.response.data.msg)

        return error.response
    }
)

export const getAllTodos = () => {
    return axiosInstance.get<IApiResponse<ITodo[]>, IApiResponse<ITodo[]>>(
        API_ENDPOINTS.getAll()
    )
}

export const getTodoById = (id: number) => {
    return axiosInstance.get<IApiResponse<ITodo>, IApiResponse<ITodo>>(
        API_ENDPOINTS.getById(id)
    )
}

export const editStatus = (id: number, status: TaskStatus) => {
    return axiosInstance.patch<IApiResponse<ITodo>, IApiResponse<ITodo>>(
        API_ENDPOINTS.updateStatus(id, status)
    )
}

export const createTodo = (todo: ITodoCreate) => {
    return axiosInstance.post<IApiResponse<ITodo>, IApiResponse<ITodo>>(
        API_ENDPOINTS.create(),
        todo
    )
}

export const deleteTodo = (id: number) => {
    return axiosInstance.delete<IApiResponse<null>, IApiResponse<null>>(
        API_ENDPOINTS.delete(id)
    )
}

export const editTodo = (todo: ITodoUpdate) => {
    return axiosInstance.put<IApiResponse<ITodo>, IApiResponse<ITodo>>(
        API_ENDPOINTS.edit(),
        todo
    )
}
