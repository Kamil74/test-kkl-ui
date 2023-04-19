import {typesBase} from '../utils/typesBase';

export type RoleTypes = 'salkakal-user' | 'salkakal-admin';
const values: RoleTypes[] = ['salkakal-user', 'salkakal-admin'];
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RoleTypes = {
    Regular: values[0],
    Admin: values[1],
    ...typesBase
} as const;
