import { useEffect, useRef, useCallback } from 'react';

export const useClickedOutside = (setDropdownVisible: (state: boolean) => void) => {
    const ref = useRef<null | HTMLElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (!ref.current) { return; }

        const clickedOutside = !ref.current.contains(event.target as HTMLElement);

        if (!clickedOutside) { return; }

        setDropdownVisible(false);
    }, [setDropdownVisible]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside]);

    return { ref };
}