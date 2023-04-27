
import React, { useState } from 'react';
import { Box, Button, Collapse, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Add, ExpandMore, Save } from '@mui/icons-material';
function AddJobCollapse(props) {
    return (
        <Collapse in={props.openform}>
            <Box display="flex"
                alignItems="center"
                flexDirection={{ md: "row", xs: "column" }}
                justifyContent="center"
                gap={1}
                px={1}
                py={1}
                sx={{ mb: 2, flexWrap: "wrap" }}
            >
                <TextField
                    variant="outlined"
                    required
                    id="company_name"
                    label="Company Name"
                    name="company_name"
                    autoComplete="off"
                    size='small'
                />
                <FormControl>
                    <InputLabel id="company_country-label">Country</InputLabel>
                    <Select
                        labelId="company_country-label"
                        id="company_country"
                        value={20}
                        label="Country"
                        size='small'
                    >
                        <MenuItem value={10}>India</MenuItem>
                        <MenuItem value={20}>Bangladesh</MenuItem>
                        <MenuItem value={30}>Japan</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="company_state_label">State</InputLabel>
                    <Select
                        labelId="company_state_label"
                        id="company_state"
                        value={20}
                        label="State"
                        size='small'
                    >
                        <MenuItem value={10}>West Bengal</MenuItem>
                        <MenuItem value={20}>Maharrastra</MenuItem>
                        <MenuItem value={30}>UP</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="company_city_label">City</InputLabel>
                    <Select
                        labelId="company_city_label"
                        id="company_city"
                        value={20}
                        label="City"
                        size='small'
                    >
                        <MenuItem value={10}>City</MenuItem>
                        <MenuItem value={20}>Mumbai</MenuItem>
                        <MenuItem value={30}>Chennai</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    required
                    id="designation"
                    label="Designation"
                    name="designation"
                    size='small'
                    autoComplete="off"
                />
                <FormControl>
                    <InputLabel id="source_label">Source</InputLabel>
                    <Select
                        labelId="source_label"
                        id="source"
                        value={'college'}
                        label="source"
                        size='small'
                    >
                        <MenuItem value={'college'}>College</MenuItem>
                        <MenuItem value={'outside'}>Outside</MenuItem>
                    </Select>
                </FormControl>
                <Button type='submit' variant='contained' size='medium' color='success' startIcon={<Save />}>Save</Button>
            </Box>
        </Collapse>
    )
}

export default AddJobCollapse
