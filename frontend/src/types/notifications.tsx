import { AppThunk } from "@/src/redux/store";
import { IconBulb, IconConfetti, IconExclamationCircle, IconInfoCircle, IconX } from "@tabler/icons-react";

// constants

const notificationTypes = {
    error: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info',
} as const;


const notificationIcons = {
    [notificationTypes.error]: <IconX className="alert-icon stroke-current" />,
    [notificationTypes.success]: <IconConfetti className="alert-icon stroke-current" />,
    [notificationTypes.warning]: <IconExclamationCircle className="alert-icon stroke-current" />,
    [notificationTypes.info]: <IconInfoCircle className="alert-icon stroke-current" />,
} as const;

const notificationTitles = {
    [notificationTypes.error]: 'Error',
    [notificationTypes.success]: 'Success',
    [notificationTypes.warning]: 'Warning',
    [notificationTypes.info]: 'Info',

} as const;

const notification = (type: NotificationType, opts: PretypedNotificationPayload) => ({
    title: opts.title || notificationTitles[type],
    type,
    icon: opts.icon || notificationIcons[type],
    duration: opts.duration,
    message: opts.message,
} as NotificationPayload)


export {
    notificationTypes,
    notificationIcons,
    notificationTitles,
    notification
}

// types

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    icon?: JSX.Element;
    title?: string;
    duration?: number;
};

type NotificationPayload = Omit<Notification, 'id'>;

type PretypedNotificationPayload = Omit<NotificationPayload, 'type'>;

interface NotificationState {
    notifications: Notification[];
    queue: Notification[];
    maxNotifications: number;
};

type NotificationType = typeof notificationTypes[keyof typeof notificationTypes];

type NotificationTypeNames = keyof typeof notificationTypes;

type NotificationThunks = Record<NotificationTypeNames, (opts: PretypedNotificationPayload) => AppThunk<void>>;


export type {
    Notification,
    NotificationPayload,
    NotificationState,
    NotificationType,
    NotificationTypeNames,
    NotificationThunks,
    PretypedNotificationPayload,
}