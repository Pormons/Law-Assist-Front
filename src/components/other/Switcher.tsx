import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "./useDarkSide";

export default function Switcher() {
    const [theme, toggleTheme] = useDarkSide();

    useEffect(() => {
        // Force re-render when the theme changes
    }, [theme]);

    return (
        <DarkModeSwitch
            style={{ marginBottom: "2rem" }}
            checked={theme === "dark"}
            onChange={toggleTheme}
            size={30}
        />
    );
}