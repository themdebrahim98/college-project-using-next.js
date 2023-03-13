import React from "react";
// import BaseCard from "../../baseCard/BaseCard";
import { Typography ,Card,CardContent} from "@mui/material";
const DataCount = (props) => {
  return (
    <Card sx={{background:props.color}}>
      {/* <Box p={2} display="flex" alignItems="center">
        <Typography variant="h4">{props.title}</Typography>
        {props.button == "true" ? props.buttonData : ""
          }
      </Box> */}
      <CardContent>
        <Typography variant="h2">{props.title}</Typography>
        <Typography variant="h2" sx={{ml:1,mt:1}}>{props.data}</Typography>
      </CardContent>
    </Card>
  );
};

export default DataCount;
