import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './pages/admin/AdminLayout';
import './App.scss';
import Campaigns from './pages/admin/Campaigns/Campaigns';
import Orders from './pages/admin/Orders/Orders';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLayout />} />
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/admin/campaigns" element={<Campaigns />} />
                <Route path="/admin/orders" element={<Orders />} />
            </Routes>
        </Router>
    );
}

export default App;


