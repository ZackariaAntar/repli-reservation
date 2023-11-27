import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

function EditEventForm({ event }) {
	const [expanded, setExpanded] = useState(false);
	const btn = { p: 1.5, width: "100%", mb: 2 };

	const reformat = (input) => {
		let d = new Date(input);
		let month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return `${year}/${month}/${day}`;
	};

	console.log(event.event_date);
	// reformat(event.event_date)

	const [mmdd, setMmdd] = useState(reformat(event.event_date));

	console.log("mmdd", mmdd);

	const [changeEvent, setChangeEvent] = useState(event);

	console.log({ changeEvent });

	const updateEvent = (e) => {
		e.preventDefault();
		alert("CONNECT EditEventForm TO SAGA AND SERVER");
	};
	return (
		<form
			method="PUT"
			onSubmit={updateEvent}
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: 10,
				marginRight: 45,
				marginLeft: 25,
				marginBottom: 5,
			}}
		>
			<Button
				startIcon={
					expanded ? (
						<KeyboardArrowUpIcon />
					) : (
						<KeyboardArrowDownIcon />
					)
				}
				variant="outlined"
				sx={btn}
				onClick={() => setExpanded(!expanded)}
			>
				{expanded ? "Close" : "Edit Event"}
			</Button>
			<Collapse
				in={expanded}
				timeout="auto"
				unmountOnExit
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid
					container
					spacing={1}
					sx={{
						mx: 1,
						mt: 3,
					}}
				>
					<Grid item xs={12} sm={12} md={12}>
						<FormControl sx={{ textAlign: "center" }}>
							<FormLabel
								align="center"
								id="radio-buttons-group-label"
							>
								Share with guests?
							</FormLabel>
							<RadioGroup
								aria-labelledby="radio-buttons-group-label"
								defaultValue={true}
								name="radio-buttons-group"
								sx={{
									display: "flex",
									flexDirection: "row",
									mb: 1.25,
								}}
							>
								<FormControlLabel
									value={true}
									control={
										<Radio
											onChange={(e) =>
												setChangeEvent({
													...changeEvent,
													event_broadcast:
														e.target.value,
												})
											}
										/>
									}
									label="Yes"
								/>
								<FormControlLabel
									value={false}
									control={
										<Radio
											onChange={(e) =>
												setChangeEvent({
													...changeEvent,
													event_broadcast:
														e.target.value,
												})
											}
										/>
									}
									label="No"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					{/* <Grid item xs={12} sm={12} md={12}>
						<Typography sx={{ fontSize: "2rem" }}>
							{event.event_name}
						</Typography>
						<TextField
							fullWidth
							label="Event Name"
							sx={{ mb: 2 }}
							value={event.event_name}
							onChange={(e) =>
								setChangeEvent({
									...changeEvent,
									event_name: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid> */}
					<Grid item xs={12} sm={12} md={12}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<StaticDatePicker
								disablePast
								defaultValue={dayjs(event.event_date)}
								// value={changeEvent.event_date}
								onChange={(newValue) => {
									setChangeEvent({
										...changeEvent,
										event_date: `${newValue.$M}-${newValue.$D}-${newValue.$y}`,
									});
								}}
								slotProps={{
									actionBar: {
										actions: [],
									},
								}}
							/>
						</LocalizationProvider>
						{/* <TextField
							label="Date"
							fullWidth
							type="date"
							sx={{ mb: 2 }}
							defaultValue={mmdd}
							// value={mmdd}
							onChange={(e) =>
								setChangeEvent({
									...changeEvent,
									event_date: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/> */}
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								noValidate
								label={`Start ${changeEvent.event_start_time}`}
								// value={event.event_start_time}
								onChange={(newValue) => {
									setChangeEvent({
										...changeEvent,
										event_start_time: `${newValue.$H}:${newValue.$m}`,
									});
								}}
								timeSteps={{ hours: 1, minutes: 10 }}
								inputProps={{ readOnly: true }}
							/>
						</LocalizationProvider>

						{/* <TextField
							label="Start Time"
							type="time"
							step="15"
							sx={{ mb: 2 }}
							value={event.event_start_time}
							onChange={(e) =>
								setChangeEvent({
									...changeEvent,
									event_start_time: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/> */}
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								label={`End ${changeEvent.event_end_time}`}
								timeSteps={{ hours: 1, minutes: 10 }}
								onChange={(newValue) => {
									setChangeEvent({
										...changeEvent,
										event_end_time: `${newValue.$H}:${newValue.$m}`,
									});
								}}
								inputProps={{ readOnly: true }}
							/>
						</LocalizationProvider>

						{/* <TextField
								label="End Time"
								type="time"
								sx={{ mb: 2 }}
								value={event.event_end_time}
								onChange={(e) =>
									setChangeEvent({
										...changeEvent,
										event_end_time: e.target.value,
									})
								}
								InputLabelProps={{
									shrink: true,
									fontSize: "2rem",
								}}
							/> */}
					</Grid>
					<Grid item xs={12} sm={6} md={12}>
						<TextField
							fullWidth
							label="Street Address"
							sx={{ mb: 2 }}
							value={event.event_street_address}
							onChange={(e) =>
								setChangeEvent({
									...changeEvent,
									event_street_address: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label="City"
							sx={{ mb: 2 }}
							value={event.event_city}
							onChange={(e) =>
								setChangeEvent({
									...changeEvent,
									event_city: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label="State"
							sx={{ mb: 2 }}
							value={event.event_state}
							onChange={(e) =>
								setChangeEvent({
									...changeEvent,
									event_state: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label="Zip"
							sx={{ mb: 2 }}
							value={event.event_zip}
							onChange={(e) =>
								setChangeEvent({
									...changeEvent,
									event_zip: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={6} md={6}>
						<TextField
							label="Map"
							sx={{ mb: 2 }}
							value={event.event_maps_url}
							onChange={(e) =>
								setChangeEvent({
									...changeEvent,
									event_maps_url: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid> */}
					<Grid item xs={12} sm={12} md={12}>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							// sx={{ mt: 1, height: "50px" }}
						>
							Update Event
						</Button>
					</Grid>
				</Grid>
			</Collapse>
		</form>
	);
}

export default EditEventForm;
