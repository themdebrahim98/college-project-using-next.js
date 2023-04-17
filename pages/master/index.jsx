import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    Drawer,
    Stack,
    Paper,
    TableContainer,
    FormControl,
    Select,
    MenuItem,
    TablePagination,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Courses from './Components/Courses';
import Departments from './Components/Departments';

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event) => {
        // let newValue = Math.floor(Math.random() * 3) + 1;
        console.log(event);
        setValue(event.target.value.toString());
    };

    return (
        <>
            <Box component={Paper}>
            <Box
                display="flex"
                alignItems="center"
                // flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                justifyContent={{ md: "start" }}
                p={1}
                gap={2}
            >
                <Button variant={value== 1?"contained":"outlined"} value="1" onClick={handleChange} color='primary' sx={{fontWeight:'bold'}}>Course</Button>
                <Button variant={value== 2?"contained":"outlined"} value="2" onClick={handleChange} color='success' sx={{fontWeight:'bold'}}>Department</Button>
                {/* <Button variant={value== 3?"contained":"outlined"} value="3" onClick={handleChange} color='warning'>Item3</Button> */}
            </Box>
                <TabContext value={value}>
                    <TabPanel value="1">
                        <Courses/>
                    </TabPanel>
                    <TabPanel value="2">
                        <Departments/>
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
}