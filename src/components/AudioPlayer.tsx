import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Autocomplete, Button, CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';


export default function MediaControlCard() {
  const theme = useTheme();

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
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
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
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}