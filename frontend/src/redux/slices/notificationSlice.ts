import { AppThunk, RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { v4 as uuidv4 } from "uuid";
import {
    NotificationPayload,
    NotificationState,
    Notification,
    notification,
    NotificationThunks,
    notificationTypes,
    NotificationType,
    PretypedNotificationPayload,
    notificationTitles,
    notificationIcons
} from '@apptypes/notifications';
const initialState: NotificationState = {
    notifications: [],
    queue: [],
    maxNotifications: 3,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            if (state.notifications.length >= state.maxNotifications) {
                state.queue.push(action.payload);
            } else {
                state.notifications.push(action.payload);
            }
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            const notification = state.queue.shift()
            const newState = state.notifications.filter((notification) => notification.id !== action.payload)
            if (notification) {
                newState.push(notification);
            }
            state.notifications = newState;
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
        setMaxNotifications: (state, action: PayloadAction<number>) => {
            state.maxNotifications = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
            HYDRATE,
            (state, { payload }) => ({ ...state, ...payload.notification })
        )
    }
});

export const {
    addNotification,
    removeNotification,
    clearNotifications,
    setMaxNotifications,
} = notificationSlice.actions;

/**
 * converts durations of different formats to milliseconds
 * @param duration duration in seconds, milliseconds, or tenths of a second
 * @returns duration in milliseconds
 */
export const formatDuration = (duration: number): number => {
    if (duration <= 10) return duration * 1000;
    if (duration <= 100) return duration * 100;
    if (duration <= 1000) return duration * 10;
    return duration;
}

export const createNotification = (type: NotificationType, payload: PretypedNotificationPayload): AppThunk => (dispatch) => {
    const notification: Notification = {
        type,
        title: payload.title || notificationTitles[type],
        icon: payload.icon || notificationIcons[type],
        duration: payload.duration,
        message: payload.message,
        id: uuidv4(),
    }
    dispatch(addNotification(notification));
    if (payload.duration) {
        setTimeout(() => {
            dispatch(removeNotification(notification.id));
        }, formatDuration(payload.duration));
    }
}

export const notifications: NotificationThunks = {
    success: (opts) => createNotification(notificationTypes.success, opts),
    error: (opts) => createNotification(notificationTypes.error, opts),
    info: (opts) => createNotification(notificationTypes.info, opts),
    warning: (opts) => createNotification(notificationTypes.warning, opts),
}