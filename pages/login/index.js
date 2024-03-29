import {
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { loginUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";
import Link from "next/link";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from 'sweetalert2';
import { LoadingButton } from "@mui/lab";

const style = {
  background: "rgb(238,174,202)",
  background:
    "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
  height: "100vh",
  overflow: "hidden",
};
function index() {
  const [cookies, setcookie] = useCookies(["access_key"]);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [inputs, setinputs] = useState({
    username: null,
    password: null,
  });
  const router = useRouter();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!inputs.username) {
      Swal.fire({
        position: 'top-end',
        text: 'Username required',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      setLoading(false);
    } else if (!inputs.password) {
      Swal.fire({
        position: 'top-end',
        text: 'Password required',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      setLoading(false);
    } else {
      console.log(inputs);
      const res = await axios.post("https://test.diptodiagnostic.com/api/login", {
        username: inputs.username,
        password: inputs.password,
      });
      const data = res.data.data;
      if (data.status.status == 0) {
        setLoading(false);
        Swal.fire({
          position: 'top-end',
          text: data.status.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (res.data.data.status.status == 1) {
        setcookie("access_key", res.data.data.access_key);
        const token = res.data.data.access_key;

        const res2 = await axios.post(
          "https://test.diptodiagnostic.com/api/get_user_details",
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res2.data);
        const userData = {
          user_data: { ...res2.data.data.user_data, type: res2.data.data.type },
        };
        setLoading(false);
        dispatch(loginUser(userData));
        Swal.fire({
          position: 'center',
          text: 'Login successful',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        setTimeout(() => {
          router.replace("/");
        }, 1500)

      }
    }

  };
  return (
    <Box sx={style} component="form">
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12} textAlign="center" mt={2}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/37/Maulana_Abul_Kalam_Azad_University_of_Technology_Logo.svg"
            height="180"
            width="100%"
          />
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
        <Grid item xs={12} lg={4} sx={{ mt: 2 }}>
          <BaseCard title="Login" titleSize="h1">
            <Stack spacing={2}>
              <TextField
                id="name-basic"
                label="Username"
                name="username"
                variant="outlined"
                value={inputs.username}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={inputs.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Stack>

            <Box
              display="flex"
              alignItems="right"
              sx={{ float: "right" }}
              gap={1}
              mt={2}
              mb={2}
            >
              <Typography>Are you a student?</Typography>
              <Link href="/studentSignup" style={{ color: "inherit", textDecoration: 'none' }}>
                <Button variant="contained" color="warning" size="small">
                  Register here
                </Button>
              </Link>
            </Box>

            <Grid item xs={12} sx={{ mt: 4 }} lg={6}>
              <LoadingButton
                color="primary"
                type="submit"
                onClick={handleSubmit}
                loading={loading}
                loadingPosition="start"
                startIcon={<Login />}
                variant="contained"
              >
                <span>Login</span>
              </LoadingButton>
            </Grid>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
    </Box>
  );
}

export default index;
