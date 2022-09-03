import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ButtonAppBar from './components/AppBar';
import MediaControlCard from './components/AudioPlayer';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Container fixed maxWidth='md'>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <MediaControlCard />
          <MediaControlCard />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
