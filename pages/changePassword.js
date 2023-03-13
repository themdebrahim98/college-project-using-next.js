import React from 'react'
import { Grid, Stack, TextField, Button, IconButton,Container } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
function changePassword() {
  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12} sx={{ mt: 2 }}>
          <BaseCard title="Login">
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                label="Current Password"
                name="current_password"
                variant="outlined"
                autoComplete="on"
              />
              <TextField
              autoComplete="on"
                id="name-basic"
                label="New Password"
                type="password"
                variant="outlined"
                name="new_password"
              />
              <TextField
              autoComplete="on"
                id="name-basic"
                label="Confirm Password"
                type="password"
                variant="outlined"
                name="confirm_password"
              />
            </Stack>
            <Grid item xs={12} sx={{ mt: 4 }} lg={6}>
              <Button variant="contained" color="primary" >
                Change Password
              </Button>
            </Grid>
          </BaseCard>
        </Grid>
      </Grid>
    </Container>
  )
}

export default changePassword
