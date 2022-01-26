import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Report from 'components/Report/Report';
import ReportAmount from 'components/Report/ReportAmount/ReportAmount';
import {
  fetchDataByCategories,
  getIsDataGettingByCategories,
} from 'redux/transaction';
import ReportNavigation from 'components/Report/ReportNavigation/ReportNavigation';
import Spinner from 'components/Spinner';

const MonthReportView = () => {
  const dispatch = useDispatch();
  const memoizedDate = useMemo(() => {
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, 0);
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${currentMonth}`;
  });
  const [pickedMonth, setPickedMonth] = useState(memoizedDate);
  const isDataGettingByCategories = useSelector(getIsDataGettingByCategories);
  useEffect(() => {
    dispatch(fetchDataByCategories(pickedMonth));
  }, [pickedMonth]);

  return (
    <>
      <ReportNavigation
        pickedMonth={pickedMonth}
        setPickedMonth={setPickedMonth}
      />

      {isDataGettingByCategories ? (
        <Spinner />
      ) : (
        <>
          <ReportAmount />
          <Report />
        </>
      )}
    </>
  );
};

MonthReportView.propTypes = {};

export default MonthReportView;
