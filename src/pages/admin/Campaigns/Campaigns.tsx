import React, { useState, useEffect } from 'react';
import CampaignDetails from './CampaignDetails';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Button,
} from '@mui/material';

interface Campaign {
    id: string;
    name: string;
    type: string;
    language: string;
    status: string;
    lastUpdate: string;
    lastUpdatedBy: string;
    // Other campaign properties
}

function Campaigns() {
    const [filters, setFilters] = useState({
        type: '',
        page: 1,
        pageSize: 10,
        search: '',
    });

    const [data, setData] = useState<Campaign[]>([]);

    const [selectedCampaignId, setSelectedCampaignId] = useState(null);

    // Fetch data based on filters
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/campaigns', {
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
        setFilters({ ...filters, search: e.target.value });
    };

    const handleCampaignClick = (id) => {
        setSelectedCampaignId(id);
    };

    return (
        <div>
            {/* Filter by campaign type */}
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="type1">Type 1</MenuItem>
                    <MenuItem value="type2">Type 2</MenuItem>
                    <MenuItem value="type3">Type 3</MenuItem>
                </Select>
            </FormControl>

            {/* Pagination */}
            <div>
                Page {filters.page} of {Math.ceil(data.length / filters.pageSize)}
                <Button
                    disabled={filters.page === 1}
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                >
                    Previous
                </Button>
                <Button
                    disabled={filters.page === Math.ceil(data.length / filters.pageSize)}
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                >
                    Next
                </Button>
            </div>

            {/* Filter by name */}
            <TextField
                label="Search by name"
                value={filters.search}
                onChange={handleSearch}
            />

            {/* Campaign list */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Mode</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Enabled</TableCell>
                            <TableCell>Budget</TableCell>
                            <TableCell>Financial Tool</TableCell>
                            <TableCell>Financial Target</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((item) => item.type === filters.type || filters.type === '')
                            .filter((item) => item.name.toLowerCase().includes(filters.search.toLowerCase()))
                            .slice(
                                (filters.page - 1) * filters.pageSize,
                                filters.page * filters.pageSize
                            )
                            .map((item) => (
                                <TableRow key={item.id} onClick={() => handleCampaignClick(item.id)} hover>
                                    <TableCell>{item.id}</TableCell>
                                    {/* Other table cells for campaign properties */}
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.language}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Campaign details */}
            {selectedCampaignId && <CampaignDetails campaignId={selectedCampaignId} />}
        </div>
    );
}

export default Campaigns;

