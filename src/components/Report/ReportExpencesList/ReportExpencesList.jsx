import sprite from '../icon.svg';
import category from './expence.json';
import s from './ReportExpencesList.module.css';

const ReportExpencesList = ({ setActiveCategory, activeCategory, expData }) => {
  const hendleClick = (e, label) => {
    setActiveCategory(label);
  };

  return (
    <ul className={s.expenceReport}>
      {category.map(el => {
        if (expData.expensesData[el.label] === undefined) {
          return;
        } else {
          return (
            <li
              onClick={e => hendleClick(e, el.label)}
              key={el.id}
              className={s.expenceReportItem}
            >
              <p className={s.expenceValue}>
                {expData.expensesData[el.label].total.toFixed(2)}
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

export default ReportExpencesList;
