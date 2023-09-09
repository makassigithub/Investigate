import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './apis/authApi';
import { surveyApi } from './apis/surveyApi';

import { authReducer } from './reducers/authReducer';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [surveyApi.reducerPath]: surveyApi.reducer,
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(surveyApi.middleware),
});

setupListeners(store.dispatch);

export * from './apis/authApi';
export * from './apis/surveyApi';
