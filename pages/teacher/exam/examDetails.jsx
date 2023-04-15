import React from 'react'
import {
    Box, Button, Fab, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Stack,
    Chip,
}
    from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function examDetails() {
    return (
        <Box component={Paper}>
            <Stack direction="row-reverse" spacing={3} sx={{ p: 1 }} >
                {/* <Link href='exam/giveMarks'>
                    <Fab variant="extended" size="small" color="info" sx={{ color: '#fff' }} title='give marks'>
                        <ArrowBack />Back
                    </Fab>
                </Link> */}
                <Chip label="exam" color="primary" />
                <Chip label="session" color="error" />
                <Chip label="subject" color="warning" />
                <Chip label="course" color="success" />

            </Stack>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ p: 2 }}
            >
                <Item>Exam name:</Item>
                <Item>Exam date:</Item>
                <Item>Subject name:</Item>
                <Item>Course name:</Item>
                <Item>Created at:</Item>
                <Item>Total Student:</Item>
                <Item>Marks status: pending</Item>
            </Stack>
        </Box>
    )
}

export default examDetails
