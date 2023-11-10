import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl/FormControl";
import { FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useDispatch, useSelector } from "react-redux";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function UserDashboard() {
  const dispatch = useDispatch()
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const myWeddings = useSelector((store) => store.allMyWeddings);
  const myRSVPs = useSelector((store) => store.allMyRSVPs);

  useEffect(()=>{
    dispatch({type:'GET_ALL_MY_DETAILS', payload: user.id})
  },[]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const now = new Date();

  const limitPast = () => {
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const today = limitPast();

  const [value, setValue] = useState(dayjs(today));


  const weddingData = {
		wedding_photo:'',
		wedding_blurb:'',
		wedding_title:'',
		wedding_date:`${today}`,
		wedding_creator_id:user.id,
    spouse_1:'',
    spouse_2:''
  };
  const [newWedding, setNewWedding] = useState(weddingData);

  const createNewWedding = () =>{
    dispatch({ type: "CREATE_NEW_WEDDING", payload: newWedding });
    setNewWedding(weddingData);
    handleClose();
  }

  return (
		<>
			<div className="container">
				<h2>Welcome, {user.first_name}!</h2>
			</div>

			<div>
				<Button onClick={handleClickOpen}>Add Wedding</Button>
				<Dialog open={open} onClose={handleClose}>
					<FormControl
						sx={{
							width: "auto",
							mx: 3.5,
							my: 3.5,
						}}
					>
						{/* <FormLabel>Wedding Title</FormLabel> */}
						<TextField
							label="Wedding Title"
							sx={{ mb: 2 }}
							value={newWedding.wedding_title}
							onChange={(e) =>
								setNewWedding({
									...newWedding,
									wedding_title: e.target.value,
								})
							}
							InputLabelProps={{ shrink: true, fontSize: "2rem" }}
						></TextField>

						<FormLabel>Wedding Date</FormLabel>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateCalendar
								sx={{
									border: "1px solid lightgrey",
									borderRadius: 1.25,
									mb: 1.75,
									height: "295px",
								}}
								defaultValue={dayjs(today)}
								views={["year", "month", "day"]}
								disablePast
								onChange={(newValue) =>
									setNewWedding({
										...newWedding,
										wedding_date: `${newValue.$y}-${
											newValue.$M + 1
										}-${newValue.$D}`,
									})
								}
							></DateCalendar>
						</LocalizationProvider>

						{/* <FormLabel>Description</FormLabel> */}
						<TextField
							label="Description"
							multiline
							rows={4}
							maxRows={5}
							sx={{ mb: 2 }}
							value={newWedding.wedding_blurb}
							onChange={(e) =>
								setNewWedding({
									...newWedding,
									wedding_blurb: e.target.value,
								})
							}
							InputLabelProps={{ shrink: true }}
						></TextField>

						{/* <FormLabel>Spouse Name</FormLabel> */}
						<TextField
							label="Spouse Name"
							sx={{ mb: 2 }}
							value={newWedding.spouse_1}
							onChange={(e) =>
								setNewWedding({
									...newWedding,
									spouse_1: e.target.value,
								})
							}
							InputLabelProps={{ shrink: true }}
						></TextField>

						{/* <FormLabel>Spouse Name</FormLabel> */}
						<TextField
							label="Spouse Name"
							sx={{ mb: 2 }}
							value={newWedding.spouse_2}
							onChange={(e) =>
								setNewWedding({
									...newWedding,
									spouse_2: e.target.value,
								})
							}
							InputLabelProps={{ shrink: true }}
						></TextField>

						<Button onClick={createNewWedding}>Submit</Button>
					</FormControl>
				</Dialog>
			</div>
		</>
  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
