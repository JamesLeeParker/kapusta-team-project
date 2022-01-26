import s from './IncomesExpenseList.module.css';
import PropTypes from 'prop-types';
import IncomesExpenseListItem from 'components/IncomesExpenseListItem';
import {
  getIsIncomeLoading,
  getIsExpenseLoading,
  getIsIncomeAdding,
  getIsExpenseAdding,
  getIsRemoving,
} from 'redux/transaction/selectors';
import Spinner from 'components/Spinner';
import { useSelector } from 'react-redux';

const IncomesExpenseList = ({
  transactions,
  transactionsType,
  operationSign,
}) => {
  const isIncomeLoading = useSelector(getIsIncomeLoading);
  const isExpenseLoading = useSelector(getIsExpenseLoading);
  const isIncomeAdding = useSelector(getIsIncomeAdding);
  const isExpenseAdding = useSelector(getIsExpenseAdding);
  const isRemoving = useSelector(getIsRemoving);

  const isLoadingIncome = isIncomeLoading && isIncomeAdding;
  const isLoadingExpense = isExpenseLoading && isExpenseAdding;
  const isLoading =
    transactionsType === 'incomes' ? isLoadingIncome : isLoadingExpense;

  return (
    <>
      <div className={s.list}>
        <ul className={s.header}>
          <li className={s.date}>Дата</li>
          <li className={s.description}>Описание</li>
          <li className={s.category}>Категория</li>
          <li className={s.amount}>Сумма</li>
        </ul>
        {(isLoading || isRemoving) && <Spinner />}

        {!isLoading && !isRemoving && (
          <>
            {transactions.length > 0 ? (
              <ul className={s.transactionsList}>
                {transactions &&
                  transactions.map(item => (
                    <IncomesExpenseListItem
                      key={item._id}
                      itemProps={item}
                      transactionsType={transactionsType}
                      operationSign={operationSign}
                    />
                  ))}
              </ul>
            ) : (
              <ul className={s.ulPlaceholder}></ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

IncomesExpenseList.propTypes = {
  transactions: PropTypes.array,
  transactionsType: PropTypes.string,
  operationSign: PropTypes.string,
};

export default IncomesExpenseList;
