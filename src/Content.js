import React from "react";
import PropTypes from "prop-types";

//Import components
import Header from "./components/Header/Header";

const Content = ({ children, fetchOutput, setSearchTerm }) => {
  return (
    <>
      <Header {...{ fetchOutput, setSearchTerm }} />
      {children}
    </>
  );
};

export default Content;

Content.propTypes = {
  children: PropTypes.element.isRequired,
  fetchOutput: PropTypes.func,
  setSearchTerm: PropTypes.func,
};
