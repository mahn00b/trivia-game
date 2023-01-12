import { Box, CircularProgress, Typography } from '@mui/material';
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
  pause?: boolean;
  /** Set a time limit in seconds */
  limit?: number
  /** A callback to inform the parent when the timer is over. Only works when a time limit is set. */
  onReachedLimit?: () => void;
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
  pause = false,
  limit = Infinity,
  onReachedLimit = () => {}
}: TimerProps) => {
  const [time, setTime] = useState(startTime);

  useInterval(() => {
    if (!pause && time < limit) setTime(time + 1)

    if (time >= limit) onReachedLimit();

    // console.log(time)
  }, 1000)

  const formattedTime = formatTime(time);
  console.log(limit, time)
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        size="10rem"
        color="primary"
        value={100 * (time/limit)}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
          fontSize="2rem"
        >{formattedTime}</Typography>
      </Box>
    </Box>
  );
}

export default Timer;
