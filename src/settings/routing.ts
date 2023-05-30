import {RoleTypes} from "../shared/models";
import * as Fa from '@fortawesome/free-solid-svg-icons';
import campaigns from "../pages/admin/Campaigns/Campaigns";

export type RouteNames = 'campaigns' | 'orders' | 'users'

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
            RoleTypes.Regular,
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
            RoleTypes.Admin,
            RoleTypes.Regular,

        ],
        disabled: false,
    },
    {
        name: 'users',
        path: '/users',
        apiUrl:'users',
        title: 'משתמשים',
        icon: Fa.faReceipt,
        roles: [
            RoleTypes.Admin,
            RoleTypes.Regular,
        ],
        disabled: false,
    },
];

const routes: { [key in RouteNames]: Routing } = {} as any;
routing.forEach((route) => {
    routes[route.name] = route;
});

export const defaultPaths: { [key in RoleTypes]?: RouteNames[] } = {
    [RoleTypes.Admin]: ['orders', 'campaigns', 'users'],
    [RoleTypes.Regular]: ['orders', 'campaigns', 'user'],
};




export {routes, routing};
