import { ModalState, modalState, ModalType } from '@/atoms/modalAtom'
import { useSetRecoilState } from 'recoil'

export const useCloseModal = () => {
    const setModalState = useSetRecoilState(modalState)
    return () => {
        setModalState(
            (prevState: ModalState): ModalState => ({
                data: undefined,
                isOpen: false,
                type: ModalType.None,
            })
        )
    }
}
