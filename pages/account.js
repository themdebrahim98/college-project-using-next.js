import React from 'react'
import { Grid, Stack, TextField, Button, IconButton,Container,Typography, Card } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { useSelector } from 'react-redux';
import { commonConstants } from '../src/constant/common.constant';
function account() {
const data = useSelector((store)=>store.user);
console.log(data.userData.user_data);
  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12} sx={{ mt: 2 }}>
          <Card p={2}>
            <Typography
              variant="h2"
            //   fontWeight="700"
            sx={{mb:2}}
            >
              Account Details
            </Typography>
            <Stack spacing={1}>
            {data.userData.user_data.type == commonConstants.userTypeAdmin ?<>
            <Typography
              variant="h4"
            //   fontWeight="700"
            >
              Name : {data.userData.user_data.id}
            </Typography>
            <Typography
              variant="h4"
            //   fontWeight="700"
            >
              Type : {data.userData.user_data.type}
            </Typography></>:<><Typography
              variant="h4"
            //   fontWeight="700"
            >
              <b>UserId</b> : {data.userData.user_data.id}
            </Typography>
            <Typography
              variant="h4"
            //   fontWeight="700"
            >
              <b>Name</b> : {data.userData.user_data.first_name+" "+data.userData.user_data.last_name}
            </Typography>
            <Typography
              variant="h4"
            //   fontWeight="700"
            >
             <b>Gender</b> : {data.userData.user_data.gender}
            </Typography>
            <Typography
              variant="h4"
            //   fontWeight="700"
            >
              <b>Email</b> : {data.userData.user_data.email_address}
            </Typography></>}
            </Stack>
            {/* <Grid item xs={12} sx={{ mt: 4 }} lg={6}>
              <Button variant="contained" color="primary" >
                Change
              </Button>
            </Grid> */}
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default account
