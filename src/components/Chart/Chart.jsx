import { useMediaQuery } from 'react-responsive';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import s from './Chart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function ChartComp({ chartData, activeCategory }) {
  console.time();
  const chooseBgColor = arr => {
    return arr.map((_, index) => (index % 3 === 0 ? '#FF751D' : '#FFDAC0'));
  };
  const { total, ...gettingData } = chartData === undefined ? {} : chartData;
  const arrForSort = Object.entries(gettingData);
  const sortedData = [...arrForSort].sort((a, b) =>
    activeCategory ? b[1] - a[1] : b[1].total - a[1].total,
  );
  const incomeData = sortedData.map(property =>
    activeCategory ? property[1] : property[1].total,
  );
  const labels = sortedData.map(property => property[0]);
  console.timeEnd();
  const isBreakPointToPhoneScreen = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const breakPointBetweenMobAndTab = useMediaQuery({
    query: '(max-width: 500px)',
  });

  const getMaxValueFromData = dataArr => {
    let maxValue = 0;
    dataArr.forEach(value => {
      if (maxValue < value) maxValue = value;
    });
    return maxValue;
  };

  const maxValueOfScaleY =
    getMaxValueFromData(incomeData) + getMaxValueFromData(incomeData) * 0.4;

  const options = {
    responsive: true,
    aspectRatio: isBreakPointToPhoneScreen ? 0.8 : 2,
    plugins: {
      datalabels: {
        color: '#52555F',
        align: isBreakPointToPhoneScreen ? 'right' : 'top',
        anchor: isBreakPointToPhoneScreen ? 'start' : 'end',
        padding: {
          top: isBreakPointToPhoneScreen ? -30 : 30,
          right: 10,
          bottom: 0,
        },
        formatter: function (value) {
          return value + 'грн';
        },
      },
    },
    indexAxis: isBreakPointToPhoneScreen ? 'y' : 'x',

    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          LayoutPosition: 'top',
          display: !isBreakPointToPhoneScreen,
        },
      },
      y: {
        max: maxValueOfScaleY,
        grid: {
          display: !isBreakPointToPhoneScreen,
          drawBorder: false,
        },

        ticks: {
          LayoutPosition: 'top',
          display: isBreakPointToPhoneScreen,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: incomeData,
        maxBarThickness: isBreakPointToPhoneScreen ? 20 : 30,
        backgroundColor: chooseBgColor(labels),
        borderRadius: 10,
        inflateAmount: isBreakPointToPhoneScreen ? 2 : 10,
      },
    ],
  };

  return (
    <div className={s.barWrapper}>
      <Bar options={options} data={data} plugins={[ChartDataLabels]} />
    </div>
  );
}
