import s from './ReportAmount.module.css';
import { useSelector } from 'react-redux';
import {
  getExpenseDataByCategoriesFromState,
  getIncomesDataByCategoriesFromState,
  getIsDataGettingByCategories,
} from 'redux/transaction';
import Spinner from 'components/Spinner';

const ReportAmount = () => {
  const getIncomesTransactions = useSelector(
    getIncomesDataByCategoriesFromState,
  );
  const getExpensesTransactions = useSelector(
    getExpenseDataByCategoriesFromState,
  );
  const gettingDataState = useSelector(getIsDataGettingByCategories);

  return gettingDataState ? (
    <Spinner />
  ) : (
    <section className={`${s.section} ${s.sectionReportAmount}`}>
      <ul className={s.reportAmount}>
        <li className={s.reportAmountItem}>
          <p className={s.amountCategory}>Расходы:</p>
          <span className={`${s.value} ${s.valueExpence}`}>
            -{getExpensesTransactions.expenseTotal.toLocaleString()}.00 грн.
          </span>
        </li>
        <li className={s.reportAmountItem}>
          <p className={s.amountCategory}>Доходы:</p>
          <span className={`${s.value} ${s.valueIncome}`}>
            +{getIncomesTransactions.incomeTotal.toLocaleString()}.00 грн.
          </span>
        </li>
      </ul>
    </section>
  );
};

export default ReportAmount;
