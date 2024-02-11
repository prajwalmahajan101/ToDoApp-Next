import { FC } from 'react'
import { ITodo } from '@/types'
import StatusIcon from '@/components/TodoList/TodoListItem/StatusIcon'
import { MdDelete, MdEditSquare } from 'react-icons/md'
import { useOpenModal } from '@/hooks/useOpenModal'
import { ModalType } from '@/atoms/modalAtom'

interface ITodoListItemProps {
    todo: ITodo
}

const TodoListItem: FC<ITodoListItemProps> = ({ todo }) => {
    const openModal = useOpenModal()
    return (
        <div
            className={
                'm-3 h-[150px] bg-amber-50 flex justify-between rounded-2xl p-3 transition duration-300 ease-in-out transform hover:scale-105'
            }
        >
            <div className={'flex flex-col justify-around w-[calc(100%-50px)]'}>
                <div className={'flex w-full h-[30px]'}>
                    <StatusIcon
                        status={todo.status}
                        onClick={() => openModal(ModalType.EditStatus, todo)}
                    />
                    <li className={'text-2xl truncate'}>{todo.task}</li>
                </div>
                <div
                    className={
                        'flex w-full h-[85px] border-2 rounded border-orange-300 bg-gray-400 p-1 top-1 mt-1'
                    }
                >
                    <p className={'text-wrap truncate'}>{todo.description}</p>
                </div>
            </div>
            <div
                className={
                    'h-full w-[40px] flex flex-col items-center justify-around'
                }
            >
                <MdDelete
                    className={
                        'h-[30%] w-auto text-dark-layer-1 opacity-80 hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-110'
                    }
                    onClick={() => openModal(ModalType.DeleteTodo, todo)}
                />
                <MdEditSquare
                    className={
                        'h-[30%] w-auto text-dark-layer-1 opacity-60 hover:opacity-85 transition duration-300 ease-in-out transform hover:scale-110'
                    }
                    onClick={() => openModal(ModalType.EditTodo, todo)}
                />
            </div>
        </div>
    )
}

export default TodoListItem
