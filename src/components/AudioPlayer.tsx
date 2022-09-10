import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';
import SongList from './SongList';
import { songOptions } from '../static/songs';
import ProgressIndicator from './ProgressIndicator';

interface AudiopPlayerProps {
  title: string;
  source: string;
  songId: number;
}

interface UserHistoryItem {
  id: number;
  result: ResultItem;
  guesses: GuessItem[];
}

type GuessItem = "correct" | "incorrect" | "skip" | "artistcorrect" | "null";
type ResultItem = "success" | "fail" | "playing";

const guessIconMap = {
  "correct": "🟩",
  "incorrect": "🟥",
  "skip": "⬛",
  "artistcorrect": "🟨",
  "null": "⬜"
}

const resultIconMap = {
  "success": "🔊",
  "playing": "🔊",
  "fail": "🔇"
}

export default function AudioPlayer(props: AudiopPlayerProps) {
  const { title, source, songId } = props;

  // Grab old results from localstorage
  const allResults = localStorage.getItem("fragments")
  const allResultsObject: UserHistoryItem[] = allResults ? JSON.parse(allResults) : [];
  const songResult = allResultsObject.find(r => r.id === songId);
  const [audio] = React.useState(new Audio(source));

  const [playTime, setPlayTime] = React.useState<number>(0);
  const [pauseAudio, setPauseAudio] = React.useState(false);
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [guessedSongId, setGuessedSongId] = React.useState<number | null>(null);
  const [guesses, setGuesses] = React.useState<GuessItem[]>(songResult ? songResult.guesses : []);
  const [result, setResult] = React.useState<ResultItem>(songResult ? songResult.result : "playing");
  const timeOptions = [1, 2, 4, 7, 11, 15];

  const selectedSong = songOptions.find(s => s.id === songId);
  const songArtist = selectedSong?.artist || '';

  React.useEffect(() => {
    if (result === 'playing') {
      return
    }

    const resultJson: UserHistoryItem = {
      id: songId,
      result,
      guesses
    };

    const storageValue = localStorage.getItem("fragments");
    const oldValue: UserHistoryItem[] = storageValue ? JSON.parse(storageValue) : [];
    const newValue = [...oldValue, resultJson];
    localStorage.setItem("fragments", JSON.stringify(newValue));
  }, [result, songId, guesses])

  React.useEffect(() => {
    audio.addEventListener('ended', () => setPauseAudio(false));
    return () => {
      audio.removeEventListener('ended', () => setPauseAudio(false));
    };
  }, []);


  const handleCheckResult = (guesses: GuessItem[]) => {
    let result: ResultItem = "playing"
    if (guesses.length > 5) {
      result = "fail";
    }
    if (guesses.some(g => g === "correct")) {
      result = "success";
    }
    setResult(result);
    return result
  }

  const handlePlay = () => {

    if (result === "playing") {
      setAudioPlaying(true);
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Works as audio stop
        setAudioPlaying(false);
      }, timeOptions[playTime] * 1000);
    }
    if (result !== "playing") {

      if (pauseAudio) {
        audio.pause();
      }
      else {
        audio.play();
      }

      setPauseAudio(!pauseAudio);
    }
  }




  const handleCheckSong = () => {
    let guess: GuessItem = "incorrect"
    const guessedArtist = songOptions.find(s => s.id === guessedSongId)?.artist;
    if (guessedSongId === songId) {
      guess = "correct";
    } else if (guessedArtist === songArtist) {
      guess = "artistcorrect";
    }
    const result = handleCheckResult([...guesses, guess]);
    let updatedGuesses = [...guesses, guess];
    if (result === "success") {
      if (updatedGuesses.length < 5) {
        const arrayLength = updatedGuesses.length;
        for (let i = arrayLength; i < 6; i++)
          updatedGuesses.push("null");
      }
    }
    if (guess !== "correct") {
      setPlayTime(playTime + 1);
    }
    setGuesses(updatedGuesses);
  }

  const handleSkip = () => {
    handleCheckResult([...guesses, "skip"]);
    setGuesses([...guesses, "skip"])
    setPlayTime(playTime + 1)
  }

  const handleShare = () => {
    let text = title + " ";
    text += resultIconMap[result];
    text += guesses.map(g => guessIconMap[g]).join("");
    navigator.clipboard.writeText(text)
  }

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {guesses.length > 0 && resultIconMap[result]}
            {guesses.map(g => {
              return guessIconMap[g]
            }
            ).join("")}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {result === "playing" &&
            <>
              <IconButton aria-label="play" onClick={handlePlay}>
                {audioPlaying ?
                  <ProgressIndicator seconds={playTime} />
                  :
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                }
              </IconButton>
              <Button variant="outlined" onClick={handleSkip}>
                {guesses.length === 5 ? 'skip' : `+${playTime + 1}s`}
              </Button>
            </>
          }
          {result !== "playing" &&
            <>
              <IconButton aria-label="play" onClick={handlePlay}>
                {pauseAudio ?
                  <PauseIcon sx={{ height: 38, width: 38 }} />
                  :
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                }
              </IconButton>
              <IconButton aria-label="share" onClick={handleShare}>
                <ShareIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <Typography>
                {songArtist} - {selectedSong?.track || ''}
              </Typography>
            </>
          }

        </Box>
      </Box>
      <Box sx={{ alignItems: 'center', pl: 1, pb: 1 }}>
        <SongList setGuessedSongId={setGuessedSongId} />
        {result === "playing" &&
          <Button
            onClick={handleCheckSong}
            sx={{ ml: 28, mt: 2, mr: 1 }}
          >
            OK
          </Button>
        }
      </Box>
    </Card>
  );
}


