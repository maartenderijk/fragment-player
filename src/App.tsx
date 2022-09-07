import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ButtonAppBar from './components/AppBar';
import AudioPlayer from './components/AudioPlayer';
import { songData } from './static/tasks';

function App() {

  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Container fixed maxWidth='md'>
        {songData.map(s => {
          return (
            <AudioPlayer key={s.id} title={s.name} source={s.source} songId={s.id} />
          )
        })}
      </Container>
    </React.Fragment>
  );
}

export default App;
