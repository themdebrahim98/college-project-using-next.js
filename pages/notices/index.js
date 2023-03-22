import { Grid, Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from 'react-redux';
import { AddCircle } from "@mui/icons-material";



function notices({token}) {
  console.log(token,'check')
  const data = useSelector((store)=>store.user);
  const [noticeData, setnoticeData] = useState([]);
  const btnData = (
    <Link style={{color:"inherit", textDecoration:'none'}} href="/notices/addNotice">
      <Button variant="contained" startIcon={<AddCircle/>} sx={{ ml: "auto",fontWeight:"bold" }}>
        Add Notice
      </Button>
    </Link>
  );
  useEffect(() => {
     const token = Cookies.get("access_key");

    const fetchNotice = async () => {
      const res = await axios.post(`${process.env.BASE_URL}get_all_notice`, null, {
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
      title="Notice List"
      
      button={data&& data.userData?.user_data?.type=='teacher' && data.userData?.user_data?.is_hod == 1?"true":"false"}
      buttonData={btnData}
      // sx={{ overFlow: "scroll" }}
    >
      <TableContainer sx={{overflow:'auto'}}>
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
                      <Link href={"/notices/"+item.id}><Button variant="contained" color="success" size="small">View</Button></Link>
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


