import React, { useState } from 'react';
import EditorRow from './EditorRow';
import { Box, Grid, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';

const defualtData = [
    {
        id:"123",
        num:"3ewew"
    },
    {
        id:"1234",
        num:"3ewew"
    },    {
        id:"1235",
        num:"3ewew"
    },    {
        id:"1236",
        num:"3ewew"
    },    {
        id:"1237",
        num:"3ewew"
    },    {
        id:"1238",
        num:"3ewew"
    },
]

function addAfter(array, index, newItem) {
    return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index)
    ];
}

const TextEditor = () => {
    const [listData, setListData] = useState(defualtData);
    
    const deleteRow = (index)=>{
       const temp = listData;
       const newTemp = temp.splice(index, 1);
       setListData([...temp]); 
    }

    const appendRow = (index)=>{
        const newTemp = addAfter(listData, index+1, <EditorRow/>);
        setListData(newTemp); 
    }

    const pasteData = (text)=>{
        var text = text.clipboardData.getData('Text');
    }

    return (
        <Box  container direction={'column'} sx={{ m:1, p:1, width:800, border:1}}>
        {
            listData.map((data, index) => {
                return <EditorRow key={index} data={data} index={index} deleteRow={deleteRow} appendRow={appendRow} /> 
            })
        }
        <TextField onPaste={(e)=>pasteData(e)} id="tracking_id" size="small" variant="outlined" margin="normal" />
        </Box>
    );
};

export default TextEditor;