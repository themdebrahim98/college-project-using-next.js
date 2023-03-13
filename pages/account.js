import React from 'react'
import { Grid, Stack, TextField, Button, IconButton,Container,Typography, Card } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { useSelector } from 'react-redux';
function account() {
const data = useSelector((store)=>store.user);
console.log(data);
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
            <Typography
              variant="h4"
            //   fontWeight="700"
            >
              UserID : STDNT_10000120079
            </Typography>
            <Typography
              variant="h4"
            //   fontWeight="700"
            >
              Name : Debanjan
            </Typography>
            <Typography
              variant="h4"
            //   fontWeight="700"
            >
              Email : deban@16189251@gmail.com
            </Typography>
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
