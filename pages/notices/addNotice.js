import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";
import FeatherIcon from "feather-icons-react";
import {
  Grid,
  Button,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NexLink from 'next/link'

function addNotice() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [editorData, SeteditorData] = useState();
  return (
    <Grid  container p={2}>
      <Grid item xs={12} lg={12} sx={{ mb: 2 }} textAlign="start">
        <NexLink href="/notices"><Button variant="contained">
          {" "}
          <FeatherIcon icon="arrow-left" width="20" height="20" />
          Back
        </Button></NexLink>{" "}
        <Button variant="contained" color="success" sx={{float:'right'}}>
          {" "}
          <FeatherIcon icon="save" width="20" height="20" />
           Create Notice
        </Button>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>
              <TextField
                id="notice_title"
                label="Enter Title"
                variant="outlined"
                fullWidth
              />
            </Item>
            <Item>
              <Typography variant="h2" sx={{ mb: 2 }} color="#26c6da">
                Notice Content
              </Typography>
              <CKEditor
                data={editorData}
              />
            </Item>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default addNotice;
