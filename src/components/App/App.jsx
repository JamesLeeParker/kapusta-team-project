import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  refresh,
  getIsLoggedIn,
  getIsRefreshing,
  setTokens,
  logOut,
  getAccessToken,
} from 'redux/auth';
import Routes from 'routes';
import Container from 'components/Container';
import Header from 'components/Header';
import Spinner from 'components/Spinner';
import Modal from 'components/Modal/Modal';
import ConfirmModal from 'components/ConfirmModal';
import {
  closeModal,
  getDeleteId,
  getIsDeleteOpenModal,
  getIsLogoutOpenModal,
} from 'redux/modal';
import {
  getMonthStatsExpenses,
  getMonthStatsIncomes,
  removeTransaction,
} from 'redux/transaction';
import Background from 'components/Background';
import s from './App.module.css';
import { fetchUser, resetUserState } from 'redux/user';
import { resetTransactionState } from 'redux/transaction';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const incomes = useSelector(getMonthStatsIncomes);
  const expenses = useSelector(getMonthStatsExpenses);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  const currentToken = useSelector(getAccessToken);
  const deleteId = useSelector(getDeleteId);
  const isLogoutModalOpen = useSelector(getIsLogoutOpenModal);
  const isDeleteModalOpen = useSelector(getIsDeleteOpenModal);
  const isModalOpen = isLogoutModalOpen || isDeleteModalOpen;

  const onDelete = () => {
    dispatch(removeTransaction(deleteId));
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  const getGoogleAuthData = key =>
    new URLSearchParams(location.search).get(key);

  const accessToken = getGoogleAuthData('accessToken');
  const refreshToken = getGoogleAuthData('refreshToken');
  const sid = getGoogleAuthData('sid');

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(resetTransactionState());
      dispatch(resetUserState());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentToken) {
      dispatch(fetchUser());
    }
  }, [dispatch, currentToken, incomes, expenses]);

  useEffect(() => {
    if (isLoggedIn && !accessToken) {
      dispatch(refresh());
    }
  }, [isLoggedIn, dispatch, accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(setTokens({ accessToken, refreshToken, sid }));
  }, [accessToken, dispatch, refreshToken, sid]);

  return (
    <>
      <header>
        <Container>
          <Header />
        </Container>
      </header>
      <main className={s.app}>
        <Background />
        <Container>
          {isRefreshing ? <Spinner /> : <Routes isLoggedIn={isLoggedIn} />}
        </Container>
        {isModalOpen && (
          <Modal
            onClose={() => {
              dispatch(closeModal());
            }}
          >
            <ConfirmModal
              onClose={() => {
                dispatch(closeModal());
              }}
              question={
                isLogoutModalOpen
                  ? 'Вы действительно хотите выйти?'
                  : 'Вы уверены?'
              }
              onConfirm={() => (isLogoutModalOpen ? onLogOut() : onDelete())}
            />
          </Modal>
        )}
      </main>
    </>
  );
};

export default App;
