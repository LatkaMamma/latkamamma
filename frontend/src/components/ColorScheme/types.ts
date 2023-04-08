export interface ColorSchemeContext {
    colorScheme: ColorScheme;
    setColorScheme: (colorScheme: ColorScheme) => void;
    toggleColorScheme: () => void;
}

export type ColorScheme = 'light' | 'dark';

export interface ColorSchemeProviderProps {
    children: React.ReactNode | React.ReactNode[];
    initialColorScheme?: ColorScheme;
}