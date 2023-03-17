import {
  Grid,
  Stack,
  TextField,
  Button,
  IconButton,
  Typography,
  Box
} from "@mui/material";

import { Container } from "@mui/system";
import React, { useState } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { loginUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";
import NextLink from 'next/link';
import { HowToReg, Login } from "@mui/icons-material";

function index() {
  const [cookies, setcookie] = useCookies(["access_key"]);
  const [loading, setLoading] = useState(false);
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
    console.log(inputs);
    const res = await axios.post("https://test.diptodiagnostic.com/api/login", {
      username: inputs.username,
      password: inputs.password,
    });
    const data = res.data.data;
    if (data.status.status == 0) {
      setLoading(false);
      alert(data.status.message);
    } else {
      setcookie("access_key", res.data.data.access_key);

      if (res.data.data.status.status == 1) {
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
        console.log(userData, "user");

        setLoading(false);
        dispatch(loginUser(userData));
        router.replace("/");
      }
    }

    console.log(res.data.data);
  };
  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12} textAlign="center" mt={4}>
        <img src="https://upload.wikimedia.org/wikipedia/en/3/37/Maulana_Abul_Kalam_Azad_University_of_Technology_Logo.svg" height="180" width="100%"/>
        </Grid>
      <Grid item xs={12} lg={2}></Grid>
        <Grid item xs={12} lg={8} sx={{ mt: 2 }}>
          <BaseCard title="Login" titleSize="h1">
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                label="Username"
                name="username"
                variant="outlined"
                value={inputs.username}
                onChange={(e) => handleChange(e)}
                autoComplete="on"
              />
              <TextField
                autoComplete="on"
                id="name-basic"
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={inputs.password}
                onChange={(e) => handleChange(e)}
              />
            </Stack>

            <Box display='flex' alignItems='right' sx={{float:"right"}} gap={1} mt={2} mb={2}>
              <Typography>Are you a student?</Typography>
             <NextLink href='/student/studentSignup'><Button variant="contained" color="warning" size="small">Register here</Button></NextLink>
            </Box>

            <Grid item xs={12} sx={{ mt: 4 }} lg={6}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                onClick={handleSubmit}
                startIcon={<Login/>}
              >
                {loading ? "Loging..." : "Login"}
              </Button>
            </Grid>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={2}></Grid>
      </Grid>
    </Container>
  );
}

export default index;
