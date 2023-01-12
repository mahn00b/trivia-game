import { useState } from 'react';
import useInterval from '../../hooks/UseInterval';

export interface TimerProps {
  /** Start time of the timer in seconds.
   * @default 0
  */
  startTime?: number;
  /** Toggle this boolean to pause/resume the timer.
   * @default false
   */
  pause?: boolean
}

const pad = (num: number) => `0${num}`.slice(-2);

const formatTime = (timeInSeconds: number) => {
    const conversion = timeInSeconds / 60;

    const seconds = (conversion % 1) * 60

    const minutes = Math.floor(conversion)

    return `${pad(minutes)}:${pad(seconds)}`;
}

const Timer = ({
  startTime = 0,
  pause = false
}: TimerProps) => {
  const [time, setTime] = useState(startTime);

  useInterval(() => {
    if (!pause)
      setTime(time + 1)

  }, 1000)

  const formattedTime = formatTime(time);

  return (
      <div>
        {formattedTime}
      </div>
  )
}

export default Timer;
