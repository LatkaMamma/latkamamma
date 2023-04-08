import { useCallback, useEffect, useRef, useState } from "react";

export type UseFullscreenOptions = {
    callbacks?: {
        onChange?: (fullscreen: boolean) => void;
        onEnter?: () => void;
        onExit?: () => void;
    }
    eventKeys?: {
        enterFullscreen?: string[];
        exitFullscreen?: string[];
        toggleFullscreen?: string[];
    }
};

export function useFullscreen<T extends HTMLElement = any>(
    options?: UseFullscreenOptions,
) {
    const { callbacks, eventKeys } = options || {};

    const [fullscreen, setFullscreen] = useState(false);
    const ref = useRef<T | null>(null);
    const setRef = useCallback((element: T | null) => {
        if (element) {
            ref.current = element;
        }
    }, []);
    useEffect(() => {
        const prefixes = ['', 'webkit', 'moz', 'ms'];
        const onFullscreenChange = () => {
            setFullscreen(Boolean(document.fullscreenElement));
        };
        const onFullScreenError = (event: Event) => {
            setFullscreen(false);
            console.error(`Error attempting full-screen method: ${event} (${event.target})`);
        };
        prefixes.forEach((prefix) => {
            document.addEventListener(`${prefix}fullscreenchange`, onFullscreenChange);
            document.addEventListener(`${prefix}fullscreenerror`, onFullScreenError);
        });
        return () => {
            prefixes.forEach((prefix) => {
                document.removeEventListener(`${prefix}fullscreenchange`, onFullscreenChange);
                document.removeEventListener(`${prefix}fullscreenerror`, onFullScreenError);
            });
        };
    }, []);
    const exitHandler = useCallback(() => {
        const _document = window.document as any;
        const { onChange, onExit } = callbacks || {};
        (
            (onExit?.()) ||
            (onChange?.(false))
        );
        (
            (typeof _document.exitFullscreen === 'function' && _document.exitFullscreen()) ||
            (typeof _document.msExitFullscreen === 'function' && _document.msExitFullscreen()) ||
            (typeof _document.webkitExitFullscreen === 'function' && _document.webkitExitFullscreen()) ||
            (typeof _document.mozCancelFullScreen === 'function' && _document.mozCancelFullScreen())
        )
    }, [callbacks]);

    const enterHandler = useCallback(() => {
        const element = (ref.current ? ref.current : document.documentElement) as any;
        const { onChange, onEnter } = callbacks || {};
        (
            (onEnter?.()) ||
            (onChange?.(true))
        );
        (
            (element.requestFullscreen?.()) ||
            (element.msRequestFullscreen?.()) ||
            (element.webkitEnterFullscreen?.()) ||
            (element.webkitRequestFullscreen?.()) ||
            (element.mozRequestFullscreen?.())
        );
    }, [callbacks]);
    const toggle = useCallback(() => {
        fullscreen ? exitHandler() : enterHandler();
    }, [fullscreen, enterHandler, exitHandler]);

    useEffect(() => {
        const { enterFullscreen, exitFullscreen, toggleFullscreen } = eventKeys || {};
        const onKeydown = (event: KeyboardEvent) => {
            if (enterFullscreen?.includes(event.key)) enterHandler();
            else if (exitFullscreen?.includes(event.key)) exitHandler();
            else if (toggleFullscreen?.includes(event.key)) toggle();
        }
        if (eventKeys) document.addEventListener('keydown', onKeydown);

        return () => {
            document.removeEventListener('keydown', onKeydown);
        }
    }, [eventKeys, fullscreen, exitHandler, enterHandler, toggle]);


    return {
        ref: setRef,
        toggle,
        fullscreen,
    } as const;
}