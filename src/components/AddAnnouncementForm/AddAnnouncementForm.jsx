import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Collapse from "@mui/material/Collapse";

function AddAnnouncementForm({ wedding_id, events }) {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const btn = { p: 1.5, width: "51%", mb: 2 };

	const postDetails = {
		creator_id: user.id,
		wedding_id: wedding_id,
		event_id: "",
		announcement: "",
		creator_first_name: user.first_name,
		creator_last_name: user.last_name,
		event_name: "",
	};

	const [announcement, setAnnouncement] = useState(postDetails);
	const [expanded, setExpanded] = useState(false);

	const postAnnouncement = (e) => {
		e.preventDefault();
		console.log(announcement);
		dispatch({ type: "ADD_NEW_ANNOUNCEMENT", payload: announcement });
		setExpanded(!expanded);
		setAnnouncement(postDetails);
	};
	return (
		<form
			method="POST"
			onSubmit={postAnnouncement}
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				mb: 2,
			}}
		>
			<Button
				variant="outlined"
				sx={btn}
				onClick={() => setExpanded(!expanded)}
			>
				{expanded ? "Close" : "Add Announcement"}
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
				<FormControl variant="standard" fullWidth sx={{ mb: 4 }}>
					<InputLabel id="demo-simple-select-standard-label">
						Choose an event...
					</InputLabel>
					<Select
						labelId="demo-simple-select-standard-label"
						id="demo-simple-select-standard"
						value={announcement.event_name}
						onChange={(e, choice) =>
							setAnnouncement({
								...announcement,
								event_name: e.target.value,
								event_id: choice.props.event_id,
							})
						}
						label="Choose an event..."
					>
						<MenuItem value="" disabled>
							<em>Choose an event...</em>
						</MenuItem>
						{events.map((event) => (
							<MenuItem
								key={event.id}
								event_id={event.id}
								value={event.event_name}
							>
								{event.event_name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<TextField
					multiline
					rows={8}
					maxRows={10}
					sx={{ mb: 3 }}
					fullWidth
					label={
						announcement.event_name
							? `What would you like to share about the ${announcement.event_name}?`
							: `What would you like to share?`
					}
					value={announcement.announcement}
					onChange={(e) => {
						setAnnouncement({
							...announcement,
							announcement: e.target.value,
						});
					}}
					InputLabelProps={{
						shrink: true,
						fontSize: "2rem",
					}}
				/>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						my: 4,
					}}
				>
					<Button type="submit" variant="contained">
						Submit announcement
					</Button>
				</Box>
			</Collapse>
		</form>
	);
}

export default AddAnnouncementForm;
