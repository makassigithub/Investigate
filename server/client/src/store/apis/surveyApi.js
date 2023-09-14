import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const surveyApi = createApi({
  reducerPath: 'surveys',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => {
    return {
      handleStripePayment: builder.mutation({
        query: (token) => ({
          url: '/stripe',
          body: {
            token,
          },
          method: 'POST',
        }),
      }),
      createSurvey: builder.mutation({
        query: (formObj) => ({
          url: '/survey',
          body: { ...formObj },
          method: 'POST',
        }),
      }),
    };
  },
});

export const { useHandleStripePaymentMutation, useCreateSurveyMutation } =
  surveyApi;
export { surveyApi };
