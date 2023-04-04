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
  MenuItem,
  Select
} from "@mui/material";
import TimePicker from './TimePicker';
function CreateClassModal({ open2, handleModal1Close2, currSubId, inputData, setinputData, handleInputChange, handleCreateClass ,allSubjects}) {

  return (
    <div>
      <Modal
        open={open2}
        onClose={handleModal1Close2}
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
            
            Create class
          </Typography>

          <Box
            sx={{ minWidth: 120 }}
            display="flex"
            flexDirection="column"
            gap={5}
          >
            <TextField
              name='topic'
              value={inputData.topic}
              id="outlined-basic"
              variant="outlined"
              label="topic"
              onChange={handleInputChange}
            />
            <Select>
              {
                allSubjects.map((elm, idx)=>{
                  return(
                    <MenuItem value={elm.id}>{elm.name}</MenuItem>
                  )
                })
              }
              
              

            </Select>
            

          


            <Button
              onClick={handleCreateClass}
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

export default CreateClassModal;
