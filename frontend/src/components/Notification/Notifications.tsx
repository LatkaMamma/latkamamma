import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { removeNotification, clearNotifications } from "@/src/redux/features/notifications";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { useState } from 'react';
import Alert from './Alert';

export const ANIMATE = { opacity: 1, scale: 1 };
export const INITIAL = { opacity: 0, scale: 0.3 };
export const EXIT = { opacity: 0, scale: 0.5, transition: { duration: 0.2 } };

export default function Notifications() {
    const { notifications} = useAppSelector(state => state.notification);
    const dispatch = useAppDispatch();
    // const xOffset = isCenter ? { x: "-50%" } : {};
    const animations = {
        animate: { ...ANIMATE, y: 0 },
        initial: { ...INITIAL, y: 50 },
        exit: { ...EXIT },
    } as AnimationProps;
    // const containerAnimations = {
    //     initial: { ...animations.initial as any, ...xOffset },
    //     animate: { ...animations.animate as any, ...xOffset },
    //     exit: { ...animations.exit as any, ...xOffset },
    // } as AnimationProps;

    const handleRemoveNotification = (id: string) => {
        dispatch(removeNotification(id));
    }
    const handleClearNotifications = () => {
        dispatch(clearNotifications());
    }
    return (

        <div
            className={`toast toast-end`}
        >
            <AnimatePresence
                initial={false}
            >
                {notifications.map(val => (
                    <Alert
                    key={val.id}
                    {...val}
                    animations={animations}
                    handleRemoveNotification={handleRemoveNotification} />
                ))}
            </AnimatePresence>
        </div>
    )
}