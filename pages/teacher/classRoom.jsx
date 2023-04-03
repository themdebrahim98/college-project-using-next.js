import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Paper } from '@mui/material';
import Classes from '../user/Components/Classes';
import { Create } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ClassRoom() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{mb:2}}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ md: "row", xs: "column" }}
          justifyContent={{ md: "end", xs: "center" }}
            p={1}
          gap={2}
        >
            <Button variant='contained' color='success' startIcon={<Create/>}>Create New</Button>
        </Box>
        </Box>
    <Box sx={{ width: '100%' }} component={Paper}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Recent Classes" {...a11yProps(0)} />
          <Tab label="Shedule a Class" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Recent Classes
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Classes/>
      </TabPanel>
    </Box>
    </>
  );
}