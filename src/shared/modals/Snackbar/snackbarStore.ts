import {create} from "zustand";
import {SeverityTypes} from "../../models";

export const snackbarStore = create<{
    message: string | null,
    severity: SeverityTypes | null,
    isOpen: boolean,
    open: (message: string, severity: SeverityTypes) => void,
    close: () => void
}>((set) => ({
    message: null,
    severity: 'info',
    isOpen: false,
    open: (message: string, severity: SeverityTypes) =>
        set({message, severity, isOpen: true}),
    close: () => set({isOpen: false}),
}));
