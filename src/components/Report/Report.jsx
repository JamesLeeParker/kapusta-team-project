import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReportExpencesList from './ReportExpencesList/ReportExpencesList';
import ReportIncomesList from './ReportIncomesList/ReportIncomesList';
import s from './Report.module.css';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import {
  getExpenseDataByCategoriesFromState,
  getIncomesDataByCategoriesFromState,
  getIsDataGettingByCategories,
} from 'redux/transaction';
import Spinner from 'components/Spinner';
import ChartComp from 'components/Chart/Chart';

const Report = () => {
  const [isExpenses, setIsExpenses] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const incomData = useSelector(getIncomesDataByCategoriesFromState);
  const expData = useSelector(getExpenseDataByCategoriesFromState);
  const isDataGettingByCategories = useSelector(getIsDataGettingByCategories);
  const startData = isExpenses ? expData.expensesData : incomData.incomesData;
  const [chartData, setChartData] = useState(startData);

  useEffect(() => {
    if (!activeCategory) return;
    setChartData(
      isExpenses
        ? expData?.expensesData[activeCategory]
        : incomData?.incomesData[activeCategory],
    );
  }, [activeCategory, isExpenses]);

  useEffect(() => {
    if (activeCategory) return;
    setChartData(isExpenses ? expData.expensesData : incomData.incomesData);
  }, [isExpenses, activeCategory]);

  const hendeleClickOnArrow = () => {
    setActiveCategory('');
    setIsExpenses(!isExpenses);
  };

  return isDataGettingByCategories ? (
    <Spinner />
  ) : (
    <>
      <div className={s.reportMain}>
        <div className={s.reportNav}>
          <ArrowBackIos
            style={{ height: '14px' }}
            className={s.reportArrow}
            onClick={hendeleClickOnArrow}
          />
          <span className={s.reportTitle}>
            {isExpenses ? 'Расходы' : 'Доходы'}
          </span>
          <ArrowForwardIos
            style={{ height: '14px' }}
            className={s.reportArrow}
            onClick={hendeleClickOnArrow}
          />
        </div>
        {isExpenses ? (
          <ReportExpencesList
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            expData={expData}
          />
        ) : (
          <ReportIncomesList
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            incomData={incomData}
          />
        )}
      </div>
      <div className={s.reportMain}>
        {isDataGettingByCategories ? (
          <Spinner />
        ) : (
          <ChartComp chartData={chartData} activeCategory={activeCategory} />
        )}
      </div>
    </>
  );
};

export default Report;
