import React, { Fragment, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Income from "./components/Income.tsx";
import Expense from "./components/Expense.tsx";
import Target from "./components/Target.tsx";
import Balance from "./components/Balance.tsx";

function App() {
  
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingAmount, setSavingAmount] = useState(0);

  const getTotalIncomes = (totalIncomes: number): void => {
    setTotalIncomes(totalIncomes);
  };

  const getTotalExpenses = (totalExpenses: number): void => {
    setTotalExpenses(totalExpenses);
  };

  const getSavingAmount = (savingAmount: number): void => {
    setSavingAmount(savingAmount);
  };


  const calcBalance = () =>
  {
    console.log("total income", totalIncomes, "total expenses", totalExpenses, "Saving", savingAmount);
    return totalIncomes - totalExpenses - savingAmount;
  };

  return (
    <Fragment>
      <Income setTotalIncomes={getTotalIncomes} />
      <Expense setTotalExpenses={getTotalExpenses} />
      <Target savingAmount={savingAmount} />
      <Balance balance={calcBalance()} transferSaving={getSavingAmount} />
    </Fragment>
  );
}

export default App;
