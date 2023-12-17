import { useState, useEffect } from "react";
 
export default function useDarkSide() {
    // useDarkSide.ts
    const [theme, setTheme] = useState(localStorage.theme || "light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === "dark" ? "light" : "dark");
        root.classList.add(theme);
    }, [theme]);

    return [theme, toggleTheme];
}