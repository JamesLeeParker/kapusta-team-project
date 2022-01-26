import s from './Summary.module.css';
import PropTypes from 'prop-types';
import {
  getMonthStatsIncomes,
  getMonthStatsExpenses,
  getIsIncomeLoading,
  getIsExpenseLoading,
  getIsIncomeAdding,
  getIsExpenseAdding,
  getIsRemoving,
} from 'redux/transaction/selectors';
import { useSelector } from 'react-redux';
import Spinner from 'components/Spinner';

const Summary = ({ transactionsType }) => {
  const monthStatsIncomes = useSelector(getMonthStatsIncomes);
  const monthStatsExpenses = useSelector(getMonthStatsExpenses);
  const isIncomeLoading = useSelector(getIsIncomeLoading);
  const isExpenseLoading = useSelector(getIsExpenseLoading);
  const isIncomeAdding = useSelector(getIsIncomeAdding);
  const isExpenseAdding = useSelector(getIsExpenseAdding);
  const isRemoving = useSelector(getIsRemoving);

  const isLoadingIncome = isIncomeLoading && isIncomeAdding;
  const isLoadingExpense = isExpenseLoading && isExpenseAdding;
  const isLoading =
    transactionsType === 'incomes' ? isLoadingIncome : isLoadingExpense;

  const data =
    transactionsType === 'incomes' ? monthStatsIncomes : monthStatsExpenses;

  return (
    <div className={s.section}>
      <h3 className={s.title}>Сводка</h3>
      {(isLoading || isRemoving) && <Spinner />}
      <ul className={s.list}>
        {!isLoading && !isRemoving && (
          <>
            {Object.entries(data)
              .filter(([key, value]) => value !== 'N/A')
              .map(([key, value]) => (
                <li className={s.item} key={key}>
                  <span className={s.itemMonthSum}>{key}</span>
                  <span className={s.itemMonthSum}>{value}</span>
                </li>
              ))}
          </>
        )}
      </ul>
    </div>
  );
};

Summary.propTypes = {
  transactionsType: PropTypes.oneOf(['expenses', 'incomes']),
};

export default Summary;
