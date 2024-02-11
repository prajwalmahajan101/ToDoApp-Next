import React, { ChangeEvent, FC, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { modalState, ModalType } from '@/atoms/modalAtom'
import useTodos from '@/hooks/useTodos'
import { ITodoCreate, ITodoUpdate } from '@/types'

interface ICreateOrUpdateTodoProps {
    closeModal: () => void
}
const CreateOrUpdateTodo: FC<ICreateOrUpdateTodoProps> = ({ closeModal }) => {
    const { type: modalType, data: todo } = useRecoilValue(modalState)
    const { createTodo, editTodo } = useTodos()

    const initialValue = {
        task: todo?.task ?? '',
        description: todo?.description ?? '',
    }

    const [formData, setFromData] = useState(initialValue)

    const onChange = (
        evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const name = evt.target.name
        const value = evt.target.value
        setFromData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            if (modalType === ModalType.EditTodo && todo) {
                const apiData: ITodoUpdate = {
                    id: todo.id,
                    ...formData,
                }
                await editTodo(apiData)
            } else if (modalType === ModalType.CreateTodo) {
                const apiData: ITodoCreate = {
                    ...formData,
                }
                await createTodo(apiData)
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
                {modalType === ModalType.CreateTodo ? 'Create' : 'Update'} To-do
                Task
            </h3>
            <div>
                <div className={'m-4'}>
                    <label
                        htmlFor="task"
                        className="text-sm font-medium block mb-2 text-gray-300"
                    >
                        Your Task Title
                    </label>
                    <input
                        id="task"
                        type="text"
                        name="task"
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
            block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        placeholder="Todo Task"
                        value={formData.task}
                        onChange={onChange}
                    />
                </div>
                <div className={'m-4'}>
                    <label
                        htmlFor="description"
                        className="text-sm font-medium block mb-2 text-gray-300"
                    >
                        Your Task Description
                    </label>
                    <textarea
                        id="description"
                        rows={5}
                        name="description"
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
            block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        placeholder="Task Description"
                        value={formData.description}
                        onChange={onChange}
                    />
                </div>
            </div>
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
                    onClick={handleSubmit}
                >
                    {modalType === ModalType.CreateTodo ? 'Create' : 'Update'}
                </button>
            </div>
        </div>
    )
}

export default CreateOrUpdateTodo
