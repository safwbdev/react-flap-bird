import { PIPE_WIDTH } from '../../constants'
import './Pipe.scss'

interface PipeProps {
    height: Number;
    position: Number;
    top: Number;
    rotate: Number;
}

const Pipe = ({ height, position, top, rotate }: PipeProps) => {
    return (
        <div
            className={'pipe'}
            style={{
                width: `${PIPE_WIDTH}px`,
                height: `${height}px`,
                left: `${position}px`,
                top: `${top}px`,
                transform: `rotate(${rotate}deg)`
            }}
        />
    )
}

export default Pipe