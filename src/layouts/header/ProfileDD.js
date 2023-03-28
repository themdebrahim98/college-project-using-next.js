import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import userimg from "../../../assets/images/users/avatr.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";

import {
  Box,
  Menu,
  Typography,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

import router from "next/router";
const ProfileDD = () => {
  const user = useSelector((state) => state.user);
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleLogOut = () => {
    document.cookie =
      "access_key" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    dispatch(logout());
    router.replace('/login');
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
        sx={{mt:'6px'}}
      >
        <Box display="flex" alignItems="center">
          <Image
            src='/static/images/users/user_avtar.png'
            alt='/static/images/users/user_avtar.png'
            width="45"
            height="45"
            className="roundedCircle"
          />
          {/* {console.log(user.userData.user_data.type)} */}
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            {/* <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              // sx={{ ml: 1 }}
            >
            </Typography> */}
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {user &&
                user.userData.user_data?.first_name &&
                user.userData.user_data?.last_name
                ? `${user.userData.user_data?.first_name} ${user.userData.user_data?.last_name} `
                : null}

              {user && user.userData.user_data?.name
                ? `${user.userData.user_data?.name} `
                : null}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "250px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              {/* <ListItemButton>
                <ListItemText primary="Edit Profile" />
              </ListItemButton> */}
              <ListItemButton
                variant="h5"
                fontWeight="bold"
              >
                <ListItemAvatar>
                  <Avatar
                    // alt={`Avatar n°${value + 1}`}
                    src='static/images/users/user_avtar.png'
                  />
                </ListItemAvatar>
                {user &&
                  user.userData.user_data?.first_name &&
                  user.userData.user_data?.last_name
                  ? `${user.userData.user_data?.first_name} ${user.userData.user_data?.last_name} `
                  : null}

                {user && user.userData.user_data?.name
                  ? `${user.userData.user_data?.name} `
                  : null}
              </ListItemButton>
              <ListItemButton>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} href="/account">
                  <ListItemText primary={'Account('+(user.userData.user_data?.is_hod==1?'HOD':user.userData.user_data?.type)+')'} />
                </Link>
              </ListItemButton>
              <ListItemButton>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} href='/changePassword'>
                  <ListItemText primary="Change Password" />
                </Link>
              </ListItemButton>
              {/* <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton> */}
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }} >
              <Button
                onClick={handleLogOut}
                fullWidth
                variant="contained"
                color="primary"
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
