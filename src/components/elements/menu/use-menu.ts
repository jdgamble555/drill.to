import { useSharedStore } from "$lib/use-shared-store";
import { writable } from "svelte/store";

const _useMenu = () => {

    const { set, update, subscribe } = writable<{ ref?: HTMLElement, isOpen: boolean }>({ isOpen: false });

    return {
        subscribe,
        set,
        update,
        close: () => update(({ ref }) => ({ ref, isOpen: false })),
        open: () => update(({ ref }) => ({ ref, isOpen: true })),
        toggle: () => update(({ ref, isOpen }) => ({ ref, isOpen: !isOpen }))
    }
};

// readable store context
export const useMenu = (name = 'menu') => useSharedStore(name, _useMenu);