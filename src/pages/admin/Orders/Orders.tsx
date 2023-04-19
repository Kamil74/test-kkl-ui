import React, { useState, useEffect } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
} from "@mui/material";

interface Order {
    id: number;

}

function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        // Replace with the correct API endpoint
        const response = await fetch("https://<FQDN>/<app name>/api/orders");
        const data = await response.json();
        setOrders(data);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const getPaymentUrl = async (orderId) => {
        // Replace with the correct API endpoint and parameters
        const response = await fetch(
            `https://<FQDN>/<app name>/api/orders/${orderId}/payment-url?email=${email}`
        );
        const paymentUrl = await response.json();
        // Use paymentUrl as needed
    };

    const getCertificates = async (orderId) => {
        // Replace with the correct API endpoint and parameters
        const response = await fetch(
            `https://<FQDN>/<app name>/api/orders/${orderId}/certificates?email=${email}`
        );
        const certificates = await response.json();
        // Use certificates as needed
    };

    return (
        <div>
            <TextField
                label="Customer Email"
                value={email}
                onChange={handleEmailChange}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Payment</TableCell>
                            <TableCell>Certificates</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                    <Button onClick={() => getPaymentUrl(order.id)}>
                                        Get Payment URL
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => getCertificates(order.id)}>
                                        Get Certificates
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export { Orders };
