import { api } from '@/redux/api/apiSlice';

const productEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: '/products' }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({ url: `/products/${id}` }),
    }),
    getComments: builder.query({
      query: (id) => ({ url: `/comments?productID=${id}` }),
      providesTags: ['comments'],
    }),
    postComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCommentsQuery,
  useGetSingleProductQuery,
  usePostCommentMutation,
} = productEndpoints;
