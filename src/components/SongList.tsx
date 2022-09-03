import * as React from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { songOptions, songs } from '../static/songs';

export default function SongList() {

  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={songOptions}
      getOptionLabel={(option) => `${option.artist} - ${option.track}` }
      sx={{ width: 300, pt: 3, mr: 1 }}
      renderInput={(params) => <TextField {...params} label="Song" />}
    />
  );
}