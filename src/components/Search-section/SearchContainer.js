import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Import components
import PodcastList from "../PodcastList/PodcastList";
import Episode from "../Episode/Episode";

// Import CSS
import "./search-container.css";

const SearchContainer = ({ podcastUploaded }) => {
  const [podcastList, setPodcastList] = useState(podcastUploaded); // useState to save the list of podcasts

  useEffect(() => {
    setPodcastList(podcastUploaded);
  }, [podcastUploaded]);

  return (
    <div className="table">
      {podcastList?.podcasts?.length ? (
        <PodcastList>
          {podcastList?.podcasts?.map((item, id) => {
            return (
              <Link
                to={"/preview"}
                state={podcastList?.listEpisodes}
                style={{ display: "contents" }}
              >
                <Episode
                  {...{
                    episode: item,
                    id,
                  }}
                />
              </Link>
            );
          })}
        </PodcastList>
      ) : null}
    </div>
  );
};

export default SearchContainer;

SearchContainer.propTypes = {
  podcastUploaded: PropTypes.object,
};
