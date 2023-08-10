import { browser } from "$app/environment";
import { useStorable } from "./use-shared-store";

// Dark Mode
export const useDarkMode = () => useStorable(
    'dark',
    browser && window.matchMedia('(prefers-color-scheme: dark)').matches
);

