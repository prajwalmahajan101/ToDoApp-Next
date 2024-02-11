import { useSetRecoilState } from 'recoil'
import { ModalState, modalState, ModalType } from '@/atoms/modalAtom'
import { ITodo } from '@/types'

export const useOpenModal = () => {
    const setModalState = useSetRecoilState(modalState)
    return (type: ModalType, data?: ITodo) => {
        setModalState(
            (prevState: ModalState): ModalState => ({
                isOpen: true,
                type,
                data,
            })
        )
    }
}
