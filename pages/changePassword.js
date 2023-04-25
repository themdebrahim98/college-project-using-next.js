import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Grid, Stack, TextField, Button, IconButton, Container } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { Toast } from '../src/Helper/functions';
import axios from "axios";
import Cookies from "js-cookie";
import { Login } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
function changePassword() {
  const [loading, setLoading] = useState(false);
  const usersData = useSelector((store)=>store.user);
  const userData=usersData.userData.user_data;
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const getInput = (e) => {
    setPasswords((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const checkPasswords = (e) => {
    setConfirmPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!passwords.current_password) {
      Toast.fire({
        icon: 'error',
        title: "Enter current password",
        timerProgressBar: false,
      })
      setLoading(false);
    } else if (!passwords.new_password) {
      Toast.fire({
        icon: 'error',
        title: "Enter new password",
        timerProgressBar: false,
      })
      setLoading(false);
    } else if (passwords.new_password != confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: "Password not match",
        timerProgressBar: false,
      })
      setLoading(false);
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}update_user_password`,
        { 
          username:userData.username,
          current_password: passwords.current_password,
          new_password: passwords.new_password,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("access_key")}` },
        }
        
      );
      if(res?.data?.data?.status==1){
        setLoading(false);
        Toast.fire({
          icon: 'success',
          title: res?.data?.data?.message,
          timerProgressBar: false,
        })
      }else{
        setLoading(false);
        Toast.fire({
          icon: 'error',
          title: res?.data?.data?.status?.message,
          timerProgressBar: false,
        })
      }
    }
  }
  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12} sx={{ mt: 2 }}>
          <BaseCard title="Change your password">
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  id="current_password"
                  label="Current Password"
                  name="current_password"
                  variant="outlined"
                  autoComplete="off"
                  onChange={getInput}
                  value={passwords.current_password}
                />
                <TextField
                  autoComplete="off"
                  id="new_password"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  name="new_password"
                  onChange={getInput}
                  value={passwords.new_password}
                />
                <TextField
                  autoComplete="off"
                  id="confirm_password"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  name="confirm_password"
                  onChange={checkPasswords}
                  value={confirmPassword}
                />
              </Stack>
              <Grid item xs={12} sx={{ mt: 4 }} lg={6}>
              <LoadingButton
                color="primary"
                type="submit"
                loading={loading}
                loadingPosition="start"
                startIcon={<Login />}
                variant="contained"
              >
                <span>Change Password</span>
              </LoadingButton>
                {/* <Button variant="contained" type="submit" color="primary" >
                  Change Password
                </Button> */}
              </Grid>
            </form>
          </BaseCard>
        </Grid>
      </Grid>
    </Container>
  )
}

export default changePassword
