import s from './ReportIncomesList.module.css';
import sprite from '../icon.svg';
import category from './income.json';

const ReportIncomesList = ({
  setActiveCategory,
  activeCategory,
  incomData,
}) => {
  const hendleClick = (e, label) => {
    setActiveCategory(label);
  };

  return (
    <ul className={s.expenceReport}>
      {category.map(el => {
        if (incomData.incomesData[el.label] === undefined) {
          return;
        } else {
          return (
            <li
              onClick={e => hendleClick(e, el.label)}
              key={el.id}
              className={s.expenceReportItem}
            >
              <p className={s.expenceValue}>
                {incomData.incomesData[el.label].total.toFixed(2)}
              </p>
              <svg
                className={
                  activeCategory === el.label
                    ? s.expenceIconActive
                    : s.expenceIcon
                }
              >
                <use xlinkHref={`${sprite}#${el.label}`} />
              </svg>
              <p className={s.expenceCategory}>{el.label}</p>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default ReportIncomesList;
