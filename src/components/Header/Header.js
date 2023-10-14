import React from "react";
import PropTypes from "prop-types";
// Import material UI components
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useLocation, useNavigate } from "react-router-dom";

// Import CSS
import "./header.css";

const Header = ({ setSearchTerm, fetchOutput }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = "/preview";

  return (
    <Box sx={{ display: "flex" }}>
      {location.pathname === pathname && (
        <Button
          sx={{
            background: "#1A1A1A",
            borderRadius: "15px",
            height: "55px",
            width: "50px",
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosNewTwoToneIcon sx={{ color: "#FFFFFF" }} />
        </Button>
      )}

      <TextField
        sx={{
          background: "#1A1A1A",
          borderRadius: "15px",
          input: { color: "#FFFFFF", opacity: "0.4" },
          marginLeft: "10px",
          width: "60em",
        }}
        placeholder="podcast"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchRoundedIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Button className="btn" onClick={() => fetchOutput()}>
        Search
      </Button>
    </Box>
  );
};

export default Header;

Header.propTypes = {
  setSearchTerm: PropTypes.func,
  fetchOutput: PropTypes.func,
};
