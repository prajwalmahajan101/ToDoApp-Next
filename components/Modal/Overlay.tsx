import { FC } from 'react'

interface IOverlayProps {
    closeModal: () => void
}

const Overlay: FC<IOverlayProps> = ({ closeModal }) => {
    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
            onClick={closeModal}
        ></div>
    )
}
export default Overlay
