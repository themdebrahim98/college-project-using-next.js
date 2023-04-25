
import React, { useState } from 'react';
import { Box, Button, Collapse, Paper, TextField, Typography } from '@mui/material';
import { Add, ExpandMore } from '@mui/icons-material';

function StudentCareer() {
    // return (
    //     <Box component={Paper}>
    //         <Box
    //             display="flex"
    //             alignItems="center"
    //             flexDirection="row"
    //             justifyContent={{ md: "end", xs: "center" }}
    //             gap={1}
    //             px={1}
    //             py={1}
    //             sx={{ mb: 2, flexWrap: "wrap" }}
    //         >
    //             <Button variant='contained' color='success'>Add job</Button>
    //         </Box>
    //         <Box px={1} py={1}>
    //             dsfd
    //         </Box>
    //     </Box>
    // )
    const [openform, setOpenform] = useState(false);

    const handleButtonClick = () => {
        setOpenform(!openform);
    };

    return (
        <Box component={Paper}>
            <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent={{ md: "end", xs: "center" }}
                gap={1}
                px={1}
                py={1}
                sx={{ mb: 2, flexWrap: "wrap" }}
            >
                <Button onClick={handleButtonClick} variant='contained' startIcon={<Add />}>
                    <Typography variant="h6" component="span">
                        Add Job
                    </Typography>
                </Button>
            </Box>

            <Collapse in={openform}>
                <Box display="flex"
                    alignItems="center"
                    flexDirection="row"
                    justifyContent={{ md: "start", xs: "center" }}
                    gap={1}
                    px={1}
                    py={1}
                    sx={{ mb: 2, flexWrap: "wrap" }}>
                    <TextField
                        variant="outlined"
                        required
                        id="company_name"
                        label="Company Name"
                        name="company_name"
                        autoComplete="off"
                    />
                    <TextField
                        variant="outlined"
                        required
                        id="company_location"
                        label="Company Location"
                        name="company_location"
                        autoComplete="off"
                    />
                    <TextField
                        variant="outlined"
                        required
                        id="designation"
                        label="Designation"
                        name="designation"
                        autoComplete="off"
                    />
                    <Button type='submit' variant='contained'>Submit</Button>
                </Box>
            </Collapse>
        </Box>
    );
}

export default StudentCareer
