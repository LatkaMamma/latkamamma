import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppThunk, RootState } from '../store';

export type Locale = 'en' | 'fi' | 'sv';

export interface Modal {
    id: string;
    title: string;
    content: React.ReactNode;
}

export interface ModalState {
    openModal?: Modal;
    queuedModals: Modal[];
}

const initialState: ModalState = {
    queuedModals: []
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Modal & { queue?: boolean; prioritise?: boolean }>) => {
            const { queue = false, prioritise = false, ...modal } = action.payload;
            if (queue && state.openModal) {
                if (prioritise) {
                    state.queuedModals.unshift(modal);
                } else {
                    state.queuedModals.push(modal);
                }
            } else {
                state.openModal = modal;
            }
        },
        closeModal: (state) => {
            if (state.queuedModals.length > 0) {
                state.openModal = state.queuedModals.shift();
            } else {
                state.openModal = undefined;
            }
        }
    },
    extraReducers(builder) {
        builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
            HYDRATE,
            (state, { payload }) => ({ ...state, ...payload.modal })
        )
    }
});

export const { openModal, closeModal } = modalSlice.actions;