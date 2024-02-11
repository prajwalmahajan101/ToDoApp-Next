import { atom } from 'recoil'
import { ITodo } from '@/types'

export enum ModalType {
    EditTodo = 'EditTodo',
    EditStatus = 'EditStatus',
    DeleteTodo = 'DeleteTodo',
    CreateTodo = 'Create',
    None = 'None',
}

export type ModalState = {
    isOpen: boolean
    type: ModalType
    data?: ITodo
}

const initialState: ModalState = {
    isOpen: false,
    type: ModalType.EditStatus,
    data: undefined,
}

export const modalState = atom<ModalState>({
    key: 'authModalState',
    default: initialState,
})
