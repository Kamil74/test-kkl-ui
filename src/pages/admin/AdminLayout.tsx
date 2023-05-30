import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Campaigns from './Campaigns/Campaigns';
import Users from './Users/User';
import MyComponent from './MyComponent';
import Orders from './Orders/Orders';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ExtensionIcon from '@mui/icons-material/Extension';
import { Tooltip } from '@mui/material';

export function AdminLayout() {
    const drawerWidth = 50;
    const location = useLocation();

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        direction: 'rtl',
                    },
                }}
            >
                <List>
                    <ListItem button component={Link} to="/admin/campaigns">
                        <Tooltip title="Campaigns" placement="right">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Campaigns" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/orders">
                        <Tooltip title="Orders" placement="right">
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Orders" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/users">
                        <Tooltip title="Users" placement="right">
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/mycomponent">
                        <Tooltip title="My Component" placement="right">
                            <ListItemIcon>
                                <ExtensionIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="My Component" />
                    </ListItem>
                </List>
            </Drawer>
            <div style={{ marginLeft: drawerWidth }}>
                <Routes>
                    <Route path="/admin/campaigns" element={<Campaigns />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/mycomponent" element={<MyComponent />} />
                </Routes>
            </div>
        </>
    );
}

export default AdminLayout;

