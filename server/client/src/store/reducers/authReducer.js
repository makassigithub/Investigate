import { createAction, createReducer } from '@reduxjs/toolkit';

export const setIsAuthenticated = createAction('user/isAuthenticated');

const initialState = {
  isAuthenticated: false,
};

export const authReducer = createReducer(initialState, {
  [setIsAuthenticated]: (state, action) => {
    state.isAuthenticated = action.payload;
  },
});
