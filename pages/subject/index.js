import { Grid, Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { BASE_URL } from "../../commonVariable";
import NextLink from "next/Link";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from 'react-redux';



function subjectIndex() {
  const data = useSelector((store)=>store.user);
  const [noticeData, setnoticeData] = useState([]);
  const btnData = (
    <NextLink href="/subject/addSubject">
      <Button variant="contained" sx={{ ml: "auto" }}>
        Add Subject
      </Button>
    </NextLink>
  );
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
  },[]);
  return (
    <BaseCard
      title="Subject List"
      
      button={data.userData.user_data.type=='admin'?"true":"false"}
      buttonData={btnData}
      sx={{ overFlow: "scroll" }}
    >
      <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Tittle
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Created at
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noticeData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {item.id}
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
                      <NextLink href={"/notices/"+item.id}><Button variant="contained" color="success">View</Button></NextLink>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </BaseCard>
  );
}

export default subjectIndex;
