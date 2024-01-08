import { useEffect, useState } from 'react'
import { BIRD_HEIGHT, GRAVITY, PIPE_GAP, PIPE_SPEED, PIPE_WIDTH, WALL_HEIGHT, WALL_WIDTH } from './constants';
import './App.scss'
import Pipe from './components/Pipe';
import Bird from './components/Bird';

function App() {
  const [isStart, setIsStart] = useState(false);
  const [birdPosition, setBirdPosition] = useState<number>(300);
  const [pipeHeight, setPipeHeight] = useState(0);
  const [pipePosition, setPipePosition] = useState(WALL_WIDTH);
  const [score, setScore] = useState<number>(0);




  useEffect(() => {
    let intVal: number;
    if (isStart && birdPosition < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  });

  useEffect(() => {
    let pipeVal: number;
    if (isStart && pipePosition >= -PIPE_WIDTH) {
      pipeVal = setInterval(() => {
        setPipePosition((pipePosition) => pipePosition - PIPE_SPEED);
      }, 24);

      return () => {
        clearInterval(pipeVal);
      };
    } else {
      setPipePosition(WALL_WIDTH);
      setPipeHeight(Math.floor(Math.random() * (WALL_HEIGHT - PIPE_GAP)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, pipePosition]);

  useEffect(() => {
    let topPipe = birdPosition >= 0 && birdPosition < pipeHeight;
    let bottomPipe =
      birdPosition <= WALL_HEIGHT &&
      birdPosition >=
      WALL_HEIGHT - (WALL_HEIGHT - PIPE_GAP - pipeHeight) - BIRD_HEIGHT;

    if (
      pipePosition >= PIPE_WIDTH &&
      pipePosition <= PIPE_WIDTH + 80 &&
      (topPipe || bottomPipe)
    ) {
      setIsStart(false);
      setBirdPosition(300);
      setScore(0);
    }
  }, [isStart, birdPosition, pipeHeight, pipePosition]);

  const ascendBird = () => {
    if (!isStart) {
      setIsStart(true);
    } else if (birdPosition < BIRD_HEIGHT) {
      setBirdPosition(0);
    } else {
      setBirdPosition((birdPosition) => birdPosition - 50);
    }
  };

  return (
    <div className='main'>
      <div className='gameScreen' onClick={ascendBird}>
        <div className='score'>Score: {score}</div>
        <div
          className='background'
          style={{
            width: `${WALL_WIDTH}px`,
            height: `${WALL_HEIGHT}px`,
            backgroundSize: `${WALL_WIDTH}px ${WALL_HEIGHT}px`,
          }}
        >
          {!isStart && <div className='startButton'>Start</div>}
          <Pipe
            height={pipeHeight}
            position={pipePosition}
            rotate={180}
            top={0}
          />
          <Bird position={birdPosition} />
          <Pipe
            height={WALL_HEIGHT - PIPE_GAP - pipeHeight}
            position={pipePosition}
            rotate={0}
            top={WALL_HEIGHT - (pipeHeight + (WALL_HEIGHT - PIPE_GAP - pipeHeight))}
          />
        </div>
      </div>
    </div>
  )
}

export default App



