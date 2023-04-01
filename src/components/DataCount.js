import React from "react";
// import BaseCard from "../../baseCard/BaseCard";
import { Typography ,Card,CardContent} from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {Box} from "@mui/material";
const DataCount = (props) => {
  return (
    <Card sx={{background:'#fffff', height:'120px', borderRadius:'15px'}}>
      {/* <Box p={2} display="flex" alignItems="center">
        <Typography variant="h4">{props.title}</Typography>
        {props.button == "true" ? props.buttonData : ""
          }
      </Box> */}
      <CardContent >
        <Box sx={{display:'flex'}} gap={2} alignItems='center'>
        <GroupAddIcon/>
        <Typography variant="h5">{props.title}</Typography>
        </Box>
        <Typography variant="h2" sx={{ml:1,mt:1}}>{props.data}</Typography>
      </CardContent>
    </Card>
  );
};

export default DataCount;
