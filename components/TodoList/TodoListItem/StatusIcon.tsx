import { FC } from 'react'
import {
    LuCircle,
    LuCircleDot,
    LuCircleDotDashed,
    LuPauseCircle,
} from 'react-icons/lu'
import { TaskStatus } from '@/types'

interface IStatusIcon {
    status: TaskStatus
    onClick: () => void
}

const IconMap = {
    [TaskStatus.IN_PROGRESS]: LuCircleDotDashed,
    [TaskStatus.NOT_STARTED]: LuCircle,
    [TaskStatus.COMPLETE]: LuCircleDot,
    [TaskStatus.ON_HOLD]: LuPauseCircle,
}

const colorMap = {
    [TaskStatus.IN_PROGRESS]: 'text-blue-600',
    [TaskStatus.NOT_STARTED]: 'text-red-600',
    [TaskStatus.COMPLETE]: 'text-green-600',
    [TaskStatus.ON_HOLD]: 'text-orange-600',
}

const animationMap = {
    [TaskStatus.IN_PROGRESS]: 'animate-spin',
    [TaskStatus.NOT_STARTED]: 'animate-bounce',
    [TaskStatus.COMPLETE]: '',
    [TaskStatus.ON_HOLD]: 'animate-pulse',
}
const StatusIcon: FC<IStatusIcon> = ({ status, onClick }) => {
    const Icon = IconMap[status]
    const color = colorMap[status]
    const animation = animationMap[status]
    return (
        <div onClick={onClick}>
            <Icon className={`${animation} text-3xl ${color} mx-2`} />
        </div>
    )
}

export default StatusIcon
