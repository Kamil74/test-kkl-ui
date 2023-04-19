import {create} from "zustand";

export const loaderStore = create<{
    isOpen: boolean,
    show: () => void,
    hide: () => void,
}>((set) => ({
    isOpen: false,
    show: () => set({isOpen: true}),
    hide: () => set({isOpen: false}),
}));
