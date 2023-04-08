import { useState, useCallback } from 'react';


type UseDisclosureCallbacks = {
    onOpen?: () => void;
    onClose?: () => void;
}

export function useDisclosure(initialValue?: boolean, callbacks?: UseDisclosureCallbacks) {
    const { onOpen, onClose } = callbacks || {};
    const [isOpen, setIsOpen] = useState(initialValue || false);

    const open = useCallback(() => {
        setIsOpen((isOpen) => {
            if (!isOpen) {
                onOpen?.();
                return true
            }
            return isOpen;
        });
    }, [onOpen]);

    const close = useCallback(() => {
        setIsOpen((isOpen) => {
            if (isOpen) {
                onClose?.();
                return false;
            }
            return isOpen;
        });
    }, [onClose]);

    const toggle = useCallback(() => {
        isOpen ? close() : open();
    }, [isOpen, open, close]);

    return [isOpen, {
        open,
        close,
        toggle,
    }]

}