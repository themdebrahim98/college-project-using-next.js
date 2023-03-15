import React, { useState, useEffect } from "react";
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
import NexLink from "next/link";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import axios from "axios";
import { element } from "prop-types";
function viewNotice() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: "",
    ...theme.typography.body2,
    padding: "",
    // textAlign: "center",
    color: "",
  }));
  const router = useRouter();

  console.log(router.back);
  const noticeId = router.query.notice_id;
  const [noticeData, setnoticeData] = useState([]);
  const [editorData, SeteditorData] = useState("");
  useEffect(() => {
    const token = Cookies.get("access_key");
    const getNotice = async () => {
      const res = await axios.post(
        `${BASE_URL}get_notice_by_id`,
        { notice_id: noticeId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setnoticeData(res.data.data.notice);
    };
    getNotice();
  }, [noticeId]);

  return (
    <Grid container p={2}>
              {noticeData != undefined
          ? noticeData.map((elment, idx) => (
              <>
      <Grid
        item
        xs={12}
        lg={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          mb:2,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {/* <Item2> */}
          <Button variant="contained" onClick={() => router.back()}>
            {" "}
            <FeatherIcon icon="arrow-left" width="20" height="20" />
            Back
          </Button>
        {/* </Item2> */}
                {/* <Item2 > */}
                  <Typography variant="h3" textAlign="end" color="">
                    <b>Subject</b>: {elment.title}
                  </Typography>
                {/* </Item2> */}
                {/* <Item2> */}
                <NexLink href={BASE_URL+"download_notice_by_id?notice_id="+elment.id}>
                <a target="_blank" style={{textDecoration: 'none'}}><Button variant="contained" color="success">
                    {" "}
                    <FeatherIcon icon="download-cloud" width="20" height="20" />
                    Download
                  </Button></a>
                  </NexLink>
                {/* </Item2> */}
                
      </Grid>

      {/* <Grid item xs={12} lg={6} sx={{ mb: 2 }} textAlign="start">
        <Button variant="contained" onClick={() => router.back()}>
          {" "}
          <FeatherIcon icon="arrow-left" width="20" height="20" />
          Back
        </Button>
      </Grid> */}
      <Grid item xs={12} lg={12} sx={{ mb: 2 }} textAlign="start">
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>
              <p dangerouslySetInnerHTML={{ __html: elment.description }}></p>
            </Item>
          </Stack>
        </Box>
      </Grid>
      </>
      ))
    : ""}
    </Grid>
  );
}

export default viewNotice;
