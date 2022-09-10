import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProgressIndicator(props: { seconds: number }) {
  const [progress, setProgress] = React.useState(0);
  const timeOptions = [1, 2, 4, 7, 11, 15];
  const { seconds } = props;

  React.useEffect(() => {
    if (seconds === 0) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 25));
      }, 200);
      return () => {
        clearInterval(timer);
      };
    } else {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 5));
      }, timeOptions[seconds] * 48);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  return (
    <CircularProgress variant="determinate" value={progress} />
  );
}
