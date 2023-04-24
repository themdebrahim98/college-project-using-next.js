import React from 'react'
import { Grid, Stack, TextField, Button, IconButton,Container,Typography, Card } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { useSelector } from 'react-redux';
import { commonConstants } from '../src/constant/common.constant';
import AccountDetails from '../src/components/account/AccountDetails';
function index() {
const data = useSelector((store)=>store.user);
console.log(data.userData.user_data);
  return (
    <AccountDetails/>
  )
}

export default index
