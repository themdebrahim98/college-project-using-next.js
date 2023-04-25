import { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Box, Container, Stack } from '@mui/system';
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material';

function StudentAccountDetails(props) {
  const [chaneBtn,setChnageBtn]=useState(true);
  const [studentDetails, setStudentDetails] = useState({
    student_id: props.userData.student_id,
    first_name: props.userData.first_name,
    last_name: props.userData.last_name,
    phone_number: props.userData.phone_number,
    email_address: props.userData.email_address,
    parent_name: props.userData.parent_name,
    parent_phone_number: props.userData.parent_phone_number,
    gender: props.userData.gender,
    dob: props.userData.dob,
    course_id: props.userData.course_id,
    department_id: props.userData.department_id,
    semester: props.userData.semester,
    year: props.userData.year,
    roll_number: props.userData.roll_number
  });

  const getInput = (e) => {
    setStudentDetails((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChangeBtnClick=()=>{
    setChnageBtn(!chaneBtn);
  }

  return (
    <Container sx={{m:1}}>
      <Grid
        display="flex"
        alignItems="center"
        flexDirection="row"
        justifyContent={{ md: "end", xs: "center" }}
        container spacing={2} component={Paper} sx={{ mb: 4 }}
      >
        <Button variant='contained' color='success' sx={{ m: 1 }} onClick={handleChangeBtnClick}>{chaneBtn?"Update Details":"Save"}</Button>
      </Grid>
      <Grid container spacing={2} component={Paper} px={2} py={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            name="first_name"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            onChange={getInput}
            value={studentDetails.first_name}
            autoComplete="off"
            InputProps={{
              readOnly: chaneBtn,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="last_name"
            autoComplete="off"
            onChange={getInput}
            value={studentDetails.last_name}
            InputProps={{
              readOnly: chaneBtn,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender-select"
              label="Gender"
              name="gender"
              onChange={getInput}
              value={studentDetails.gender}
              disabled={chaneBtn}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'others'}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dob"
            label="DOB"
            type="date"
            name="dob"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={getInput}
            value={studentDetails.dob}
            InputProps={{
              readOnly: chaneBtn,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="phone_number"
            label="Phone Number"
            name="phone_number"
            autoComplete="off"
            onChange={getInput}
            value={studentDetails.phone_number}
            InputProps={{
              readOnly: chaneBtn,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email_address"
            autoComplete="off"
            onChange={getInput}
            value={studentDetails.email_address}
            InputProps={{
              readOnly: chaneBtn,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="parent_name"
            label="Parent name"
            name="parent_name"
            autoComplete="off"
            onChange={getInput}
            value={studentDetails.parent_name}
            InputProps={{
              readOnly: chaneBtn,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="parent_phone_number"
            label="Parent phone number"
            name="parent_phone_number"
            autoComplete="off"
            onChange={getInput}
            value={studentDetails.parent_phone_number}
            InputProps={{
              readOnly: chaneBtn,
            }}
          />
        </Grid>

      </Grid>
    </Container>
  );
}

export default StudentAccountDetails;
