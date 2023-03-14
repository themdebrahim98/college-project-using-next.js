import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";

import userimg from "../../../assets/images/users/avatr.png";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";

import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
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
    router.replace("login");
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Image
            src={userimg}
            alt={userimg}
            width="30"
            height="30"
            className="roundedCircle"
          />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
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
              <ListItemButton>
                <NextLink href="/account">
                  <ListItemText primary="Account" />
                </NextLink>
              </ListItemButton>
              <ListItemButton>
                <NextLink href="/changePassword">
                  <ListItemText primary="Change Password" />
                </NextLink>
              </ListItemButton>
              {/* <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton> */}
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link to="/">
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
