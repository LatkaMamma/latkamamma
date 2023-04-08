import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export type ColorScheme = 'light' | 'dark';

export interface UseColorSchemeProps {
    useLocalStorage?: boolean;
    defaultColorScheme?: ColorScheme;
    usePrefersColorScheme?: boolean;
}

export const useColorScheme = (
    {
        useLocalStorage = true,
        defaultColorScheme = 'dark',
        usePrefersColorScheme = true
    }: UseColorSchemeProps = {}
) => {
    const [colorScheme, _setColorScheme] = useState<ColorScheme>(defaultColorScheme);

    const setColorsScheme = useCallback((colorScheme: ColorScheme) => {
        _setColorScheme(colorScheme);
        document.documentElement.setAttribute('data-theme', colorScheme);
        if (useLocalStorage) {
            localStorage.setItem('theme', colorScheme);
        }
    }, [useLocalStorage]);

    const toggleColorScheme = useCallback(() => {
        const newColor = colorScheme === 'light' ? 'dark' : 'light';
        setColorsScheme(newColor);
    }, [colorScheme, setColorsScheme]);

    useEffect(() => {
        const localTheme = useLocalStorage && localStorage.getItem('theme');
        if (localTheme) {
            setColorsScheme(localTheme as ColorScheme);
        } else if (usePrefersColorScheme) {
            const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setColorsScheme(userPrefersDark ? 'dark' : 'light');
        } else {
            setColorsScheme(defaultColorScheme);
        }
    }, [useLocalStorage, usePrefersColorScheme, defaultColorScheme, setColorsScheme]);

    return [colorScheme, setColorsScheme, toggleColorScheme] as const;

}