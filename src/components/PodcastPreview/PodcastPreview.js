import React from "react";
import { useLocation } from "react-router-dom";

//Import components
import Episode from "../Episode/Episode";
import PodcastList from "../PodcastList/PodcastList";

const PodcastPreview = () => {
  const location = useLocation();
  const podcastEpisodes = location.state;

  return (
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
  );
};

export default PodcastPreview;
