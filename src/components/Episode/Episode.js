import React from "react";

// Import material UI components
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Episode = ({ episode, id }) => {
  let description = episode.description;
  description ||= "Escucha este podcast que dejara reflexionando";

  let name = episode.artistName;
  name ||= episode.collectionName;

  return (
    <TableRow
      key={id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        borderBottom: "1px solid #FFFFFF",
      }}
    >
      <TableCell component="th" scope="row" style={{ color: "white" }}>
        <PlayArrowIcon />
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
          overflow="hidden"
          textoverflow="ellipsis"
          width="15rem"
          height={25}
        >
          {description}
        </Typography>
      </TableCell>
      <TableCell>{new Date(episode?.releaseDate).toDateString()}</TableCell>
    </TableRow>
  );
};

export default Episode;
