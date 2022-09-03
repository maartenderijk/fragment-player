import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Autocomplete, Button, CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import soundfile from "../static/music.mp3";

export default function MediaControlCard() {
  const [playTime, setPlayTime] = React.useState<number>(0);
  const timeOptions = [1, 2, 4, 7, 11, 15];

  const audio = new Audio(soundfile)

  const play = () => {
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Works as audio stop
    }, timeOptions[playTime] * 1000);
  }

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            #Heardle #184
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            🔊🟨🟨🟩⬜⬜⬜
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause" onClick={play}>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <Button variant="outlined" onClick={() => setPlayTime(playTime + 1)}>
            +{playTime + 1}s
          </Button>
        </Box>
      </Box>
      <Box sx={{ alignItems: 'center', pl: 1, pb: 1 }}>
        <ComboBox />
        <Button
          sx={{ ml: 28, mt: 2, mr: 1 }}
        >
          OK
        </Button>
      </Box>
    </Card>
  );
}


function ComboBox() {
  const top100Films = [
    { label: 'the Beatles', year: 1994 },
    { label: 'Queen', year: 1994 },
    { label: 'Stones', year: 1994 },
    { label: 'Underworld', year: 1994 },
  ]
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300, pt: 3, mr: 1 }}
      renderInput={(params) => <TextField {...params} label="Song" />}
    />
  );
}