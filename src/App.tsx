import React, { Fragment, useCallback, useState } from "react";
import "./App.css";
import Incomes from "./components/Incomes.tsx";
import Expenses from "./components/Expenses.tsx";
import Target from "./components/Target.tsx";
import Balance from "./components/Balance.tsx";

function App() {
  
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingAmount, setSavingAmount] = useState(0);

  const getTotalIncomes = useCallback((totalIncomes: number): void => {
    setTotalIncomes(totalIncomes)
  }, [totalIncomes])

  const getTotalExpenses = useCallback((totalExpenses: number): void => {
    setTotalExpenses(totalExpenses);
  }, [totalExpenses])

  const getSavingAmount = useCallback((savingAmount: number): void => {
    setSavingAmount(savingAmount);
  }, [savingAmount])


  const calcBalance = () =>
  {
    console.log("total income", totalIncomes, "total expenses", totalExpenses, "Saving", savingAmount);
    return totalIncomes - totalExpenses - savingAmount;
  };

  return (
    <Fragment>
      <Incomes setTotalIncomes={getTotalIncomes} />
      <Expenses setTotalExpenses={getTotalExpenses} />
      <Target savingAmount={savingAmount} />
      <Balance balance={calcBalance()} transferSaving={getSavingAmount} />
    </Fragment>
  );
}

export default App;
