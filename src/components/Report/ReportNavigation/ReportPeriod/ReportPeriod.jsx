import { useState, useEffect } from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import s from './ReportPeriod.module.css';

const ReportPeriod = ({ setPickedMonth, pickedMonth }) => {
  const [displayMonth, setDisplayMonth] = useState('');
  const [indexOfMonth, setIndexOfMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const arrOfMonthes = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];
  const currentDate = new Date(
    `${new Date().getFullYear()}-${`${new Date().getMonth() + 1}`.padStart(
      2,
      0,
    )}`,
  );

  const propedPickedDate = new Date(pickedMonth);

  useEffect(() => {
    const currentDate = `${arrOfMonthes[indexOfMonth]} ${currentYear}`;
    setDisplayMonth(currentDate);
    const propedMonth = `${indexOfMonth + 1}`;
    setPickedMonth(`${currentYear}-${propedMonth.padStart(2, 0)}`);
  }, [indexOfMonth]);

  const hendleDecrement = () => {
    if (indexOfMonth === 0) {
      setIndexOfMonth(11);
      setCurrentYear(currentYear - 1);
      return;
    }
    setIndexOfMonth(indexOfMonth - 1);
  };
  const hendleIncrement = () => {
    if (indexOfMonth === 11) {
      setIndexOfMonth(0);
      setCurrentYear(currentYear + 1);
      return;
    }
    setIndexOfMonth(indexOfMonth + 1);
  };

  return (
    <div className={s.periodSection}>
      <p className={s.periodTitle}>Текущий период:</p>
      <span className={s.navReport}>
        <ArrowBackIos
          onClick={hendleDecrement}
          style={{ height: '12px', fill: '#FF751D', cursor: 'pointer' }}
        />
        <span className={s.reportDate}>{displayMonth}</span>
        {propedPickedDate.getTime() !== currentDate.getTime() && (
          <ArrowForwardIos
            onClick={hendleIncrement}
            style={{ height: '12px', fill: '#FF751D', cursor: 'pointer' }}
          />
        )}
      </span>
    </div>
  );
};

export default ReportPeriod;
