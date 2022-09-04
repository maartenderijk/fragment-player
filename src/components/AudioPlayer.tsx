import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button } from '@mui/material';
import SongList from './SongList';

interface AudiopPlayerProps {
  title: string;
  source: string;
  songId: number;
}


export default function AudioPlayer(props: AudiopPlayerProps) {
  const [playTime, setPlayTime] = React.useState<number>(0);
  const [guessedSongId, setGuessedSongId] = React.useState<number | null>(null);
  const [result, setResult] = React.useState("");
  const timeOptions = [1, 2, 4, 7, 11, 15];
  const { title, source, songId } = props;

  const audio = new Audio(source)

  const handlePlay = () => {
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Works as audio stop
    }, timeOptions[playTime] * 1000);
  }

  const handleCheckSong = () => {
    setResult(`${guessedSongId === songId}`)
  }

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            🔊🟨🟨🟩⬜⬜⬜ {result}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause" onClick={handlePlay}>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <Button variant="outlined" onClick={() => setPlayTime(playTime + 1)}>
            +{playTime + 1}s
          </Button>
        </Box>
      </Box>
      <Box sx={{ alignItems: 'center', pl: 1, pb: 1 }}>
        <SongList setGuessedSongId={setGuessedSongId} />
        <Button
          onClick={handleCheckSong}
          sx={{ ml: 28, mt: 2, mr: 1 }}
        >
          OK
        </Button>
      </Box>
    </Card>
  );
}


