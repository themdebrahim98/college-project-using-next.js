import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
  Button
} from "@mui/material";

const BaseCard = (props) => {
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Typography sx={{fontWeight:700}} variant={props.titleSize !=""?props.titleSize:"h4"}>{props.title}</Typography>
        {props.button == "true" ? props.buttonData : ""
          }
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
