import React, { useState, useEffect } from "react";
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
import OfflineImg from "/public/static/images/backgrounds/offline.png";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
export default function Error() {
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  if (isOnline) {
    // alert("you are offline");
    router.back();
  
  }

  return (
    <Container sx={{ height: "100%" }}>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={3}></Grid>
        <Grid item xs={12} lg={6} sx={{ mt: 3 }} textAlign="center">
          <Card>
            <CardContent>
              <Image
                // loader={myLoader}
                src={OfflineImg}
                alt="You Are Offline"
                style={{ width: "100%", height: "100%" }}
              />
              {/* <Typography variant="h4">About Card</Typography>
              <Typography variant="body1">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography> */}
              {/* <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.back()}>
                <FeatherIcon
                  icon='corner-up-left'
                  width="20"
                  height="20"
                />
                 Back
              </Button> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}></Grid>
      </Grid>
    </Container>
  );
}
