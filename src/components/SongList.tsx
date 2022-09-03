import * as React from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { songs } from '../static/songs';

export default function SongList() {
  const songsOptions = [];

  for (const artist of songs) {
    for (const track of artist.songs) {
      const trackString = `${artist.artist} - ${track}`
      songsOptions.push(trackString)
    }
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={songsOptions}
      sx={{ width: 300, pt: 3, mr: 1 }}
      renderInput={(params) => <TextField {...params} label="Song" />}
    />
  );
}