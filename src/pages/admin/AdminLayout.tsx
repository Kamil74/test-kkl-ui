import { Route, Routes } from 'react-router-dom';
import Campaigns from './Campaigns/Campaigns';
import { Orders } from './Orders/Orders';

import styles from './Campaigns/Campaigns.module.scss';

export function AdminLayout() {
    return (
        <>
            <div className={styles.header}>My Custom Admin Panel</div>
            <div className="container admin-main">
                <Routes>
                    <Route path="/" element={<Campaigns />} />
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="orders" element={<Orders />} />
                </Routes>
            </div>
            <div className={styles.footer}>&copy; {new Date().getFullYear()} - My Company</div>
        </>
    );
}


