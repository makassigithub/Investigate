import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints(builder) {
    return {
      fetchCurrentUser: builder.query({
        query: (googleId) => {
          return {
            url: '/current_user',
            params: {
              googleId,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchCurrentUserQuery } = authApi;
export { authApi };
