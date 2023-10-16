import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Import material UI components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import ScheduleIcon from "@mui/icons-material/Schedule";

const StyledTableCell = withStyles({
  root: {
    color: "#FFFFFF",
    opacity: "0.3",
    borderBottomColor: "rgb(211,211,211, 0.1)",
  },
})(TableCell);

const PodcastList = ({ children }) => {
  const location = useLocation();
  const pathname = "/preview";

  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Released</StyledTableCell>
            {location.pathname === pathname && (
              <StyledTableCell>
                <ScheduleIcon />
              </StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PodcastList;

PodcastList.propTypes = {
  children: PropTypes.element.isRequired,
};
