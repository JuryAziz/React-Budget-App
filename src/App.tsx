import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import Income from "./Income.tsx";
import Expense from "./Expense.tsx";

function App() {
  return (
    <Fragment>
      <Income />
      <Expense />
    </Fragment>
  );
}

export default App;
