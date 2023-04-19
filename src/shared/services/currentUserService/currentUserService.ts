import {CurrentUser} from "../../models";

const STORAGE_KEY = "auth.currentUser";
export function getCurrentUser(): CurrentUser | undefined {
    const currentUser = localStorage.getItem(STORAGE_KEY);
    return currentUser ? JSON.parse(currentUser) : undefined;
}
export function setCurrentUser(currentUser: CurrentUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
}
