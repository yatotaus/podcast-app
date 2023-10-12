import React from "react";

//Import components
import Header from "./components/Header/Header";

const Content = ({ children, setSearchTerm, fetchOutput }) => {
  return (
    <>
      <Header {...{ setSearchTerm, fetchOutput }} />
      {children}
    </>
  );
};

export default Content;
