import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TablePagination } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
}));

const HomeDataTable = ({rows}) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(200);
    const [failedCount, setFailedCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [bookedCount, setBookedCount] = useState(0);

    useEffect(() => {
        const bookedRows = rows.filter(row => row.book_status == "Booked");
        const tAmount = bookedRows.reduce((sum, obj) => sum + parseInt(obj.amount), 0);
        setTotalAmount(tAmount);
        setBookedCount(bookedRows.length);
        setFailedCount(rows.length - bookedRows.length);
    }, [rows]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 200));
        setPage(0);
    };

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tracking ID</StyledTableCell>
                            <StyledTableCell align="right">Article Type</StyledTableCell>
                            <StyledTableCell align="right">Booked At</StyledTableCell>
                            <StyledTableCell align="right">Date of Booking</StyledTableCell>
                            <StyledTableCell align="right">Customer PIN Code</StyledTableCell>
                            <StyledTableCell align="right">Amount</StyledTableCell>
                            <StyledTableCell align="right">Validate (Validation Check)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.tracking_id}</StyledTableCell>
                            <StyledTableCell align="right">{row.TYPE}</StyledTableCell>
                            <StyledTableCell align="right">{row.booked_at}</StyledTableCell>
                            <StyledTableCell align="right">{row.booking_date}</StyledTableCell>
                            <StyledTableCell align="right">{row.customer_pin_code}</StyledTableCell>
                            <StyledTableCell align="right">{row.amount}</StyledTableCell>
                            <StyledTableCell align="right">{row.book_status}</StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableRow sx={{backgroundColor: 'gray'}}>
                        <TableCell><b>Total Tracking - {bookedCount}</b></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right"><b>Total Amount: {totalAmount}</b></TableCell>
                        <TableCell align="right"><b>Booked: {bookedCount} Failed: {failedCount}</b></TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[200]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default HomeDataTable;
