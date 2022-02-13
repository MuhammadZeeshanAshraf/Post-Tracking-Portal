import React from 'react';
import TextField from '@mui/material/TextField';
import { Grid, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const EditorRow = (props) => {

    return (
        <Grid container direction={'row'} alignItems={'center'} justify={'space-evenly'}>
            <Grid item>
                {props.index}
            </Grid>
            <Grid item>
                <TextField id="tracking_id" size="small" variant="outlined" margin="normal" value={props.data.id} />
            </Grid>
            <Grid item>
                <TextField id="phone_number" size="small" variant="outlined" margin="normal" value={props.data.num} />
            </Grid>
            <Grid item direction={'row'} justify={'flex-end'}>
                <IconButton onClick={()=>props.appendRow(props.index)} aria-label="AddCircleIcon" size="large">
                    <AddCircleIcon sx={{color:"green"}} fontSize="inherit" />
                </IconButton>
                <IconButton onClick={()=>props.deleteRow(props.index)} aria-label="CancelIcon" size="large">
                    <CancelIcon sx={{color:"red"}} fontSize="inherit" />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default EditorRow;