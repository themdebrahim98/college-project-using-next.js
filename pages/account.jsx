import React from 'react'
import { Grid, Stack, TextField, Button, IconButton,Container,Typography, Card } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { useSelector } from 'react-redux';
import { commonConstants } from '../src/constant/common.constant';
import AdminAccountDetails from '../src/components/account/AdminAccountDetails';
import TeacherAccountDetails from '../src/components/account/TeacherAccountDetails';
import StudentAccountDetails from '../src/components/account/StudentAccountDetails';
function account() {
  const usersData = useSelector((store)=>store.user);
  const userData=usersData.userData.user_data;
  console.log(userData);
  return (
    <div>
          {usersData?.userData?.type == commonConstants.userTypeAdmin?<AdminAccountDetails userData={userData}/>:
          usersData?.userData?.type == commonConstants.userTypeTeacher?<TeacherAccountDetails userData={userData}/>:<StudentAccountDetails userData={userData}/>}
    </div>
  )
}

export default account
