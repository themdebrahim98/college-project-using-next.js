import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { AppBar, Box, IconButton, Toolbar, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
// Dropdown Component
import SearchDD from "./SearchDD";
import ProfileDD from "./ProfileDD";
import { EmojiFoodBeverage, NightsStay, WbSunny } from "@mui/icons-material";

const Header = ({ sx, customClass, toggleMobileSidebar, position }) => {
  // const [timeState,setTimeState]=useState();
  var today = new Date()
  var currentHr = today.getHours()

  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        {console.log(currentHr)}
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        {/* <SearchDD /> */}
        {/* ------------ End Menu icon ------------- */}
        <Button variant="text" startIcon={currentHr>=0 && currentHr<12?<EmojiFoodBeverage />:currentHr>=12 && currentHr<18?<WbSunny/>:currentHr>=18?<NightsStay/>:""} sx={{ color: 'black', fontWeight: 'bold' }}>
          <Typography sx={{
            fontWeight: '700', fontSize: {
              lg: '25px',
              xs: '20px'
            }
          }} >
            
           {currentHr>=0 && currentHr<12?'Good morning':currentHr>=12 && currentHr<18?'Good afternoon':currentHr>=18?'Good evening':""}
          </Typography>
        </Button>
        {/* <Typography variant="h3">
          <EmojiFoodBeverage ml={1} />
          Good morning
        </Typography> */}
        <Box flexGrow={1} />

        <ProfileDD />
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;