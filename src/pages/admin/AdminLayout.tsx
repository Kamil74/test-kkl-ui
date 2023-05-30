import { Route, Routes } from 'react-router-dom';
import Campaigns from './Campaigns/Campaigns';

import User from './Users/User';
import styles from './Campaigns/Campaigns.module.scss';
import MyComponent from './MyComponent';
import {Orders} from "./Orders/Orders";

export function AdminLayout() {
    return (
        <>
            <div className={styles.header}>My Custom Admin Panel</div>
            <div className="container admin-main">
                <Routes>
                    <Route path="/" element={<Campaigns />} />
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="mycomponent" element={<MyComponent />} />
                    <Route path="users" element={<User />} />
                    <Route path="users/:id" element={<User />} />
                </Routes>
            </div>
            <div className={styles.footer}>&copy; {new Date().getFullYear()} - My Company</div>
        </>
    );
}


export default MyComponent;