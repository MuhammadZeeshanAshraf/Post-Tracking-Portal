import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Backdrop, Button, CircularProgress, Container, Stack } from '@mui/material';
import HomeDataTable from '../components/HomeDataTable';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import styles from '../styles/commonStyle.css'; 
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import axios from 'axios';
import io from 'socket.io-client';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import Dropzone from 'react-dropzone';
import { DropDownSection, FileDiv } from '../styles/Home';
import CircularStatic from '../components/CircularStatic';
import { colors } from "../commons/colors";
import HistoryDataTable from '../components/HistoryDataTable';

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
      padding:'20px',
      color:colors.primary

    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid    ",
      },
    },
    toolbar:{

        backgroundColor: "#ffffff",
        color:"#000000",
    },
    indicator:{
        backgroundColor:"blue"
    }

  }));
  

const Home = () => {
    const [value, setValue] = React.useState('1');
    const [fileName, setFileName] = React.useState('No file selected');
    const [file, setFile] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [socket, setSocket] = React.useState(null);
    const [processing, setProcessing] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [tempRow, setTempRow] = React.useState(null);
    const [totalRows, setTotalRows] = React.useState(0);
    
    useEffect(() => {
        if(tempRow){
            setRows([...rows,tempRow])
        }
    }, [tempRow]);


    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen(!open);
    };
    const setMyTempRow = (row)=>{
    }
    const cerateSocketConnection =() =>{
        const newSocket = io('http://localhost:4000');
        newSocket.on("getData", (response) => {
            setTempRow(response.data);
            setTotalRows(response.total);
            if(response.isLast){
                closeSocket();
            }
        });
    } 

    const closeSocket = ()=>{
        if(socket){
            socket.close();
        }
    }   
    
    const processFile = async ()=>{
        if(file){
            const data = new FormData()
            data.append('file', file)
            data.append('fileName', fileName)
            // handleToggle();
            // handleClose();
            // axios.post("http://localhost:8000/upload", data, { 
            //    // receive two    parameter endpoint url ,form data
            // }).then(res => { // then print response status
            //     console.log(res.statusText)
               await cerateSocketConnection();
            // })
            setProcessing(true);
        }
    }
    const onFileDrop = (uploadFile)=>{
        setFileName(uploadFile[0].name)
        setFile(uploadFile)
    }

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <TabContext value={value}>
            <AppBar position="static"  className={classes.toolbar} >
                <CssBaseline />
                <Toolbar>
                    <Typography  variant="h3" className={classes.logo}>
                    TRACK N TRACE
                    </Typography>
                    <div className={classes.navlinks}>
                    </div>
                </Toolbar>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', p:2 }}>
                    <Stack alignItems={"center"}>
                        <TabList textColor='primary' TabIndicatorProps={{ style: { background: colors.primary } }}  onChange={handleChange} aria-label="lab API tabs example">
                            <Tab classes={{indicator: classes.indicator}} label="HOME" value="1" />
                            <Tab classes={{indicator: classes.indicator}} label="HISTORY" value="2" />
                        </TabList>
                    </Stack>
                </Box>
            </AppBar>
                <TabPanel value="1">
                    <Stack>
                    {
                    !processing?
                        <Container sx={{p:5}}>
                            <Stack>
                                <FileDiv>
                                    <b>File:&nbsp;&nbsp;</b>
                                    <p >{fileName}</p>
                                    {
                                        file ?
                                            <>
                                                <DoubleArrowIcon  color={'success'}/>
                                                <Button onClick={processFile}  className={classes.processBtn}>PROCESS NOW</Button>
                                            </>
                                        :
                                        <></>
                                    }
                                </FileDiv>
                                <Dropzone onDrop={onFileDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <DropDownSection>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} multiple={false} accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' />
                                         <img src={require('../img/upload.png')}  style={{width:'200px'}} />
                                        <h2>Drag & Drop Files Here</h2>
                                        <Button variant="contained">Brows file</Button>
                                    </div>
                                    </DropDownSection>
                                )}
                                </Dropzone>
                            </Stack >
                        </Container>
                        :
                        <Stack 
                         justifyContent={"center"}
                         alignItems={"center"}
                         spacing={3}
                         >
                            <Stack direction={"row"}>
                                <h5>Processing</h5>
                                <div style={{padding: '4px'}} >
                                    <p>({rows.length} rows)</p>
                                </div>
                            </Stack>
                            <CircularStatic progress={(rows.length/totalRows)*100}/>
                            <HomeDataTable rows={rows}/>
                        </Stack>
                    }                   
                    </Stack>
                    </TabPanel>
                <TabPanel value="2"><HistoryDataTable rows={rows} /></TabPanel>
            </TabContext>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            // onClick={handleClose}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Home;