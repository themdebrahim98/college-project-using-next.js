import { Grid, Stack, TextField, Button, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import React,{useState} from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { loginUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

function index() {
  const [cookies, setcookie] = useCookies(["access_key"]);
  const [inputs, setinputs] = useState({
    username: null,
    password: null,
  });
  const router = useRouter()

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };
  // const parseJwt = (token) => {
  //   var base64Url = token.split(".")[1];
  //   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //   var jsonPayload = decodeURIComponent(
  //     window
  //       .atob(base64)
  //       .split("")
  //       .map(function (c) {
  //         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join("")
  //   );

  //   return JSON.parse(jsonPayload);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const res = await axios.post("https://test.diptodiagnostic.com/api/login", {
      username: inputs.username,
      password: inputs.password,
    });
    const data = res.data.data;
    if (data.status.status == 0) {
      alert(data.status.message);
    } else {
      setcookie("access_key",JSON.stringify(res.data.data.access_key) )
      
      // localStorage.setItem(  
      //   "access_key",
      //   JSON.stringify(res.data.data.access_key)
      // );
      if (res.data.data.status.status == 1) {
        // const data = parseJwt(res.data.data.access_key);
        // const token = JSON.parse(localStorage.getItem("access_key"));
        console.log(cookies.get('access_key'),"aIsxkh")

        const token =cookies.access_key;
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
        console.log(userData);

      
        dispatch(loginUser(userData));
        router.push('/')
   
      }
    }

    console.log(res.data.data);
  };
  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12} sx={{ mt: 20 }}>
          <BaseCard title="Login">
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
            <Grid item xs={12} sx={{ mt: 4 }} lg={6}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Login
              </Button>
            </Grid>
          </BaseCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default index;
