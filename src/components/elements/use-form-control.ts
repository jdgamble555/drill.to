import { useSharedStore } from "$lib/use-shared-store";
import { derived, writable } from "svelte/store";

export type FormControl = {
    isTouched: boolean;
    isValid: boolean;
    isPristine: boolean;
    node?: HTMLFormElement;
    value?: Record<string, FormDataEntryValue>;
};

const _form = () => {

    let runOnce = true;
    let pristineValue: string;

    const myForm = writable<FormControl>({
        isTouched: false,
        isPristine: true,
        isValid: false,
        node: undefined,
        value: undefined
    });

    const node = writable<HTMLFormElement>();

    // TODO - maybe replace with - https://github.com/noahsalvi/svelte-use-form

    const { subscribe } = derived<[typeof node, typeof myForm], FormControl>([node, myForm], ([$node, $myForm], set, update) => {
        const form = $node;
        set($myForm);
        if (form && runOnce) {

            // setup form with initial values
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            pristineValue = JSON.stringify(data);

            // setup form checks on touched
            form.oninput = () => {
                const changedFormData = new FormData(form);
                const changedData = Object.fromEntries(changedFormData.entries());
                const isValid = form.checkValidity();
                update(v => ({
                    ...v,
                    isTouched: true,
                    isValid,
                    isPristine: JSON.stringify(changedData) === pristineValue
                }));
            };
            runOnce = false;
        }
    })

    return {
        form: {
            set: myForm.set,
            subscribe,
            update: myForm.update,
        },
        node,
        setValue: (value: Record<string, FormDataEntryValue>) => myForm.update(v => ({ ...v, value })),
        markAsPristine: () => myForm.update(v => {
            if (v.node) {
                const formData = new FormData(v.node);
                const data = Object.fromEntries(formData.entries());
                pristineValue = JSON.stringify(data);
            }
            return ({
                ...v,
                isPristine: true
            })
        })
    }
};

export const useFormControl = (name = 'form') => useSharedStore(name, _form);

export type useFormControlType = ReturnType<typeof useFormControl>;