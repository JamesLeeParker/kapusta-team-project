import s from './ReportBalance.module.css';
import { useSelector } from 'react-redux';
import { getBalance } from 'redux/user';

const ReportBalance = () => {
  const balance = useSelector(getBalance);

  return (
    <div className={s.balanceSection}>
      <h3 className={s.balanceTitle}>Баланс:</h3>
      <p className={s.balanceMain}>{balance} UAH</p>
    </div>
  );
};

export default ReportBalance;
