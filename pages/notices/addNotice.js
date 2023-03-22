import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  Alert,
  AlertTitle,
  Snackbar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NexLink from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function addNotice() {
  const [editorData, SeteditorData] = useState();
  const [title, settitle] = useState("");
  const [openAlert, setopenAlert] = useState(false)
  const user = useSelector((store) => store.user);
  const router = useRouter()
  const handleSubmitNotice = async () => {
    if(title !="" && editorData!=null){
      const token = Cookies.get("access_key");
      const data = {
        department_id: user.userData.user_data.hod_data[0].department_id,
        course_id: user.userData.user_data.hod_data[0].course_id,
        title,
        description: editorData,
        created_by:
          user.userData.user_data.first_name +
          " " +
          user.userData.user_data.last_name,
      };
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}add_notice`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setopenAlert(true)
      router.back()
      

    
  }else{
    alert("Please fills data")
  }
  }
   
  
  const handleClose = () => {
    setopenAlert(false);
  };
  return (
    <Grid container p={2}>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         Succcessfully created notice
        </Alert>
      </Snackbar>
      <Grid item xs={12} lg={12} sx={{ mb: 2 }} textAlign="start">
        <NexLink href="/notices">
          <Button variant="contained">
            {" "}
            <FeatherIcon icon="arrow-left" width="20" height="20" />
            Back
          </Button>
        </NexLink>{" "}
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmitNotice}
          sx={{ float: "right" }}
        >
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
                name="title"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                value={title}
                id="notice_title"
                label="Enter Title"
                variant="outlined"
                fullWidth
              />
            </Item>
            {console.log(title, "ebrahim")}

            {console.log(editorData)}
            <Item>
              <Typography variant="h2" sx={{ mb: 2 }} color="#26c6da">
                Notice Content
              </Typography>
              <CKEditor
                data={editorData}
                onChange={(e) => {
                  SeteditorData(e.editor.getData());
                }}
              />
            </Item>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default addNotice;
