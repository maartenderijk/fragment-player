import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ButtonAppBar from './components/AppBar';
import AudioPlayer from './components/AudioPlayer';
import soundfile from "./static/music.mp3";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Container fixed maxWidth='md'>
        <AudioPlayer title={"Heardle #1"} source={soundfile} songId={1}/>
        <AudioPlayer title={"Heardle #2"} source={soundfile} songId={200}/>

      </Container>
    </React.Fragment>
  );
}

export default App;
