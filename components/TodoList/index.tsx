import React, { FC, useEffect, useState } from 'react'
import { AllTaskStatus, TaskStatus, TaskStatusSearch } from '@/types'
import TodoListItem from '@/components/TodoList/TodoListItem'
import { MdAddCircle, MdAllInclusive } from 'react-icons/md'
import {
    LuCircle,
    LuCircleDot,
    LuCircleDotDashed,
    LuPauseCircle,
} from 'react-icons/lu'
import { useRecoilValue } from 'recoil'
import { modalState, ModalType } from '@/atoms/modalAtom'
import Modal from '@/components/Modal'
import useTodos from '@/hooks/useTodos'
import { useOpenModal } from '@/hooks/useOpenModal'
import Link from 'next/link'

interface ITodoListProps {}

const TodoList: FC<ITodoListProps> = () => {
    const { todos, loadTodos } = useTodos()
    const openModal = useOpenModal()
    useEffect(() => {
        loadTodos()
    }, [])
    const { isOpen } = useRecoilValue(modalState)
    const [activeTaskStatus, setActiveTaskStatus] = useState<TaskStatusSearch>(
        AllTaskStatus.All
        // TaskStatus.IN_PROGRESS
    )

    const getShowList = () => {
        if (activeTaskStatus === AllTaskStatus.All) return todos
        return todos.filter((todo) => todo.status === activeTaskStatus)
    }

    const isActive = (status: TaskStatusSearch) => {
        return status == activeTaskStatus
            ? 'opacity-100 animate-bounce'
            : 'opacity-50'
    }
    const clickOnStatusIcon = (status: TaskStatusSearch) => () =>
        setActiveTaskStatus(status)
    return (
        <div
            className={
                'h-[calc(100vh-100px)] w-full flex flex-col justify-between items-center bg-dark-gray-7'
            }
        >
            <div
                className={
                    'h-[calc(100vh-205px)] bg-gray-600 max-w-[1000px] min-w-[600] w-[calc(100vw-40px)] rounded-xl flex-col justify-center items-center mt-[18px]'
                }
            >
                <div
                    className={
                        'w-full h-[80px] bg-dark-layer-1 rounded-t-xl flex justify-between items-center'
                    }
                >
                    <div
                        className={
                            'ml-5 text-3xl text-brand-orange font-bold w-[250px]'
                        }
                    >
                        Todo Tasks List
                    </div>
                    <div className={'mr-5 flex justify-around w-[300px]'}>
                        <MdAllInclusive
                            className={`text-4xl text-white ${isActive(AllTaskStatus.All)}`}
                            onClick={clickOnStatusIcon(AllTaskStatus.All)}
                        />
                        <LuCircleDotDashed
                            className={`text-4xl text-blue-600 ${isActive(TaskStatus.IN_PROGRESS)}`}
                            onClick={clickOnStatusIcon(TaskStatus.IN_PROGRESS)}
                        />
                        <LuCircle
                            className={`text-4xl text-red-600  ${isActive(TaskStatus.NOT_STARTED)}`}
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
                        <MdAddCircle
                            className={
                                'text-4xl text-amber-100 opacity-85 hover:opacity-95 hover:transform hover:scale-150 transition duration-300 ease-in-out'
                            }
                            onClick={() => openModal(ModalType.CreateTodo)}
                        />
                    </div>
                </div>
                <ul
                    className={
                        'h-[calc(100%-80px)] w-full px-4 py-2 overflow-y-auto'
                    }
                >
                    {getShowList().map((todo) => (
                        <TodoListItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            </div>
            {isOpen && <Modal />}
            <div
                className={
                    'hidden  bg-dark-layer-1 h-[64px] w-full md:flex justify-between items-center text-dark-gray-6 text-xl'
                }
            >
                <div className={'ml-5'}>Create With Next & Tailwind CSS</div>
                <div className={''}>
                    @Powered By SpringBoot API
                    <div className={'w-full flex justify-center items-center'}>
                        <Link href={'https://github.com/prajwalmahajan101'}>
                            Project Link
                        </Link>
                    </div>
                </div>
                <div className={'mr-5'}>Create By Prajwal Mahajan</div>
            </div>
        </div>
    )
}

export default TodoList
