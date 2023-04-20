import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { BookmarkAdd, Save } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";



export default function giveMarks(props) {
  const { data: examData, marksStudent, examId } = props;
  console.log(marksStudent)

  const user = useSelector(
    (state) => state.user.userData.user_data?.hod_data[0]
  );

  const [allStudentOfCourse, setallStudentOfCourse] = useState(marksStudent)
  const [marksOfStudents, setmarksOfStudents] = useState(marksStudent)



  const handleUpdate = async () => {

    const token = Cookies.get("access_key");
    const temp = marksOfStudents.map((student) => {
      if (student.marks_details != null) {
        if (student.marks_details?.marks === "" || student.marks_details?.marks == null ) {
          student.marks_details.marks = 0;
        }
      }
      return ([student.student_id, student.marks_details.marks, student.marks_details?.remarks])
    })

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}update_student_exam_marks`,
      { exam_id: examId, student_ids_and_marks: temp },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if(res.data.data.status == 1){
      
        Swal.fire({
          icon: 'success',
          title: 'You have successfully given marks',
          showConfirmButton: true,
          confirmButtonText: 'I understand..!'
        })
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Something went wrong!',
        showConfirmButton: true,
        confirmButtonText: 'I understand..!'
      })
    }

    console.log(res.data)
  }


  function handleMarksChange(id, value, type) {
    if (type === "marks") {

      if (value >= 0 && value <= examData[0].total_marks) {
        const updatedMarks = marksOfStudents.map(student => {
          if (student.student_id === id) {
            return {
              ...student,
              marks_details: { ...student.marks_details, [type]: value } // Convert the input value to an integer, or 0 if it's not a valid number
            };
          }
          return student;
        });
        setmarksOfStudents(updatedMarks);

      } else {
        alert(`Please fills between in -1 to ${examData[0].total_marks} range`)
      }

    } else {
      const updatedMarks = marksOfStudents.map(student => {
        if (student.student_id === id) {
          console.log("ok")
          return {
            ...student,
            marks_details: { ...student.marks_details, remarks: value } // Convert the input value to an integer, or 0 if it's not a valid number
          };
        }
        return student;
      });
      setmarksOfStudents(updatedMarks);
    }


  }

  React.useEffect(() => {
    const token = Cookies.get("access_key");

    const fetchAllApprovedStudents = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}get_all_students`,
          { department_id: user.department_id, course_id: user.course_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data)

        const allStudents = res.data.data.students.map((elm) => ({
          ...elm,
          dob: new Date(elm.dob).toLocaleDateString(),
        }));
        console.log(allStudents);
        setallStudentOfCourse(allStudents)

      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApprovedStudents();
  }, [examData])



  return (
    <Box component={Paper}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ md: "row", xs: "column" }}
        justifyContent={{ md: "space-between", xs: "center" }}
        px={{ lg: 2, md: 2, sm: 0 }}
        py={2}
        gap={2}
      >
        <Typography variant="h2" sx={{ ml: 1, fontWeight: "bold" }}>
          Students List
        </Typography>
        <TextField
          id="session"
          label="Session"
          defaultValue={examData[0].session_name}
          color="primary"
          disabled
          variant="standard"
        />

        <TextField
          defaultValue={examData[0].subject_name}
          id="subject"
          label="Subject"
          disabled
          color="primary"
          variant="standard"
        />
        {/* <Fab variant="extended" size='small' color="success" title='give marks'>
                    <Save sx={{ mr: 1 }} /> Save
                </Fab> */}
        <Button variant="contained" color="success" startIcon={<Save />} onClick={() => handleUpdate()}>
          Save
        </Button>
      </Box>
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
                  Name
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
                  Marks
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
                  Remarks
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marksOfStudents.length > 0 && marksOfStudents.map((student, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {/* {student.first_name + " " + student.last_name} */}
                  {student.student_name}
                </TableCell>
                <TableCell>
                  <TextField
                    name="marks"

                    value={student.marks_details && student.marks_details?.marks != null ? student.marks_details?.marks : 0}
                    variant="standard"
                    type="number"
                    size="small"
                    onChange={(e) => handleMarksChange(student.student_id, e.target.value, "marks")}
                    inputProps={{ min: "-1", max: examData.total_marks }}


                  />
                </TableCell>
                <TableCell>
                  <TextField onChange={(e) => handleMarksChange(student.student_id, e.target.value, "remarks")} value={student.marks_details != null ? student.marks_details.remarks : ""} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies["access_key"]
  const id = context.params.id
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}get_exam_by_id`,
    { exam_id: id },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const res3 = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}get_students_with_exam_marks`,
    { exam_id: id },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const marksStudent = res3.data.data.students;
  console.log(marksStudent)
  const exam = res.data.data.exams;




  return {
    props: {
      data: exam,
      marksStudent,
      examId: id
    }, // will be passed to the page component as props
  }
}