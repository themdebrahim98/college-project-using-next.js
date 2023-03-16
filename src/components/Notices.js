import React, { useState, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import BaseCard from "./baseCard/BaseCard";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import NextLink from "next/link";
import { BASE_URL } from "../../commonVariable";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";

function Notices() {
  const [noticeData, setnoticeData] = useState([]);
  useEffect(() => {
    const token = Cookies.get("access_key");

    const fetchNotice = async () => {
      const res = await axios.post(`${BASE_URL}get_all_notice`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data.data.notices);
      const allNotices = res.data.data.notices.map((elm, idx) => {
        return elm;
      });
      setnoticeData(allNotices);
    };
    fetchNotice();
  }, []);
  const btnData = (
    <>
      <NextLink href="/notices">
        <Button variant="contained" sx={{ ml: "auto" }}>
          View all
        </Button>
      </NextLink>
      <Divider/>
      {/* <NextLink href="https://course.ccs.neu.edu/cs5100f11/resources/jakkula.pdf">
        <a target="_blank">
          <Button variant="contained" sx={{ ml: "auto" }}>
            download
          </Button>
        </a>
      </NextLink> */}
    </>
  );

  return (
    <BaseCard title="Recent Notices" button="true" buttonData={btnData}>
      <Timeline
        sx={{
          p: 0,
        }}
      >
        {noticeData.slice(0, 5).map((activity) => (
          <TimelineItem key={activity.id}>
            <TimelineOppositeContent
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                flex: "none",
                width: "180px",
              }}
            >
              {new Date(activity.created_at).toLocaleString()}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                // sx={{
                //   borderColor: activity.title,
                // }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{
                fontSize: "14px",
              }}
            >
              <NextLink href={"/notices/" + activity.id}>
                <a style={{ textDecoration: "none" }}>{activity.title}</a>
              </NextLink>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </BaseCard>
  );
}

export default Notices;
