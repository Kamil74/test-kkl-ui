import { RoleTypes } from "./roleTypes";

export interface CurrentUser {
    id: string;
    username: string;
    name: string;
    email: string;
    role: RoleTypes;
    token: string;
}
