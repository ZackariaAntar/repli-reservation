import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function EditWeddingDetailsForm({ editWedding, setEditWedding, details }) {
	const dispatch = useDispatch();
	const confirmEdits = (e) => {
        e.preventDefault()
        alert("CONNECT EDIT WEDDING DETAILS FORM TO A SAGA AND SERVER ROUTE");
        console.log('CONNECT ME TO A SAGA AND SERVER ROUTE');
		// dispatch({type:'', payload:updatedDetails})
	};
	const [updatedDetails, setUpdatedDetails] = useState(details[0]);

	return (
		<Dialog open={editWedding} onClose={() => setEditWedding(!editWedding)}>
			<form method="PUT" onSubmit={confirmEdits}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						mx: 3,
						my: 3,
					}}
				>
					<TextField
						label="Wedding Title"
						sx={{ mb: 2 }}
						value={updatedDetails.wedding_title}
						onChange={(e) =>
							setUpdatedDetails({
								...updatedDetails,
								wedding_title: e.target.value,
							})
						}
						InputLabelProps={{
							shrink: true,
							fontSize: "2rem",
						}}
					></TextField>

					<p>Wedding Date</p>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar
							sx={{
								border: "1px solid lightgrey",
								borderRadius: 1.25,
								mb: 1.75,
								height: "295px",
							}}
							defaultValue={dayjs(updatedDetails.wedding_date)}
							views={["year", "month", "day"]}
							disablePast
							onChange={(newValue) =>
								setUpdatedDetails({
									...updatedDetails,
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
						value={updatedDetails.wedding_blurb}
						onChange={(e) =>
							setUpdatedDetails({
								...updatedDetails,
								wedding_blurb: e.target.value,
							})
						}
						InputLabelProps={{ shrink: true }}
					></TextField>

					{/* <FormLabel>Spouse Name</FormLabel> */}
					<TextField
						label="Spouse Name"
						sx={{ mb: 2 }}
						value={updatedDetails.spouse_1}
						onChange={(e) =>
							setUpdatedDetails({
								...updatedDetails,
								spouse_1: e.target.value,
							})
						}
						InputLabelProps={{ shrink: true }}
					></TextField>

					{/* <FormLabel>Spouse Name</FormLabel> */}
					<TextField
						label="Spouse Name"
						sx={{ mb: 2 }}
						value={updatedDetails.spouse_2}
						onChange={(e) =>
							setUpdatedDetails({
								...updatedDetails,
								spouse_2: e.target.value,
							})
						}
						InputLabelProps={{ shrink: true }}
					></TextField>

					<Button type="submit" variant="contained">
						Save changes
					</Button>
				</Box>
			</form>
		</Dialog>
	);
}

export default EditWeddingDetailsForm;
