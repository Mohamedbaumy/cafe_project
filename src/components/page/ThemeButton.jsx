import useStore from "@/store";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

const ThemeButton = () => {
  const { darkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    if (Boolean(darkMode)) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  // useEffect

  const toggleThemeMode = () => {
    toggleDarkMode();
  };

  return (
    <button type="button" onClick={toggleThemeMode} className="cursor-pointer">
      <Icon
        icon={darkMode ? "bi:sun" : "eva:moon-fill"}
        className="h-full w-full p-2 text-2xl"
      />
    </button>
  );
};

export default ThemeButton;
