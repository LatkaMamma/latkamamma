import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeContext, ColorScheme, ColorSchemeProviderProps } from "./types";

export const colorSchemeContext = createContext<ColorSchemeContext>({
    colorScheme: "dark",
    setColorScheme: () => { },
    toggleColorScheme: () => { },
});

export function ColorSchemeProvider({ children, initialColorScheme = "dark" }: ColorSchemeProviderProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(initialColorScheme);
    const toggleColorScheme = () => {
        setColorScheme(prev => prev === "dark" ? "light" : "dark");
    };
    useEffect(() => {
        if(colorScheme === "dark") {
            document.querySelector("body")?.classList.add("dark");
        } else {
            document.querySelector("body")?.classList.remove("dark");
        }
    }, [colorScheme]);
    return (
        <colorSchemeContext.Provider value={{ colorScheme, setColorScheme, toggleColorScheme }}>
            {children}
        </colorSchemeContext.Provider>
    );
}

export function useColorScheme() {
    return useContext(colorSchemeContext);
}