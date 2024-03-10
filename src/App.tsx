import React, { Fragment, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Income from "./components/Income.tsx";
import Expense from "./components/Expense.tsx";
import Target from "./components/Target.tsx";

function App() {
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [targetSaving, setTargetSaving] = useState(0);

  const calcBalance = ()=> {
    return(totalIncomes - totalExpenses - targetSaving);
  };
  return (
    <Fragment>
      <Income />
      <Expense />
      {/* <Target /> */}
    </Fragment>
  );
}

export default App;

/*
 ? get Income - Expense - Saving = Balance
 */
