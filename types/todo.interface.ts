export interface ITodo extends ITodoUpdate {
    status: TaskStatus
}

export enum TaskStatus {
    IN_PROGRESS = 'in_progress',
    ON_HOLD = 'on_hold',
    NOT_STARTED = 'not_started',
    COMPLETE = 'complete',
}
export enum AllTaskStatus {
    All = 'all',
}

export type TaskStatusSearch = TaskStatus | AllTaskStatus

export interface ITodoCreate {
    task: string
    description: string
}

export interface ITodoUpdate extends ITodoCreate {
    id: number
}
