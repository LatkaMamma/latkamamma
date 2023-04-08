import { AddPayload } from '@apptypes/redux';
import Faker from '@util/faker';
import { Product } from '@prisma/client';
import { AppThunk, RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { v4 as uuidv4 } from "uuid";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker';

type CartState = {
    [id: string]: number;
}

type ProductState = {
    products: Product[];
    cart: CartState;
};

const initialState: ProductState = {
    products: [],
    cart: {},
};

// export const shopApi = createApi({
//     reducerPath: 'shopApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
//     endpoints: (builder) => ({
//         getProducts: builder.query<Product[], void>({
//             query: () => '/products',
//         }),
//         getProduct: builder.query<Product, string>({
//             query: (id) => `/products/${id}`,
//         }),
//         createProduct: builder.mutation<Product, AddPayload<Product>>({
//             query: (body) => ({
//                 url: '/products',
//                 method: 'POST',
//                 body,
//             }),
//         }),
//     }),
// });

// export const {
//     useGetProductsQuery,
//     useGetProductQuery,
//     useCreateProductMutation,
// } = shopApi;

// export default shopApi.reducer;

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        initialise: (state) => {
            if (state.products.length > 0) return;
            console.log('initialising shop');
            const faker = new Faker();
            state.products = faker.products;
        },
        addProduct: (state, action: PayloadAction<Omit<AddPayload<Product>, 'images'>>) => {
            const _faker = new Faker();
            state.products.push({
                ...action.payload,
                id: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date(),
                images: _faker.stuff(faker.image.imageUrl, 3)
            });
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex((product) => product.id === action.payload.id);
            if (index !== -1) state.products[index] = action.payload;
        },
        removeFromCart: (state, action: PayloadAction<{ id: string, amount: number }>) => {
            const { id, amount } = action.payload;
            if (state.cart[id]) {
                if (state.cart[id] - amount <= 0) delete state.cart[id];
                else state.cart[id] -= amount;
            }
        },
        clearCart: (state) => {
            state.cart = {};
        },
        addToCart: (state, action: PayloadAction<{ id: string, amount: number }>) => {
            const { id, amount } = action.payload;
            if (state.cart[id]) state.cart[id] += amount;
            else state.cart[id] = amount;
        }
    },
    extraReducers(builder) {
        builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
            HYDRATE,
            (state, { payload }) => ({ ...state, ...payload.shop })
        )
    }
});

export const {
    initialise,
    addProduct,
    removeProduct,
    updateProduct,
    addToCart,
    removeFromCart,
    clearCart,
} = shopSlice.actions;

export const selectProducts = (state: RootState) => state.shop.products;
export const selectCart = (state: RootState) => state.shop.cart;

/**
 * Increments item in cart by 1
 */
const incrementCart = (
    id: string
): AppThunk => (
    dispatch
) => dispatch(addToCart({ id, amount: 1 }));


/**
 * Decrements item in cart by 1
 */
const decrementCart = (
    id: string
): AppThunk => (
    dispatch
) => dispatch(removeFromCart({ id, amount: 1 }));

export const cartActions = {
    increment: incrementCart,
    decrement: decrementCart,
    clear: clearCart,
};


