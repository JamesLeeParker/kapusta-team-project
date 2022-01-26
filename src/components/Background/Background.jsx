import s from './Background.module.css';
import BackgroundImageAuthPageTopPosition from 'components/BackgroundImageAuthPage/BackgroundImageAuthPageTopPosition';
import BackgroundImageAuthPageBotPosition from 'components/BackgroundImageAuthPage/BackgroundImageAuthPageBotPosition';
import BackgroundImageDayReportBotPosition from 'components/BackgroundImageDayReport/BackgroundImageDayReportBotPosition';
import BackgroundImageMonthReportBotPosition from 'components/BackgroundImageMonthReport/BackgroundImageMonthReportBotPosition';
import { useLocation } from 'react-router-dom';

const Background = () => {
  const loc = useLocation();
  return (
    <>
      <div className={s.background}>
        {loc.pathname === '/' && <BackgroundImageAuthPageTopPosition />}
      </div>
      {loc.pathname === '/' && <BackgroundImageAuthPageBotPosition />}

      {loc.pathname === '/day-report' && (
        <BackgroundImageDayReportBotPosition />
      )}
      {loc.pathname === '/month-report' && (
        <BackgroundImageMonthReportBotPosition />
      )}
    </>
  );
};

export default Background;
