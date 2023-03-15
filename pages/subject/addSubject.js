import {
  Grid,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { BASE_URL } from "../../commonVariable";
import NextLink from "next/Link";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

function addSubject() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Item>
    <Grid container p={1} spacing={2}>
    <Grid item xs={12} lg={12} sx={{ mb: 2 }} textAlign="start">
      <Typography variant="h3" textAlign="start" color="">
        <b>Add subject</b>
      </Typography>
    </Grid>
    {/*  */}
    <Grid item xs={12} lg={6} sx={{ mb: 2 }} textAlign="start">
      <TextField id="Name" label="Name" variant="outlined" fullWidth />

    </Grid>
    <Grid item xs={12} lg={6} sx={{ mb: 2 }} textAlign="start">
      <TextField id="Subject title" label="Subject" variant="outlined" fullWidth />

    </Grid>
    {/*  */}
  </Grid>
  </Item>
  );
}

export default addSubject;
