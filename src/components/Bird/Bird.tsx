import { BIRD_HEIGHT, BIRD_WIDTH } from '../../constants'
import './Bird.scss'

interface BirdProps {
    position: Number
}

const Bird = ({ position }: BirdProps) => {
    return (
        <div
            className={'bird'}
            style={{
                backgroundSize: `${BIRD_WIDTH}px ${BIRD_HEIGHT}px`,
                width: `${BIRD_WIDTH}px`,
                height: `${BIRD_HEIGHT}px`,
                top: `${position}px`,
            }}
        />
    )
}

export default Bird