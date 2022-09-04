import * as React from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { SongOption, songOptions } from '../static/songs';


interface SongListProps {
  setGuessedSongId: React.Dispatch<React.SetStateAction<number | null>>
}

export default function SongList(props: SongListProps) {
  const { setGuessedSongId } = props;

  const handleChange = (_e: React.SyntheticEvent<Element, Event>, value: SongOption | null) => {
    setGuessedSongId(value?.id || null)
  }


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={songOptions}
      getOptionLabel={(option) => `${option.artist} - ${option.track}`}
      sx={{ width: 300, pt: 3, mr: 1 }}
      renderInput={(params) => <TextField {...params} label="Song" />}
      onChange={handleChange}
    />
  );
}