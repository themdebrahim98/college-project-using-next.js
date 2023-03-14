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
function notices() {
  const data = useSelector((store)=>store.user);
  console.log(data.userData.user_data.type);
  const [noticeData, setnoticeData] = useState([]);
  const btnData = (
    <NextLink href="/notices/addNotice">
      <Button variant="contained" sx={{ ml: "auto" }}>
        Add Notice
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
      // console.log(allTeachers, "allkjdscnkvn");
      setnoticeData(allNotices);
    };
    fetchNotice();
  },[]);
  console.log(Cookies.get("access_key"));
 
  const products = [
    {
      id: "1",
      title: "Sunil Joshi",
      views: "Web Designer",
    },
    {
      id: "2",
      title: "Sunil Joshi",
      views: "Web Designer",
    },
    {
      id: "3",
      title: "Sunil Joshi",
      views: "Web Designer",
    },
    {
      id: "4",
      title: "Sunil Joshi",
      views: "Web Designer",
    },
  ];
  return (
    <BaseCard
      title="Notice List"
      button="true"
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
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noticeData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {product.id}
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
                        {product.title}
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
                      <NextLink href={"/notices/"+product.id}><Button variant="contained" color="success">View</Button></NextLink>
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

export default notices;
