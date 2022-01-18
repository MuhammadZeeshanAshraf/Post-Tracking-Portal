import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Stack,
  Toolbar,
} from "@mui/material";
import HomeDataTable from "../components/HomeDataTable";
import styles from "../styles/commonStyle.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import axios from "axios";
import Dropzone from "react-dropzone";
import { DropDownSection, FileDiv } from "../styles/Home";
import CircularStatic from "../components/CircularStatic";
import { colors } from "../commons/colors";
import HistoryDataTable from "../components/HistoryDataTable";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import DoneIcon from '@mui/icons-material/Done';
import { config } from "../commons/config";
import LogoutAvatar from "../components/LogoutAvatar";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    padding: "20px",
    color: colors.primary,
  },
}));

const Home = () => {
  const [value, setValue] = React.useState("1");
  const [fileName, setFileName] = React.useState("No file selected");
  const [file, setFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [socket, setSocket] = React.useState(null);
  const [processing, setProcessing] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [historyData, setHistoryData] = React.useState([]);
  const [tempRow, setTempRow] = React.useState(null);
  const [totalRows, setTotalRows] = React.useState(0);
  const [completeProcess, setCompleteProcess] = React.useState(false);

  const hadnleNewProcessClick = () =>{
    window.location.reload();
  }

  useEffect(() => {
    if (tempRow) {
      setRows([...rows, tempRow]);
    }
  }, [tempRow]);

  const stopLoading = () => {
    setOpen(false);
  };

  const startLoading = () => {
    setOpen(!open);
  };

  const getHistory = () => {
    startLoading();
    axios
    .get(
      config.server+"import-process/history",
    )
    .then((res) => {
        if(Array.isArray(res.data)){
            setHistoryData(res.data)
        }
        stopLoading();
    }).catch((error) => {
        console.log(error);
        stopLoading();
      })
 }

  const processFile = async () => {
    if (file) {
      const data = new FormData();
      data.append("TrackingWorkSheet", file[0]);
      data.append("key", fileName);

      setProcessing(true);
      axios
        .post(
          config.server+"import-process",
          data,
          {}
        )
        .then((res) => {
          clearInterval(interval);
          axios
            .get(
              config.server+"import-process/data",
              {}
            )
            .then((res) => {
              console.log(res.data);
               if (Array.isArray(res.data.trackingData)) {
              if (res.data.trackingData.length > 0) {
                setProcessing(true);
                setTotalRows(parseInt(res.data.total))
                setRows(res.data.trackingData)
              }
            }
            });
        });
      const interval = setInterval(() => {
        axios
          .get(
            config.server+"import-process/data",
            {}
          )
          .then((res) => {
           console.log('OK========>',res.data);
               if (Array.isArray(res.data.trackingData)) {
              if (res.data.trackingData.length > 0) {
                setProcessing(true);
                setTotalRows(parseInt(res.data.total))
                setRows(res.data.trackingData)
              }
            }
          });
      }, 20000);
    }
  };

  const onFileDrop = (uploadFile) => {
    setFileName(uploadFile[0].name);
    setFile(uploadFile);
  };

  const classes = useStyles();
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue == "2"){
        getHistory();
    }
  };
  return (
    <div>
      <TabContext value={value}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white" }}
          className={classes.toolbar}
        >
          <CssBaseline />
          <Toolbar>
              <Stack
              sx={{width:"100%",}}
               direction={"row"}
              >
                <img
                    src={require("../img/logo.png")}
                    style={{ width: "500px",padding:"20px", flex:1 }}
                />
               <Stack 
                 direction="row"
                 sx={{width:"100%", marginRight:"20px"}}
                 justifyContent="flex-end"
                 alignItems="center"
                 >
                    <LogoutAvatar/>
                </Stack>
                {/* <Typography variant="h3" className={classes.logo}>
                    TRACK N TRACE
                </Typography> */}
              </Stack>
          </Toolbar>
          <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2, backgroundColor:"#cb9ae64d" }}>
            <Stack alignItems={"center"}>
              <TabList
                textColor="primary"
                onChange={handleChange}
                TabIndicatorProps={{ style: { background: colors.primary } }}
                aria-label="lab API tabs example"
              >
                <Tab
                  classes={{ indicator: classes.indicator }}
                  label="HOME"
                  value="1"
                />
                <Tab
                  classes={{ indicator: classes.indicator }}
                  label="HISTORY"
                  value="2"
                />
              </TabList>
            </Stack>
          </Box>
        </AppBar>
        <TabPanel value="1">
          <Stack>
            {!processing ? (
              <Container sx={{ p: 5 }}>
                <Stack>
                  <FileDiv>
                    <b>File Name:&nbsp;&nbsp;</b>
                    <p>{fileName}</p>
                    {file ? (
                      <>
                        <DoubleArrowIcon color={"success"} />
                            <Button
                             onClick={processFile}
                             className={classes.processBtn}
                            >
                                <Stack justifyContent={"center"} alignItems={"center"}>
                                    <img
                                        src={require("../img/process-icon.png")}
                                        style={{ width: "40px" }}
                                    />
                                    &nbsp;PROCESS NOW
                                </Stack>
                            </Button>                            
                        
                      </>
                    ) : (
                      <></>
                    )}
                  </FileDiv>
                  <Dropzone onDrop={onFileDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <DropDownSection>
                        <div {...getRootProps()}>
                          <input
                            {...getInputProps()}
                            multiple={false}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          />
                          <img
                            src={require("../img/upload.png")}
                            style={{ width: "200px" }}
                          />
                          <h2>Drag & Drop Files Here</h2>
                          <Button variant="contained">Brows file</Button>
                        </div>
                      </DropDownSection>
                    )}
                  </Dropzone>
                </Stack>
              </Container>
            ) : (
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
            {
                completeProcess?
                    <Stack
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Button onClick={hadnleNewProcessClick} sx={{marginBottom:"60px"}} variant="contained" color={"primary"}>Process New</Button>
                        <Stack 
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                             <img
                                src={require("../img/done-icone.png")}
                                style={{ width: "50px" }}
                            />
                            <h4> File is processed Successfully</h4>
                        </Stack>
                    </Stack>
                    :
                        <Stack 
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        >
                        <h3 style={{ marginLeft: "10px" }}>Processing</h3>
                        <div style={{ padding: "4px" }}>
                            <p>({totalRows} rows)</p>
                        </div>
                        <img
                            src={require("../img/processing.gif")}
                            style={{ width: "300px" }}
                        />
                        </Stack>

                }
                <CircularStatic progress={(rows.length / totalRows) * 100} setCompleteProcess={setCompleteProcess}/>
                <HomeDataTable rows={rows} />
              </Stack>
            )}
          </Stack>
        </TabPanel>
        <TabPanel value="2">
          <HistoryDataTable rows={historyData} />
        </TabPanel>
      </TabContext>
     <Loader isLoading={open}/>
    </div>
  );
};

export default Home;
