import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { AppBar, Button, Container, Stack } from '@mui/material';
import HomeDataTable from '../components/HomeDataTable';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import styles from '../styles/commonStyle.css'; 
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import Dropzone from 'react-dropzone';
import { DropDownSection, FileDiv } from '../styles/Home';



const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
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
    }
  }));
  

const Home = () => {
    const [value, setValue] = React.useState('1');
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
                    <Typography variant="h4" className={classes.logo}>
                    Track & Trace
                    </Typography>
                    <div className={classes.navlinks}>
                    </div>
                </Toolbar>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', p:2 }}>
                    <Stack>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="HOME" value="1" />
                            <Tab label="HISTORY" value="2" />
                        </TabList>
                    </Stack>
                </Box>
            </AppBar>
                <TabPanel value="1">
                    <Stack>
                        <Container sx={{p:5}}>
                            <Stack>
                                {/* <FileDiv>
                                    <b>File:&nbsp;&nbsp;</b>
                                    <p>No File Seleted</p>
                                </FileDiv> */}
                                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <DropDownSection>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                         <img src={require('../img/upload.png')}  style={{width:'200px'}} />
                                        <h2>Drag & Drop Files Here</h2>
                                        <Button variant="contained">Brows file</Button>
                                    </div>
                                    </DropDownSection>
                                )}
                                </Dropzone>
                            </Stack>
                        </Container>
                        {/* <HomeDataTable/> */}
                    </Stack>
                    </TabPanel>
                <TabPanel value="2">History tab</TabPanel>
            </TabContext>
        </div>
    );
};

export default Home;