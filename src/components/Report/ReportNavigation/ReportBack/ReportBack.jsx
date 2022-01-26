import WestIcon from '@mui/icons-material/West';
import { useState } from 'react';
import { useWindowSize } from 'react-use-size';
import s from './ReportBack.module.css';
import { Link } from 'react-router-dom';

const ReportBack = () => {

  const {width} = useWindowSize();


  return (
    <div className={s.reportBack}>
      <Link to={'/day-report'} className={s.goToReport} style={{}}>
        <WestIcon
          className={s.westIcon}
          style={{ heigth: '24px', fill: '#FF751D' }}
        />
        {width > 767 ? (
          <span className={s.backTitle}>Вернуться на главную</span>
        ) : (
          ''
        )}
      </Link>
    </div>
  );
};

export default ReportBack;
