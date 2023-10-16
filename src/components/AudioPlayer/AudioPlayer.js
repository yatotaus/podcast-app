import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Import material UI components
import { Box, Button, Stack, Slider, Typography } from "@mui/material";

import {
  FirstPageRounded,
  LastPageRounded,
  PauseCircleFilledRounded,
  PlayArrow,
  RefreshRounded,
  ShuffleRounded,
  VolumeUp,
} from "@mui/icons-material";

// Import CSS
import "./audioPlayer.css";

const AudioPlayer = ({ episode }) => {
  let name = episode?.artistName ?? episode?.collectionName;
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedMetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const toggglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  };

  return (
    <Box
      className="audioPlayer"
      sx={{
        background: "#1A1A1A",
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        height: "110px",
        justifyContent: "space-between",
        marginTop: "auto",
        position: "fixed",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <img
          src={episode?.artworkUrl60}
          alt={name}
          style={{ borderRadius: "inherit" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "15px",
            marginTop: "30px",
            width: "-webkit-fill-available",
          }}
        >
          <Typography component="div" color="white">
            {episode?.trackName}
          </Typography>
          <Typography
            align="left"
            component="div"
            variant="subtitle1"
            sx={{ opacity: "0.3", color: "#FFFFFF" }}
          >
            {name}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginRight: "25px",
        }}
      >
        <Button>
          <ShuffleRounded sx={{ color: "#FFFFFF" }} />
        </Button>
        <audio
          preload="metadata"
          ref={audioPlayer}
          src={episode?.previewUrl}
        ></audio>
        <Button>
          <FirstPageRounded sx={{ color: "#FFFFFF" }} />
        </Button>
        <Button onClick={toggglePlayPause}>
          {isPlaying ? (
            <PauseCircleFilledRounded
              sx={{ color: "#5C67DE", height: "60px", width: "60px" }}
            />
          ) : (
            <PlayArrow
              sx={{ color: "#FFFFFF", height: "60px", width: "60px" }}
            />
          )}
        </Button>
        <Button>
          <LastPageRounded sx={{ color: "#FFFFFF" }} />
        </Button>

        <Button onClick={forwardThirty}>
          <RefreshRounded sx={{ color: "#FFFFFF" }} />
        </Button>

        {/*current time */}
        <Typography sx={{ margin: "auto", color: "#FFFFFF" }}>
          {calculateTime(currentTime)}
        </Typography>

        {/*progress bar */}
        <input
          className="progressBar"
          defaultValue="0"
          onChange={changeRange}
          ref={progressBar}
          style={{ width: "30em" }}
          type="range"
        />

        {/*duration */}
        <Typography sx={{ margin: "auto", opacity: "0.3", color: "#FFFFFF" }}>
          {duration && !isNaN(duration) && calculateTime(duration)}
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          sx={{
            alignItems: "center",
            marginLeft: "10px",
            mb: 1,
            width: "150px",
          }}
          alignItems="center"
        >
          <VolumeUp sx={{ color: "#FFFFFF" }} />
          <Slider aria-label="Volume" />
        </Stack>
      </Box>
    </Box>
  );
};

export default AudioPlayer;

AudioPlayer.propTypes = {
  episode: PropTypes.object,
};
