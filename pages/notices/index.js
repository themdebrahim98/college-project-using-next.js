import {
  Grid, Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Fab,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from 'react-redux';
import { AddCircle, Preview, RemoveRedEye } from "@mui/icons-material";



function notices({ token }) {
  console.log(token, 'check')
  const data = useSelector((store) => store.user);
  const [noticeData, setnoticeData] = useState([]);
  const btnData = (
    <Link style={{ color: "inherit", textDecoration: 'none' }} href="/hod/addNotice">
      <Button variant="contained" size="small" startIcon={<AddCircle />} sx={{ ml: "auto", fontWeight: "bold" }}>
        Add Notice
      </Button>
      {/* <Fab variant="extended" size="small" color="primary" title="add notice">Add Notice</Fab> */}
    </Link>
  );
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

  return (

    <BaseCard
      title="Notice List"
      titleSize="h2"
      button={data && data.userData?.user_data?.type == 'teacher' && data.userData?.user_data?.is_hod == 1 ? "true" : "false"}
      buttonData={btnData}
    // sx={{ overFlow: "scroll" }}
    >
      <TableContainer style={{ overflowX: "auto" }} className="table_scroll">
        <Table
          aria-label="simple table"
          sx={{
            // mt: 3,
            whiteSpace: "nowrap",
          }}
          size="small"
        >
          <TableHead sx={{ background: '#03c9d7' }}>
            <TableRow>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                >
                  Sl. No.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                >
                  Tittle
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                >
                  Created at
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                >
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noticeData.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {idx + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {new Date(item.created_at).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Link style={{ color: 'inherit', textDecoration: 'none' }} href={"/notices/" + item.id}>
                        {/* <Button variant="contained" color="success" size="small">View</Button> */}
                        <Fab variant="extended" size="small" color="success" title="view notice"><Preview /></Fab>
                      </Link>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
}

export default notices;


