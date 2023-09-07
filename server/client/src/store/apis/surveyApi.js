import { createApi } from '@reduxjs/toolkit/query/react';

const surveyApi = createApi({
  reducerPath: 'surveys',
  endpoints(builder) {
    return {};
  },
});

export { surveyApi };
