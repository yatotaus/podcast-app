import React from "react";
// Import material UI components
import { Button, Box } from "@mui/material";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";

import { useLocation, useNavigate } from "react-router-dom";

// Import CSS
import "./header.css";

const Header = ({ setSearchTerm, fetchOutput }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = "/preview";

  return (
    <Box>
      {location.pathname === pathname && (
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosNewTwoToneIcon />
        </Button>
      )}
      <input
        type="text"
        placeholder="Enter search term"
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <Button className="btn" onClick={() => fetchOutput()}>
        Search
      </Button>
    </Box>
  );
};

export default Header;
