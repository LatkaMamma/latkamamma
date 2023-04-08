import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";
import {
    notificationSlice,
    modalSlice,
    shopSlice,
} from './slices';

const makeStore = wrapMakeStore(() => configureStore({
    reducer: {
        [notificationSlice.name]: notificationSlice.reducer,
        [modalSlice.name]: modalSlice.reducer,
        [shopSlice.name]: shopSlice.reducer,
    },
    devTools: true,
    middleware: (gDM) =>
        gDM().prepend(
            nextReduxCookieMiddleware({
                subtrees: [
                    {
                        subtree: `${shopSlice.name}.cart`,
                        cookieName: "CART_ITEMS"
                    },
                    {
                        subtree: `${shopSlice.name}.products`,
                        cookieName: "PRODUCTS"
                    },
                    {
                        subtree: `${notificationSlice.name}.notifications`,
                        cookieName: "NOTIFICATIONS",
                    },
                    {
                        subtree: `${notificationSlice.name}.queue`,
                        cookieName: "NOTIFICATION_QUEUE",
                    },

                ]
            })
        )
}));

export const wrapper = createWrapper(makeStore, { debug: true });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;