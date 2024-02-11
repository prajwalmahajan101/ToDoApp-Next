export interface IApiResponse<T> {
    status: ResponseStatus
    msg: string
    data: T
}

export enum ResponseStatus {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}
