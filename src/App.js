import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Header} from "./components/Header";
import  {UiContainer} from "./components/UiContainer";
const App = () => {
  return (
    <>
    <Header/>
    <UiContainer />
    </>
  );
};

export default App;

