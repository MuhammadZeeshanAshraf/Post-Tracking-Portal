import React from 'react';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import CloudDownloadSharpIcon from "@mui/icons-material/CloudDownloadSharp";
import ViewDataModal from "./ViewDataModal";
import { useState } from "react";
import { config } from "../commons/config";
import axios from "axios";
import download from "downloadjs";
import Loader from "./Loader";
import { Box, TablePagination } from "@mui/material";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const HistoryDataTable = ({rows}) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(200);
    const [showModal, setShowModal] = useState(false); 
    const [processData, setProcessData] = useState([]); 
    const [fileName, setFileName] = useState(''); 
    const [exportFile, setExportFile]  = useState();
    const [loading, setLoading]  = useState(false);

  const getProcessData = async (id) => {
    setLoading(true);
    const data = new FormData();
    data.append("ProcessId", id);

        axios({
            method: 'post',
            url: config.server+"import-process/data-by-id",
            data: data,
        })
        .then(res => {
                setProcessData(res.data.trackingData);
                setLoading(false);
                return true;
            })
            .catch(error => {
                setLoading(false);
        });
    }

    const getProcessFile = async (id) => {
        setLoading(true);
        axios({
        method: "get",
        url: config.server + "export-tracking-file",
        responseType: "blob",
        params: {
            ProcessId:id
        }
        })
        .then(async (res) => {
            const blob = new Blob([res.data], { type: "application/xlsx" });
            const name = "Tracking Sheet.xlsx";
            setLoading(false);
            download(blob, name);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
    };

    const handlePreview = async (id, fileName) => {
        setFileName(fileName);
        await getProcessData(id);
        setShowModal(!showModal);
     };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 200));
        setPage(0);
    };

    return (
        <>
        <Box>
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                                    <IconButton onClick={()=>getProcessFile(row.id)} aria-label="delete" size="large">
                                        <CloudDownloadSharpIcon color='primary' fontSize="inherit" />
                                    </IconButton>
                                    <IconButton onClick={()=>handlePreview(row.id, row.file_name)} aria-label="PreviewIcon" size="large">
                                        <PreviewIcon sx={{color:"green"}} fontSize="inherit" />
                                    </IconButton>
                                </Stack>
                            </StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <ViewDataModal showModal={showModal} setShowModal={setShowModal} processData={processData} fileName={fileName} />
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
        <Loader isLoading={loading}/>
        </>
    );
};

export default HistoryDataTable;
