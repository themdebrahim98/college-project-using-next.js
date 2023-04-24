import { Box, Stack } from '@mui/system'
import React from 'react'
import { styled } from '@mui/material/styles';
import { Divider, IconButton, Paper } from '@mui/material';
import { getOrdinals } from '../../Helper/functions';
import { AttachEmail, Call, Mail, WhatsApp } from '@mui/icons-material';
import Link from 'next/link';
function ContactDetails(props) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'black',
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
                    <Item ><Link href={'mailto:'+elm.email_address}><IconButton size='small' color='success'><AttachEmail/></IconButton></Link><b>Email:</b>{elm.email_address}</Item>
                    <Item ><Link href={'tel:'+elm.phone_number}><IconButton size='small' color='success'><Call/></IconButton></Link><b>Mobile no.:</b>{elm.phone_number}</Item>
                    <Item ><Link href={'https://wa.me/+91'+elm.phone_number}><IconButton size='small' color='success'><WhatsApp/></IconButton></Link><b>WhatsApp:</b>{elm.phone_number}</Item>
                    <Item ><Link href={'tel:'+elm.parent_phone_number}><IconButton size='small' color='success'><Call/></IconButton></Link><b>Gardian Mobile No.:</b>{elm.parent_phone_number}</Item>
                
                </>);
            })}
        </Box>
        // <div>
        //   {
        //   props?.data.map((elm,idx)=>{

        //   })
        //   }
        // </div>
    )
}

export default ContactDetails
