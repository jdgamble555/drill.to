import { browser } from "$app/environment";
import { writable, type Updater } from "svelte/store";

// local storage store
export const storable = <T>({ key, value }: {
    key?: string,
    value?: T | undefined
} = {}) => {
    const store = writable(value);
    const { set: _set, update: _update, subscribe } = store;

    const canStore = browser && key;

    if (canStore) {
        const value = localStorage.getItem(key);
        if (value !== null) {
            _set(JSON.parse(value));
        }
    }

    const updateStorage = (sv: T) => {
        canStore && localStorage.setItem(key, JSON.stringify(sv));
    };

    return {
        set: (v: T) => {
            updateStorage(v);
            _set(v);
        },
        update: (u: Updater<T>) => {
            _update((value) => {
                const nv = u(value);
                updateStorage(nv);
                return nv;
            });
        },
        subscribe
    };
};