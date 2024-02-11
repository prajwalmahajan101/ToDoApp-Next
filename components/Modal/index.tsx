import { FC } from 'react'
import { useCloseModal } from '@/hooks/useCloseModal'
import Overlay from '@/components/Modal/Overlay'
import { IoClose } from 'react-icons/io5'
import { useRecoilValue } from 'recoil'
import { modalState, ModalType } from '@/atoms/modalAtom'
import StatusEditModal from '@/components/Modal/StatusEditModal'
import DeleteConfimModal from '@/components/Modal/DeleteConfimModal'
import CreateOrUpdateTodo from '@/components/Modal/CreateOrUpdateTodo'

const Modal: FC = () => {
    const { type } = useRecoilValue(modalState)
    const closeModal = useCloseModal()
    return (
        <>
            <Overlay closeModal={closeModal} />
            <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
                <div className="relative w-full h-full mx-auto flex items-center justify-center">
                    <div className="rounded-lg shadow relative w-full bg-dark-layer-1 mx-6">
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="
                  bg-transprarent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center text-white hover:bg-gray-800 hover:text-white"
                                onClick={closeModal}
                            >
                                <IoClose className="h-5 w-5" />
                            </button>
                        </div>
                        {type === ModalType.EditStatus && (
                            <StatusEditModal closeModal={closeModal} />
                        )}
                        {type === ModalType.DeleteTodo && (
                            <DeleteConfimModal closeModal={closeModal} />
                        )}
                        {(type === ModalType.EditTodo ||
                            type === ModalType.CreateTodo) && (
                            <CreateOrUpdateTodo closeModal={closeModal} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
