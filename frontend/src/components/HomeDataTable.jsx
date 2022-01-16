import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Sr#', width: 70 },
    { field: 'tID', headerName: 'Tracking ID', width: 150 },
    { field: 'bookingDate', headerName: 'Date of Booking', type: 'date', width: 130 },
    { field: 'pinCode', headerName: 'Customer PIN Code', type: 'number', width: 170 },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 130 },
    { field: 'validate', headerName: 'Validate (Validation Check)', width: 230 },
];

const rows = [
    { id: 1, tID: 'R12553kcd', bookingDate: '14-01-2022', pinCode: '35', amount: '2309', validate: 'Booked' },
    { id: 2, tID: 'KPL25sMQt', bookingDate: '14-01-2022', pinCode: '42', amount: '2309', validate: 'Booked' },
    { id: 3, tID: 'R12553kcd', bookingDate: '14-01-2022', pinCode: 'NA', amount: 'NA', validate: 'Not Booked' },
    { id: 5, tID: 'R12553kcd', bookingDate: '11-01-2022', pinCode: null, amount: '2309', validate: 'Booked' },
    { id: 4, tID: '234u54446', bookingDate: '14-01-2022', pinCode: 'NA', amount: 'NA', validate: 'Not Booked' },
    { id: 7, tID: '66fh467hp', bookingDate: '14-01-2022', pinCode: '44', amount: '2309', validate: 'Booked' },
    { id: 6, tID: 'R12553kcd', bookingDate: '14-01-2022', pinCode: 'NA', amount: 'NA', validate: 'Not Booked' },
    { id: 9, tID: '72fftyRDs', bookingDate: '14-01-2022', pinCode: '65', amount: '2309', validate: 'Booked' },
    { id: 8, tID: 'R12553kcd', bookingDate: '14-01-2022', pinCode: 'NA', amount: 'NA', validate: 'Not Booked' },
];

const HomeDataTable = () => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
};

export default HomeDataTable;