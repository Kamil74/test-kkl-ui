import React, { useState, useEffect } from 'react';
//import {RoleTypes} from "../../shared/models";
import UserDetails from './UserDetails';
import {
    //Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    TextField,
    TableCell
} from "@mui/material";

interface User {
    ID: number;
    FirstName: string;
    LastName: string;
    IdNum: string;
    IsActive: boolean;
    Password : string;
    Email: string;
    Phone:string;
    Role: string;
    Module:string;
}
/*
interface UsersProps
{
    settings: Routing
}
*/
function User() {
    const [filters, setFilters] = useState({
        filterOption: '',
        searchValue: '',
    });
    const [data, setData] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filters),
            });

            const fetchedData = await response.json();
            setData(fetchedData);
        };

        fetchData();
    }, [filters]);

    const handleSearch = (e) => {
        setFilters({...filters, searchValue: e.target.value });
    };

    const handleUserClick = (ID) => {
        setSelectedUserId(ID);
    };

    return(
        <div>
            {/* Filter by User IdNum or FirstName or LastName or module*/}
            <FormControl>
                <InputLabel>Filter By</InputLabel>
                <Select
                    value={filters.filterOption}
                    onChange={(e) => setFilters({ ...filters, filterOption: e.target.value })}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="IdNum">ID Num</MenuItem>
                    <MenuItem value="FirstName">First Name</MenuItem>
                    <MenuItem value="LastName">Last Name</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                    <MenuItem value="Module">Module</MenuItem>
                </Select>
            </FormControl>

            {/* Search Input */}
            <TextField
                label="Search"
                value={filters.searchValue}
                onChange={handleSearch}
            />

            {/* User list */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>IdNum</TableCell>
                            <TableCell>FirstName</TableCell>
                            <TableCell>LastName</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>role</TableCell>
                            <TableCell>module</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((item) => {
                                if (filters.filterOption === '') {
                                    // No filter selected, return all data
                                    return true;
                                } else
                                if (filters.filterOption === 'IdNum') {
                                    // Filter by ID Num
                                    return item.IdNum.toLowerCase().includes(filters.searchValue.toLowerCase());
                                } else
                                if (filters.filterOption === 'FirstName') {
                                    // Filter by First Name
                                    return item.FirstName.toLowerCase().includes(filters.searchValue.toLowerCase());
                                } else
                                if (filters.filterOption === 'LastName') {
                                    // Filter by Last Name
                                    return item.LastName.toLowerCase().includes(filters.searchValue.toLowerCase());
                                } else
                                if (filters.filterOption === 'Email') {
                                    // Filter by Email
                                    return item.Email.toLowerCase().includes(filters.searchValue.toLowerCase());
                                } else
                                if (filters.filterOption === 'Module') {
                                    // Filter by Module
                                    return item.Module.toLowerCase().includes(filters.searchValue.toLowerCase());
                                } else {
                                    // Unknown filter option, return false
                                    return false;
                                }
                            })
                            .map((item) => (
                                <TableRow key={item.ID} onClick={() => handleUserClick(item.ID)} hover>
                                    <TableCell>{item.IdNum}</TableCell>
                                    <TableCell>{item.FirstName}</TableCell>
                                    <TableCell>{item.LastName}</TableCell>
                                    <TableCell>{item.Email}</TableCell>
                                    <TableCell>{item.Phone}</TableCell>
                                    <TableCell>{item.Role}</TableCell>
                                    <TableCell>{item.Module}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* User details */}
            {selectedUserId && <UserDetails userId={selectedUserId} />}
        </div>
    );
}

export default User;

