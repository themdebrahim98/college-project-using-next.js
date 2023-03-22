import * as React from "react";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import Image from "next/image";
import ErrorImage from "../assets/images/backgrounds/error_404.png";
import FeatherIcon from "feather-icons-react";
import Link from "next/link"
export default function Error() {
  return (
    <Container sx={{ height: "100%" }}>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={3}></Grid>
        <Grid item xs={12} lg={6} sx={{ mt: 3 }} textAlign="center">
          <Typography variant="h2">Page not found</Typography>
          <Card>
            <CardContent>
              <Image
                // loader={myLoader}
                src={ErrorImage}
                alt="Picture of the author"
              />
              {/* <Typography variant="h4">About Card</Typography>
              <Typography variant="body1">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography> */}
              <Link style={{color:"inherit", textDecoration:'none'}} href="/"><Button variant="contained" sx={{ mt: 2 }}>
                <FeatherIcon
                  icon='corner-up-left'
                  width="20"
                  height="20"
                />
                 Back
              </Button></Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}></Grid>
      </Grid>
    </Container>
  );
}
