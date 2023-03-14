import React, { useState,useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { styled } from "@mui/material/styles";
import { BASE_URL } from "../../commonVariable";
import {
  Grid,
  Button,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NexLink from 'next/link';
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import axios from "axios";
function viewNotice() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const router = useRouter();
  const noticeId = router.query.notice_id;
  const [noticeData, setnoticeData] = useState([]);
  const [editorData, SeteditorData] = useState('');
  useEffect(() => {
    const token = Cookies.get("access_key")
    const getNotice = async()=>{
      const res =  await axios.post(`${BASE_URL}get_notice_by_id`,{notice_id:noticeId},{
        headers:{Authorization:`Bearer ${token}`}
      })
      setnoticeData(res.data.data.notice)
    
    }
    getNotice()
  
  
  }, [noticeId])
  
  return (
    <Grid container p={2}>
      {console.log(noticeData)}
      <Grid item xs={12} lg={12} sx={{ mb: 2 }} textAlign="start">
        <NexLink href="/notices"><Button variant="contained">
          {" "}
          <FeatherIcon icon="arrow-left" width="20" height="20" />
          Back
        </Button></NexLink>
      </Grid>
      <Grid item xs={12} lg={12} sx={{ mb: 2 }} textAlign="start">
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>
              <Typography variant="h2" sx={{ mb: 2 }} color="#26c6da">
                Notice Content {noticeId}
              </Typography>
              <p
                id="result"
                dangerouslySetInnerHTML={{ __html: editorData }}
              ></p>
            </Item>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default viewNotice;
