import { Button, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Classes  from '../Components/Classes'

function studentClass() {
  return (
    <>
    <Box component={Paper}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ md: 'row', xs: 'column' }}
        justifyContent={{ md: 'space-between', xs: 'center' }}
        p={{ lg: 2, md: 2, sm: 0 }}
        gap={2}
      >
        <Button variant='contained' color='success' size='small'>Download Routine</Button>
      </Box>
    </Box>
    <Classes/>
    </>
  )
}

export default studentClass
