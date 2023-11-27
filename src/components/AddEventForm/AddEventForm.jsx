import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography";

function AddEventForm({wedding_id }) {
	const[expanded, setExpanded] = useState(false);
	const btn = { p: 1.5, width: "51%", mb: 2 };
	const eventDetails = {
		wedding_id: wedding_id,
		event_broadcast: true,
		event_name: "",
		event_street_address: "",
		event_city: "",
		event_state: "",
		event_zip: "",
		event_maps_url: "",
		event_date: "",
		event_start_time: "",
		event_end_time: "",
	};

	const [event, setEvent] = useState(eventDetails);
	const postEvent = (e) => {
		e.preventDefault();
		alert("CONNECT AddEventForm TO SAGA AND SERVER");
	};
	return (
			<form
				method="POST"
				onSubmit={postEvent}
				// style={{
				// 	display: "flex",
				// 	flexDirection: "column",
				// 	justifyContent: "center",
				// 	alignItems: "center",
				// 	padding: 10,
				// 	marginRight: 45,
				// 	marginLeft: 25,
				// 	marginBottom: 5,
				// }}
			>
			<Button
			variant="outlined"
			sx={btn}
			onClick={()=>setExpanded(!expanded)}
			>
				{expanded ? 'Close' : 'Add Event' }
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
				<Typography variant="h6" > Event Details</Typography>
				<Grid
					container
					spacing={1}
				>
					<Grid item xs={12} sm={6} md={8}>
						<FormControl>
							<FormLabel id="radio-buttons-group-label">
								Share with guests right away?
							</FormLabel>
							<RadioGroup
								aria-labelledby="radio-buttons-group-label"
								defaultValue={true}
								name="radio-buttons-group"
                                sx={{display:'flex', flexDirection:'row', mb:1.25}}
							>
								<FormControlLabel
									value={true}
									control={
										<Radio
											onChange={(e) =>
												setEvent({
													...event,
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
												setEvent({
													...event,
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
					<Grid item xs={12} sm={12} md={6}>
						<TextField
							fullWidth
							label="Event Name"
							sx={{ mb: 2 }}
							value={event.event_name}
							onChange={(e) =>
								setEvent({
									...event,
									event_name: e.target.value,
								})
							}
							// InputLabelProps={{
							// 	shrink: true,
							// 	fontSize: "2rem",
							// }}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<TextField
						fullWidth
							label="Date"
							type="date"
							sx={{ mb: 2 }}
							value={event.event_date}
							onChange={(e) =>
								setEvent({
									...event,
									event_date: e.target.value,
								})
							}
								InputLabelProps={{
									shrink: true,
									fontSize: "2rem",
								}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<TextField
						fullWidth
							label="Start Time"
							type="time"
                            step="15"
							sx={{ mb: 2 }}
							value={event.event_start_time}
							onChange={(e) =>
								setEvent({
									...event,
									event_start_time: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<TextField
						fullWidth
							label="End Time"
							type="time"
							sx={{ mb: 2 }}
							value={event.event_end_time}
							onChange={(e) =>
								setEvent({
									...event,
									event_end_time: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={12}>
						<TextField
							fullWidth
							label="Street Address"
							sx={{ mb: 2 }}
							value={event.event_street_address}
							onChange={(e) =>
								setEvent({
									...event,
									event_street_address: e.target.value,
								})
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label="City"
							sx={{ mb: 2 }}
							value={event.event_city}
							onChange={(e) =>
								setEvent({
									...event,
									event_city: e.target.value,
								})
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label="State"
							sx={{ mb: 2 }}
							value={event.event_state}
							onChange={(e) =>
								setEvent({
									...event,
									event_state: e.target.value,
								})
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label="Zip"
							sx={{ mb: 2 }}
							value={event.event_zip}
							onChange={(e) =>
								setEvent({
									...event,
									event_zip: e.target.value,
								})
							}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={6} md={6}>
						<TextField
							label="Map"
							sx={{ mb: 2 }}
							value={event.event_maps_url}
							onChange={(e) =>
								setEvent({
									...event,
									event_maps_url: e.target.value,
								})
							}
							InputLabelProps={{
								shrink: true,
								fontSize: "2rem",
							}}
						/>
					</Grid> */}
					<Grid item xs={12} sm={6} md={6}>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							sx={{ mt: 1, height: "50px" }}
						>
							Add event
						</Button>
					</Grid>
				</Grid>


			</Collapse>
			</form>
	);
}

export default AddEventForm;
