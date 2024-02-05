import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Header} from "./components/Header";
import  {UiContainer} from "./components/UiContainer";
const App = () => {
  const [searchData, setSearchData] = useState([]);

  const handleRefreshPage = (data) => {
    setSearchData(data.opportunities)
  };
  return (
    <>
    <Header handleRefreshPage={handleRefreshPage}/>
    <UiContainer searchData={searchData}/>
    </>
  );
};

export default App;

