import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Button,
  Collapse,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Modal,
  IconButton,
  Link,
} from "@mui/material";
import { Add, ArrowCircleUp, ControlPoint, Download, Edit, ExpandMore, Save, UpdateOutlined, UploadFile } from "@mui/icons-material";
import axios from "axios";
import data from "../../../public/data.json";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Toast } from "../../../src/Helper/functions";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export
  function StudentCareer() {

  const [open, setOpen] = React.useState(false);


  const [openform, setOpenform] = useState(false);
  const [allData, setallData] = useState(data);
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const [companyName, setcompanyName] = useState("");
  const [designation, setdesignation] = useState("");
  const [source, setsource] = useState("");
  const [allJobData, setallJobData] = useState([]);

  const user = useSelector((state) => state?.user?.userData?.user_data);
  console.log(user);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchAllJobData = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}get_job_data_by_student_id`,
      {
        student_id: user?.student_id,
      },
      { headers: { Authorization: `Bearer ${Cookies.get("access_key")}` } }
    );

    setallJobData(res.data.data.jobData);
  };
  useEffect(() => {
    fetchAllJobData();
  }, []);

  const handleCountry = (e) => {
    // e.preventDefault()
    const filterCountry = allData.filter(
      (country) => country.id === e.target.value
    );
    setcountry(filterCountry);
    setstate([])
    setcity([])
  };
  const handleState = (e) => {
    const filterState = country[0]?.states.filter(
      (state) => state.id === e.target.value
    );
    setstate(filterState);
    setcity([])
  };
  const handleCity = (e) => {
    const filterCity = state[0]?.cities.filter(
      (city) => city.id === e.target.value
    );
    setcity(filterCity);
  };

  const addJob = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}add_job_data`,
      {
        student_id: user.student_id,
        company_name: companyName,
        company_loctaion: `${country[0].name},${state[0].name},${city[0].name}`,
        designation: designation,
        source: source,
      },
      { headers: { Authorization: `Bearer ${Cookies.get("access_key")}` } }
    );

    if (res.data.data.status == 1) {
      Toast.fire({
        icon: 'success',
        title: 'Successfully Added Job Data',
        timerProgressBar:false
      })
      fetchAllJobData();
      setcompanyName("");
      setsource("")
      setcity([])
      setcountry([])
      setstate([])
      setdesignation("")
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Something Went Wrong!',
        timerProgressBar:false
      })
    }
  };

  const handleButtonClick = () => {
    setOpenform(!openform);
  };

  return (
    <Box component={Paper}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h1" component="h1" sx={{ textAlign: "center" }}>
            Fills Data
          </Typography>


          <Box>
            <InputLabel for='offer_letter'> offer letter</InputLabel>
            <TextField id="offer_letter" name="offer_letter" type="file" />
            <InputLabel sx={{ mt: 2 }} for='joining_letter'> joining letter</InputLabel>
            <TextField id="jining_letter" name="joinin_letter" type="file" />
            <Button sx={{ mt: 2 }} variant="contained" color="primary"> Upload</Button>
          </Box>


        </Box>
      </Modal>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        justifyContent={{ md: "space-between", xs: "center" }}
        gap={1}
        px={1}
        py={1}
        sx={{ mb: 2, flexWrap: "wrap" }}
      >
        <Box>
          <Typography variant="h3" component="span" fontWeight={'bold'}>
            Status : Employeed
            <IconButton
              color="warning"
              title="Update status"
            >
              <ArrowCircleUp />
            </IconButton>
          </Typography>

        </Box>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          color="warning"
          startIcon={<ControlPoint />}
        >
          <Typography variant="h6" component="span" >
            Add Job
          </Typography>
        </Button>
      </Box>

      <Collapse in={openform}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ md: "row", xs: "column" }}
          justifyContent="center"
          gap={1}
          px={1}
          py={1}
          sx={{ mb: 2, flexWrap: "wrap" }}
        >
          <TextField
            label="company name"
            name="company"
            value={companyName}
            onChange={(e) => {
              setcompanyName(e.target.value);
            }}
          />
          <TextField
            label="designation"
            name="designation"
            value={designation}
            onChange={(e) => {
              setdesignation(e.target.value);
            }}
          />
          {/* <TextField
            label="through/source"
            name="source"
            value={source}
            onChange={(e) => {
              setsource(e.target.value);
            }}
          /> */}
          <FormControl>
            <InputLabel id="source-label">Source</InputLabel>
            <Select
              sx={{ width: 150 }}
              labelId="source-label"
              id="source"
              label="Source"
              name="source"
              value={source}
              onChange={(e) => {
                setsource(e.target.value);
              }}
            >
              <MenuItem value='OffCampus'>OffCampus</MenuItem>
              <MenuItem value='OnCampus'>OnCampus</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              sx={{ width: 200 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country[0]?.name}
              label="country"
              onChange={handleCountry}
            >
              {allData.map((counry) => (
                <MenuItem value={counry.id}>{counry.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              disabled={country.length <= 0}
              sx={{ width: 200 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state[0]?.name}
              label="state"
              onChange={handleState}
            >
              {country &&
                country[0]?.states.map((state) => (
                  <MenuItem value={state.id}>{state.name}</MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              disabled={state.length <= 0}
              sx={{ width: 200 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city[0]?.name}
              label="city"
              onChange={handleCity}
            >
              {state &&
                state[0]?.cities?.map((city) => (
                  <MenuItem value={city.id}>{city.name}</MenuItem>
                ))}
            </Select>
          </FormControl>

          {
            console.log(country.length, state.length, city.length)
          }
          <Button
            disabled={country.length <= 0 || state.length <= 0 || city.length <= 0 || companyName == "" || designation === "" || source === ""}
            variant="contained"
            size="medium"
            color="success"
            startIcon={<Save />}
            onClick={addJob}
          >
            Save
          </Button>
        </Box>
      </Collapse>

      <TableContainer sx={{ overflowX: "auto", p: 1 }} className="table_scroll">
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
          }}
          size="small"
        >
          <TableHead sx={{ background: "#03c9d7" }}>
            <TableRow>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Company Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Company Location
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Source(OffCampus/OnCampus)
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Designation
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Offer Letter
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Joining Letter
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allJobData.length > 0 &&
              allJobData.map((elm) => (
                <TableRow>
                  <TableCell>
                    <Typography>{elm.company_name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{elm.company_loctaion}</Typography>
                  </TableCell>


                  <TableCell>
                    <Typography>{elm.source}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {elm.designation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {elm.offer_letter == null ? <IconButton color="warning"><UploadFile /></IconButton> : <Link href={elm.offer_letter_url}><IconButton color="success"><Download /></IconButton></Link>}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {elm.joining_letter == null ? <IconButton color="warning"><UploadFile /></IconButton> : <Link href={elm.joining_letter_url}><IconButton color="success"><Download /></IconButton></Link>}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {/* <Button
                        color="secondary"
                        onClick={handleOpen}
                        variant="contained"
                        startIcon={<UploadFile/>}
                      >
                      </Button> */}
                      <IconButton color="primary"><Edit /></IconButton>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StudentCareer;
// export async function getStaticProps() {
//   // Fetch the data from the JSON file
//   const response = await import('/public/data.json');
//   const data = await response.json();

//   // Pass the data as a prop to the page component
//   return { props: { data } };
// }
