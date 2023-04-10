import React, { useState } from 'react'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: "30%", xs: "80%", sm: "50%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  minHeight: "70%",
};

import {
  Typography,
  Box,
  Modal,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import TimePicker from './TimePicker';
function UpdateClassModal({ open3, handleModal1Close3, inputData, handleInputChange, updateClass }) {

  return (
    <div>
      <Modal
        open={open3}
        onClose={handleModal1Close3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          gap={5}
          display="flex"
          flexDirection="column"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ fontWeight: 500, textAlign: "center" }}
            component="h2"
          >
           Update Class 
          </Typography>

          <Box
            sx={{ minWidth: 120 }}
            display="flex"
            flexDirection="column"
            gap={5}
          >
            <TextField
              minRows="2"
              multiline
              name='remarks'
              value={inputData.remarks}
              id="outlined-basic"
              variant="outlined"
              label="remarks"
              onChange={handleInputChange}
            />
           

            <TimePicker

            />


            <Button
              onClick={updateClass}
              type="submit"
              variant="contained"
              sx={{ marginTop: "25px" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

    </div>
  )
}

export default UpdateClassModal
