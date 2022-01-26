import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogoutOpenModal: false,
  isDeleteOpenModal: false,
  deleteId: null,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: state => {
      state.isLogoutOpenModal = false;
      state.isDeleteOpenModal = false;
    },
    openLogoutModal: state => {
      state.isLogoutOpenModal = true;
    },
    openDeleteModal: (state, { payload }) => {
      state.isDeleteOpenModal = true;
      state.deleteId = payload;
    },
  },
});

export const { openLogoutModal, openDeleteModal, closeModal } = slice.actions;
export const { reducer: modalReducer } = slice;
