import React, { FC, useState } from 'react'
import { AllTaskStatus, ITodo, TaskStatus, TaskStatusSearch } from '@/types'
import {
    LuCircle,
    LuCircleDot,
    LuCircleDotDashed,
    LuPauseCircle,
} from 'react-icons/lu'
import { useRecoilValue } from 'recoil'
import { modalState } from '@/atoms/modalAtom'
import useTodos from '@/hooks/useTodos'

interface IStatusEditModalProps {
    closeModal: () => void
}

const StatusEditModal: FC<IStatusEditModalProps> = ({ closeModal }) => {
    const { data: todo } = useRecoilValue(modalState)

    const { updateStatus } = useTodos()
    const [activeTaskStatus, setActiveTaskStatus] = useState<TaskStatus>(
        todo?.status ?? TaskStatus.NOT_STARTED
    )
    const isActive = (status: TaskStatusSearch) => {
        return status == activeTaskStatus
            ? 'opacity-100 animate-bounce'
            : 'opacity-50'
    }

    const handleUpdate = async () => {
        try {
            if (todo) {
                await updateStatus((todo as ITodo).id, activeTaskStatus)
            }
        } catch (err) {
            console.log(err)
        } finally {
            closeModal()
        }
    }

    const clickOnStatusIcon = (status: TaskStatus) => () =>
        setActiveTaskStatus(status)
    return (
        <div className={'space-y-6 px-6 py-4'}>
            <h3 className={'text-xl font-medium text-white'}>
                Select New Status
            </h3>
            <div className={'pt-3 flex w-[calc(100%-30px)] justify-around'}>
                <LuCircleDotDashed
                    className={`text-4xl text-blue-600 ${isActive(TaskStatus.IN_PROGRESS)}`}
                    onClick={clickOnStatusIcon(TaskStatus.IN_PROGRESS)}
                />
                <LuCircle
                    className={`text-4xl text-red-600 ${isActive(TaskStatus.NOT_STARTED)}`}
                    onClick={clickOnStatusIcon(TaskStatus.NOT_STARTED)}
                />
                <LuCircleDot
                    className={`text-4xl text-green-600 ${isActive(TaskStatus.COMPLETE)}`}
                    onClick={clickOnStatusIcon(TaskStatus.COMPLETE)}
                />
                <LuPauseCircle
                    className={`text-4xl text-orange-600 ${isActive(TaskStatus.ON_HOLD)}`}
                    onClick={clickOnStatusIcon(TaskStatus.ON_HOLD)}
                />
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
                    className={`bg-dark-fill-3 text-brand-orange-s cursor-pointer  py-1.5 px-3 rounded 
                    hover:text-brand-orange hover:bg-dark-fill-2 hover:scale-105 disabled:opacity-50 
                    disabled:hover:scale-100 disabled:hover:text-brand-orange-s disabled:hover:bg-dark-fill-3 
                    disabled:hover:cursor-not-allowed`}
                    onClick={handleUpdate}
                    disabled={activeTaskStatus === (todo as ITodo).status}
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default StatusEditModal
