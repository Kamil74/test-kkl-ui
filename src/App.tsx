import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './pages/admin/AdminLayout';
import './App.scss';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin/*" element={<AdminLayout />} />
            </Routes>
        </Router>
    );
}

export default App;





