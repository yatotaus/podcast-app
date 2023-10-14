import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDate, getTime } from "../../utils";

// Import material UI components
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { PauseCircleFilledRounded, PlayArrow } from "@mui/icons-material";

const Episode = ({ episode, id }) => {
  const [audio, setAudio] = useState(new Audio(episode.previewUrl));
  const [isPlaying, setIsPlaying] = useState(false);

  const location = useLocation();
  const pathname = "/preview";

  let description = episode.description;
  description ||= "Escucha este podcast que dejara reflexionando";

  let name = episode.artistName ?? episode.collectionName;
  const date = getDate(episode?.releaseDate);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <TableRow
      key={id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        borderBottom: "1px solid #FFFFFF",
      }}
    >
      <TableCell component="th" scope="row" style={{ color: "white" }}>
        <Button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? (
            <PauseCircleFilledRounded sx={{ color: "#5C67DE" }} />
          ) : (
            <PlayArrow />
          )}
        </Button>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex" }}>
          <img src={episode?.artworkUrl60} alt={episode?.artistName} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "15px",
            }}
          >
            <Typography component="div">{episode?.trackName}</Typography>
            <Typography align="left" component="div" variant="subtitle1">
              {name}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography
          height={25}
          overflow="hidden"
          textoverflow="ellipsis"
          width="15rem"
        >
          {description}
        </Typography>
      </TableCell>
      <TableCell>{date}</TableCell>
      {location.pathname === pathname && (
        <TableCell>{getTime(episode?.releaseDate)}</TableCell>
      )}
    </TableRow>
  );
};

export default Episode;
