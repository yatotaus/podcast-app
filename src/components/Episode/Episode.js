import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { getDate, getTime } from "../../utils";

// Import material UI components
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { PauseCircleFilledRounded, PlayArrow } from "@mui/icons-material";
import { withStyles } from "@mui/styles";

const StyledTableCell = withStyles({
  root: {
    color: "#FFFFFF",
    opacity: "0.3",
    borderBottomColor: "rgb(211,211,211, 0.1)",
  },
})(TableCell);

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
        borderBottomColor: "rgb(211,211,211, 0.1)",
      }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{ color: "white", borderBottomColor: "rgb(211,211,211, 0.1)" }}
      >
        <Button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? (
            <PauseCircleFilledRounded sx={{ color: "#5C67DE" }} />
          ) : (
            <PlayArrow sx={{ color: "white" }} />
          )}
        </Button>
      </TableCell>
      <TableCell sx={{ borderBottomColor: "rgb(211,211,211, 0.1)" }}>
        <Box sx={{ display: "flex" }}>
          <img src={episode?.artworkUrl60} alt={episode?.artistName} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "15px",
            }}
          >
            <Typography sx={{ color: "#FFFFFF" }}>
              {episode?.trackName}
            </Typography>
            <Typography
              sx={{ align: "left", color: "#FFFFFF", opacity: "0.3" }}
              variant="subtitle2"
            >
              {name}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <StyledTableCell>
        <Typography
          height={25}
          overflow="hidden"
          textoverflow="ellipsis"
          width="15rem"
        >
          {description}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>{date}</StyledTableCell>
      {location.pathname === pathname && (
        <StyledTableCell>{getTime(episode?.releaseDate)}</StyledTableCell>
      )}
    </TableRow>
  );
};

export default Episode;

Episode.propTypes = {
  episode: PropTypes.object,
  id: PropTypes.number,
};
