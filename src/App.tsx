import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ButtonAppBar from './components/AppBar';
import AudioPlayer from './components/AudioPlayer';
import soundfile from "./static/music.mp3";

function App() {
  const [songData, setSongData] = React.useState<jsonData[]>([]);

  type jsonData = {
    id: number;
    name: string;
    source: string;
  }

  React.useEffect(() => {
    const getData = async () => {
      const result = await fetch('https://s3.eu-west-1.amazonaws.com/rhdhv.maarten/Heardle/media/songlist.json');
      const json = await result.json() as jsonData[];
      setSongData(json)
    }
    getData()
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Container fixed maxWidth='md'>
        {songData.map(s => {
          return (
            <AudioPlayer title={s.name} source={s.source} songId={s.id} />
          )
        })}
      </Container>
    </React.Fragment>
  );
}

export default App;
