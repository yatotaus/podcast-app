import React from "react";
import { useLocation } from "react-router-dom";

// Import material UI components
import { Box, Typography } from "@mui/material";
import {
  PauseCircleFilledRounded,
  SearchRounded,
  ExpandMoreRounded,
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
          height: 300,
          backgroundSize: "cover",
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
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {podcastEpisodes[0].collectionName}
        </Typography>

        <Box
          marginBottom="10px"
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <SearchRounded />
          <Typography variant="text" sx={{ fontWeight: "bold" }}>
            Order by
          </Typography>
          <ExpandMoreRounded />
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
      <AudioPlayer {...{ episode: podcastEpisodes[0] }} />
    </div>
  );
};

export default PodcastPreview;
