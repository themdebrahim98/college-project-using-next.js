import { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

function AccountDetails() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name} Email: ${email}`);
    // do something with the form data
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        sx={{ m: 2 }}
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        sx={{ m: 2 }}
        value={email}
        onChange={handleEmailChange}
      />
      <Button type="submit" variant="contained" sx={{ m: 2 }}>
        Submit
      </Button>
    </FormContainer>
  );
}

export default AccountDetails;
