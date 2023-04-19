import {RoleTypes} from "../shared/models";
import * as Fa from '@fortawesome/free-solid-svg-icons';

export type RouteNames = 'campaigns' | 'orders'

export interface Routing {
    name: RouteNames;
    path: string;
    apiUrl: string;
    title: string;
    icon:  any;
    roles: RoleTypes[];
    disabled?: boolean;
}

const routing: Routing[] = [
    {
        name: 'campaigns',
        path: '/campaigns',
        apiUrl:'campaigns',
        title: 'קמפיינים',
        icon: Fa.faBullhorn,
        roles: [
            RoleTypes.Admin,
        ],
        disabled: false,
    },
    {
        name: 'orders',
        path: '/orders',
        apiUrl:'orders',
        title: 'הזמנות',
        icon: Fa.faReceipt,
        roles: [
        ],
        disabled: false,
    },
];

const routes: { [key in RouteNames]: Routing } = {} as any;
routing.forEach((route) => {
    routes[route.name] = route;
});

export const defaultPaths = {
    [RoleTypes.Admin]: 'orders',
    [RoleTypes.Admin]: 'campaigns',
    [RoleTypes.Regular]: 'orders',
    [RoleTypes.Regular]: 'campaigns',
} as  {[key in RoleTypes]: RouteNames };

export {routes, routing};
