import { lazy } from 'react';

const AuthView = lazy(() => import('views/AuthView/AuthView'));
const DayReportView = lazy(() => import('views/DayReportView/DayReportView'));
const MonthReportView = lazy(() =>
  import('views/MonthReportView/MonthReportView'),
);

const defaultPath = '/';

const requireAuthPages = [
  {
    key: 'day-view',
    path: '/day-report',
    Component: DayReportView,
    exact: true,
    redirectTo: defaultPath,
  },
  {
    key: 'report-view',
    path: '/month-report',
    Component: MonthReportView,
    exact: true,
    redirectTo: defaultPath,
  },
];

const requireNotAuthPages = [
  {
    key: 'auth-view',
    path: defaultPath,
    Component: AuthView,
    exact: true,
    redirectTo: '/day-report',
  },
];

export { requireAuthPages, requireNotAuthPages, defaultPath };
export { default } from './Routes';
