import React from "react";
import { useLocation } from "react-router-dom";

import { getDate, getTime } from "../../utils";

// Import material UI components
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Episode = ({ episode, id }) => {
  const location = useLocation();
  const pathname = "/preview";

  let description = episode.description;
  description ||= "Escucha este podcast que dejara reflexionando";

  let name = episode.artistName ?? episode.collectionName;
  const date = getDate(episode?.releaseDate);

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
      <TableCell>{date}</TableCell>
      {location.pathname === pathname && (
        <TableCell>{getTime(episode?.releaseDate)}</TableCell>
      )}
    </TableRow>
  );
};

export default Episode;
