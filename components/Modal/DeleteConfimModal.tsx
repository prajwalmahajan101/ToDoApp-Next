import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { modalState } from '@/atoms/modalAtom'
import useTodos from '@/hooks/useTodos'

interface IDeleteConfirmModalProps {
    closeModal: () => void
}
const DeleteConfirmModal: FC<IDeleteConfirmModalProps> = ({ closeModal }) => {
    const { data: todo } = useRecoilValue(modalState)

    const { deleteTodo } = useTodos()

    const handleDelete = async () => {
        try {
            if (todo) {
                await deleteTodo(todo.id)
            }
        } catch (err) {
            console.log(err)
        } finally {
            closeModal()
        }
    }
    return (
        <div className={'space-y-3 px-6 pb-6'}>
            <h3 className={'text-xl font-medium text-white'}>
                Do you want to delete the Todo Task?
            </h3>
            <div className={'flex px-5 justify-around'}>
                <button
                    className={
                        'bg-dark-fill-3 text-brand-orange-s cursor-pointer py-1.5 px-3 rounded hover:text-brand-orange hover:bg-dark-fill-2 hover:scale-105'
                    }
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className={
                        'bg-dark-fill-3 text-brand-orange-s cursor-pointer py-1.5 px-3 rounded hover:text-brand-orange hover:bg-dark-fill-2 hover:scale-105'
                    }
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteConfirmModal
