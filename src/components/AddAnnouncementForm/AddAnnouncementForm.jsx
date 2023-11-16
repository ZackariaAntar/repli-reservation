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

function AddAnnouncementForm({
	addAnnouncement,
	setAddAnnouncement,
	wedding_id,
	events,
}) {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	const postDetails = {
		wedding_id: wedding_id,
		announcement: "",
		creator_first_name: user.first_name,
		creator_last_name: user.last_name,
		event_name: "",
		event_date: "",
	};

	const [announcement, setAnnouncement] = useState(postDetails);

	const postAnnouncement = (e) => {
		e.preventDefault();
		alert("CONNECT AddAnnouncementForm TO SAGA AND SERVER");
        // dispatch({type:'', payload:''})
	};
	return (
		<Dialog
			fullWidth
			open={addAnnouncement}
			onClose={() => setAddAnnouncement(!addAnnouncement)}
			sx={{
				p: 1,
				m: 1,
			}}
		>
			<FormControl variant="standard" sx={{ m: 4, minWidth: 120 }}>
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
							event_date: choice.props.date,
						})
					}
					label="Choose an event..."
				>
					<MenuItem value="">
						<em>Choose an event...</em>
					</MenuItem>
					{events.map((event) => (
						<MenuItem
							date={event.event_date}
							value={event.event_name}
						>
							{event.event_name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<form
				method="POST"
				onSubmit={postAnnouncement}
				style={{
					marginRight: 25,
					marginLeft: 25,
				}}
			>
				<TextField
					multiline
					rows={8}
					maxRows={10}
					sx={{ mb: 3 }}
					fullWidth
					label={`${announcement.event_name} Announcement`}
					value={announcement.announcement}
					onChange={(e) =>
						setAnnouncement({
							...announcement,
							announcement: e.target.value,
						})
					}
					InputLabelProps={{
						shrink: true,
						fontSize: "2rem",
					}}
				/>
				<Box
                sx={{display:'flex',justifyContent:'space-between', alignItems:'center', my:4}}
                >
					<Button type="submit" variant="contained">
						Add announcement
					</Button>
					<Button
						variant="outlined"
						onClick={() => setAddAnnouncement(!addAnnouncement)}
					>
						Close
					</Button>
				</Box>
			</form>
		</Dialog>
	);
}

export default AddAnnouncementForm;
