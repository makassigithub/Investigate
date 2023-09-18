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
      fetchUserSurveys: builder.query({
        query: () => ({
          url: '/surveys',
          method: 'GET',
        }),
      }),
    };
  },
});

export const {
  useHandleStripePaymentMutation,
  useCreateSurveyMutation,
  useFetchUserSurveysQuery,
} = surveyApi;
export { surveyApi };
