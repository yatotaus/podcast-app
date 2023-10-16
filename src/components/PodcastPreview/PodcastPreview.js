import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Import material UI components
import { Box, Typography } from "@mui/material";
import {
  ExpandMoreRounded,
  PauseCircleFilledRounded,
  SearchRounded,
} from "@mui/icons-material";

//Import components
import Episode from "../Episode/Episode";
import PodcastList from "../PodcastList/PodcastList";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const PodcastPreview = () => {
  const location = useLocation();
  const podcastEpisodes = location.state;

  const photo = podcastEpisodes[0].artworkUrl600;

  return (
    <div className="table">
      <Box
        sx={{
          backgroundImage: `url(${photo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "15px",
          height: 300,
        }}
      />
      <Box
        marginBottom="10px"
        display={"flex"}
        justifyContent={"space-between"}
      >
        <PauseCircleFilledRounded
          sx={{ color: "#5C67DE", height: "70px", width: "70px" }}
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
          {podcastEpisodes[0].collectionName}
        </Typography>

        <Box
          alignItems={"center"}
          display={"flex"}
          justifyContent={"space-around"}
          marginBottom="10px"
        >
          <SearchRounded sx={{ color: "#FFFFFF", marginRight: "20px" }} />
          <Typography variant="text" sx={{ color: "#FFFFFF" }}>
            Order by
          </Typography>
          <ExpandMoreRounded sx={{ color: "#FFFFFF" }} />
        </Box>
      </Box>
      <PodcastList>
        {podcastEpisodes?.map((episode, id) => (
          <Episode
            {...{
              episode,
              id,
            }}
          />
        ))}
      </PodcastList>
      <AudioPlayer
        {...{
          episode: podcastEpisodes[0],
        }}
      />
    </div>
  );
};

export default PodcastPreview;
