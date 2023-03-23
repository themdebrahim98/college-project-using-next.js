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
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";

function Notices() {
  const [noticeData, setnoticeData] = useState([]);
  useEffect(() => {
    const token = Cookies.get("access_key");

    const fetchNotice = async () => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}get_all_notice`, null, {
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
      <Link style={{color:"inherit", textDecoration:'none'}} href="/notices">
        <Button variant="contained" sx={{ ml: "25px" }}>
          View all
        </Button>
      </Link>
      <Divider/>
      {/* <Link href="https://course.ccs.neu.edu/cs5100f11/resources/jakkula.pdf">
        <a target="_blank">
          <Button variant="contained" sx={{ ml: "auto" }}>
            download
          </Button>
        </a>
      </Link> */}
    </>
  );

  return (
    <BaseCard titleSize='h4' title="Recent Notices" sx={{fontSize:'25px'}} button="true" buttonData={btnData}>
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
                sx={{
                  borderColor: "primary.main",
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{
                fontSize: "14px",
              }}
            >
              <Link legacyBehavior  href={"/notices/" + activity.id}>
                <a style={{ textDecoration: "none" }}>{activity.title}</a>
              </Link>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </BaseCard>
  );
}

export default Notices;
