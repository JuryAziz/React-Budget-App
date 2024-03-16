import { Fragment, useCallback, useState } from 'react';

import Incomes from '../components/Incomes';
import Expenses from '../components/Expenses';
import Target from '../components/Target';
import Balance from '../components/Balance';

function BudgetApp() {

  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingAmount, setSavingAmount] = useState(0);

  const getTotalIncomes = useCallback(
    (totalIncomes: number): void => {
      setTotalIncomes(totalIncomes);
    },
    [totalIncomes]
  );

  const getTotalExpenses = useCallback(
    (totalExpenses: number): void => {
      setTotalExpenses(totalExpenses);
    },
    [totalExpenses]
  );

  const getSavingAmount = useCallback(
    (savingAmount: number): void => {
      setSavingAmount(savingAmount);
    },
    [savingAmount]
  );

  const calcBalance = () => {
    return totalIncomes - totalExpenses - savingAmount;
  };

  return (
    <Fragment>
      <Incomes setTotalIncomes={getTotalIncomes} />
      <Expenses setTotalExpenses={getTotalExpenses} />
      <Target
        savingAmount={savingAmount}
        setSavingAmount={getSavingAmount}
      />
      <Balance
        balance={calcBalance()}
        transferSaving={getSavingAmount}
      />
    </Fragment>
  );
}

export default BudgetApp;
