import { Button, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from "react";
import Classes  from '../Components/Classes'
import { Download, DownloadDoneOutlined } from '@mui/icons-material'

function studentClass() {

  const [clickDownload, setClickDownload] = useState(false);
  const [DownloadLoading, setDownloadLoading] = useState(false);
  const handleDownloadRoutineClick=()=> {
    setDownloadLoading(true);
    setTimeout(() => {
      setDownloadLoading(false);
      setClickDownload(true);
    }, 1000);

    setTimeout(() => {
      setClickDownload(false);
    }, 2000);

  }
  return (
    <>
    <Box >
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ md: 'row', xs: 'column' }}
        justifyContent={{ md: 'center', xs: 'center' }}
        p={{ lg: 2, md: 2, sm: 0 }}
        gap={2}
      >
        <Button variant='contained' sx={{background:'#e5383b',color:'#fff'}} color='success' onClick={handleDownloadRoutineClick} size='small' startIcon={clickDownload?<DownloadDoneOutlined/>:<Download/>}>{DownloadLoading?'Downloading..':'Download Routine'}</Button>
      </Box>
    </Box>
    <Classes/>
    </>
  )
}

export default studentClass
