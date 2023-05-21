import React, { useState, useEffect } from 'react';

interface Record {
    id: number;
    title: string;
    description: string;
}

const apiUrl = 'https://localhost:7239/api'; //  address  API

const MyComponent = () => {
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        fetch(`${apiUrl}/get-iframe-url`)
            //  apiUrl
            .then(response => response.json())
            .then(data => setRecords(data));
    }, []);

    return (
        <div>
            {records.map((record) => (
                <div key={record.id}>
                    <h2>{record.title}</h2>
                    <p>{record.description}</p>
                </div>
            ))}
        </div>
    );
};

export default MyComponent;
