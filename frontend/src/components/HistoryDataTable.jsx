import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import CloudDownloadSharpIcon from '@mui/icons-material/CloudDownloadSharp';

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
const HistoryDataTable = ({rows}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Upload Date</StyledTableCell>
                        <StyledTableCell>File Name</StyledTableCell>
                        <StyledTableCell align='right'>Total Articles</StyledTableCell>
                        <StyledTableCell align='right'>Total Articles Booked</StyledTableCell>
                        <StyledTableCell align='right'>Book On Same Date</StyledTableCell>
                        <StyledTableCell align='right'>Book On Different Date</StyledTableCell>
                        <StyledTableCell align='right'>Total Bill Amount</StyledTableCell>
                        <StyledTableCell align='right'>No Record Found</StyledTableCell>
                        <StyledTableCell align='right'>Actions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">{row.create_date.substr(0 ,10)}</StyledTableCell>
                        <StyledTableCell>{row.file_name}</StyledTableCell>
                        <StyledTableCell align='right'>{row.total_tracking_ids}</StyledTableCell>
                        <StyledTableCell align='right'>{row.book_ids}</StyledTableCell>
                        <StyledTableCell align='right'>{row.book_on_same_date}</StyledTableCell>
                        <StyledTableCell align='right'>{row.not_book_on_same_date}</StyledTableCell>
                        <StyledTableCell align='right'>{row.total_bill}</StyledTableCell>
                        <StyledTableCell align='right'>{row.not_book_ids}</StyledTableCell>
                        <StyledTableCell>
                            <Stack direction='row'
                             justifyContent="flex-end"
                             alignItems="flex-end">
                                <a href="/home/muhammad/my_work/Post-Tracking-Portal/backend/server/InternalFiles/TrackingWorkSheet.xlsx" download>
                                    <IconButton aria-label="delete" size="large">
                                        <CloudDownloadSharpIcon color='primary' fontSize="inherit" />
                                    </IconButton>
                                </a>
                                <IconButton aria-label="PreviewIcon" size="large">
                                    <PreviewIcon sx={{color:"green"}} fontSize="inherit" />
                                </IconButton>
                            </Stack>
                        </StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
        </TableContainer>
    );
};

export default HistoryDataTable;