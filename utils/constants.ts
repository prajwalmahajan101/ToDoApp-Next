import { TaskStatus } from '@/types'

export const API_HOST = 'http://localhost:8080'

export const API_ENDPOINTS = {
    getAll: () => `/todos`,
    getById: (id: number) => `/todos/${id}`,
    updateStatus: (id: number, status: TaskStatus) =>
        `/todos/${id}/status/${status}`,
    create: () => `/todos`,
    edit: () => `/todos`,
    delete: (id: number) => `/todos/${id}`,
}
