import { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

function TeacherAccountDetails() {

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      Teacher
      <TextField
        label="Name"
        variant="outlined"
        sx={{ m: 2 }}
        // value={name}
        // onChange={handleNameChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        sx={{ m: 2 }}
        // value={email}
        // onChange={handleEmailChange}
      />
      <Button type="submit" variant="contained" sx={{ m: 2 }}>
        Submit
      </Button>
    </FormContainer>
  );
}

export default TeacherAccountDetails;
