import React, { useEffect, useState } from "react";
import { store } from "../../../../redux/store/store";
import { useRouter } from "next/router";
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
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	TableCell,
	TableBody,
	Table,
	Stack,
	Chip,
} from "@mui/material";

import { useSelector } from "react-redux";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Add, ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import Cookies from "js-cookie";
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

function examDetails() {
	const [examData, setexamData] = useState([]);
	const user = useSelector(
		(state) => state.user.userData.user_data?.hod_data[0]
	);

	const router = useRouter();





	useEffect(() => {
		const id = router.query.id;
		const fetchAllStudents = async () => {
			const token = Cookies.get("access_key");
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}get_all_students`,
				{ department_id: user.department_id, course_id: user.course_id },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
		};
		const fetchExamById = async () => {
			const token = Cookies.get("access_key");
			try {
				const res = await axios.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}get_exam_by_id`,
					{ exam_id: id },
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				console.log(res.data)
				setexamData(res.data.data.exams[0])

			} catch (err) {
				console.log(err)
			}

		};

		fetchAllStudents();
		fetchExamById(id);

	}, [router.query.id]);

	return (
		<Box component={Paper}>
			{console.log(examData)}
			<Stack direction="row-reverse" spacing={3} sx={{ p: 1 }}></Stack>
			<Stack
				direction={{ xs: "column", sm: "column" }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				sx={{ p: 2 }}
			>
				<Item>
					Exam name: <Chip color="primary" label={examData.name}></Chip>{" "}
				</Item>
				<Item>
					Exam date: <Chip color="primary" label={examData.date}></Chip>
				</Item>
				<Item>
					Subject name:
					<Chip color="primary" label={examData.subject_name}></Chip>
				</Item>
				<Item>
					Course name:{" "}
					<Chip color="primary" label={examData.course_name}></Chip>
				</Item>
				<Item>
					Created at: <Chip color="primary" label={examData.updated_at}></Chip>
				</Item>
				<Item>Total Student: { }</Item>
				<Item>{`Marks status: ${examData.status == 0 ? (
					<Chip color="primary" label="Pending"></Chip>
				) : (
					<Chip color="primary" label="OK"></Chip>
				)
					}`}</Item>
			</Stack>
		</Box>
	);
}

export default examDetails;

