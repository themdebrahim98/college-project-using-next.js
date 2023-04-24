import { Box, Stack } from '@mui/system'
import React from 'react'
import { styled } from '@mui/material/styles';
import { Divider, IconButton, Link, Paper } from '@mui/material';
import { getOrdinals } from '../../Helper/functions';
import { AttachEmail, Call, Mail } from '@mui/icons-material';

function BasicDetails(props) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'black',
        fontSize:'h1'
    }));
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
            gap={2}
        >
            {props?.data.map((elm, idx) => {
                return (
                <>
                    <Item ><b>Full Name: </b> {elm.first_name + elm.last_name}</Item>
                    <Item ><b>Gender: </b>{elm.gender}</Item>
                    <Item ><b>Course: </b>{elm.course_name}</Item>
                    <Item ><b>Department: </b>{elm.course_name}</Item>
                    <Item ><b>Semester: </b>{getOrdinals(elm.semester)}</Item>
                    <Item ><b>CurrentSession: </b>{elm.current_session_name}</Item>
                </>);
            })}
        </Box>
    )
}

export default BasicDetails
