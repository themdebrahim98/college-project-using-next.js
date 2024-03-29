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
import ErrorImage from "/public/static/images/backgrounds/error_404.png";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
export default function Error() {
  const router = useRouter();
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
                alt="Page not found"
                style={{width:'100%',height:'100%'}}
              />
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.back()}>
                <FeatherIcon
                  icon='corner-up-left'
                  width="20"
                  height="20"
                />
                 Back
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}></Grid>
      </Grid>
    </Container>
  );
}
