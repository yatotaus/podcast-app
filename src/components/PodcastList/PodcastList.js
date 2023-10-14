import React from "react";
import { useLocation } from "react-router-dom";

// Import material UI components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";

const PodcastList = ({ children }) => {
  const location = useLocation();
  const pathname = "/preview";

  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Released</TableCell>
            {location.pathname === pathname && (
              <TableCell>
                <ScheduleIcon />
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PodcastList;
