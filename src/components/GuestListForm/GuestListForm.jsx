import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Collapse from "@mui/material/Collapse";

//////////////////Guest List Form Component/////////////////////

function GuestListForm({ details }) {
	// hooks for form TextField and dispatch and history for navigation and dispatch to redux store
	// may need to update the naming convention for the hooks depending on how we want to handle the data
	const tf = { mb: 2 };
	const btn = { p: 1.5, width: "51%", mb: 2 };

	const guestData = {
		wedding_title: details.wedding_title,
		first_name: "",
		last_name: "",
		username: "",
		password: "",
		phone_number: "",
		street_address: "",
		unit: "",
		city: "",
		state: "",
		zip: "",
		relationship: "",
		wedding_id: details.id,
		spouse_association: "",
		can_plus_one: "",
	};
	const dummy = {
		wedding_title: details.wedding_title,
		first_name: "Pooh",
		last_name: "Bear",
		username: "pooh@bear.com",
		password: "",
		phone_number: "12345678",
		street_address: "123 Memory Lane",
		unit: "",
		city: "MPLS",
		state: "MN",
		zip: "55407",
		relationship: 1,
		wedding_id: details.id,
		spouse_association: details.spouse_1,
		can_plus_one: true,
	};
	const [guestInfo, setGuestInfo] = useState(guestData);
	const [switchName, setSwitchName] = useState("");
	const relationships = useSelector((store) => store.relationships);
	const dispatch = useDispatch();

	const [expanded, setExpanded] = useState(false);


	const addToList = (e) => {
		e.preventDefault();
		dispatch({
			type: "VALIDATE_GUEST_INVITATION",
			payload: guestInfo,
		});
		setGuestInfo(guestData);
	};

	return (
		<form onSubmit={addToList}>
			<Button
			variant="outlined"
			sx={btn}
			onClick={()=>setExpanded(!expanded)}
			>
				{expanded ? 'Close' : 'Add Guests' }
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
				<Typography variant="h6">Guest Details</Typography>
				<Grid container spacing={1}>
					<Grid item xs={12} md={6}>
						<TextField
							sx={tf}
							fullWidth
							value={guestInfo.first_name}
							id="first_name"
							label="First Name"
							required
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									first_name: e.target.value,
								})
							}
							onBlur={() => setSwitchName(guestInfo.first_name)}
						/>

						<TextField
							sx={tf}
							fullWidth
							value={guestInfo.username}
							id="username"
							label="E-mail"
							required
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									username: e.target.value,
								})
							}
						/>
						<TextField
							sx={tf}
							fullWidth
							value={guestInfo.street_address}
							id="street_address"
							label="Street Address"
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									street_address: e.target.value,
								})
							}
						/>
						<TextField
							sx={tf}
							fullWidth
							value={guestInfo.city}
							id="city"
							label="City"
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									city: e.target.value,
								})
							}
						/>
						<TextField
							sx={tf}
							fullWidth
							value={guestInfo.zip}
							id="zip"
							label="Zip"
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									zip: e.target.value,
								})
							}
						/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							sx={tf}
							fullWidth
							value={guestInfo.last_name}
							id="last_name"
							label="Last Name"
							required
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									last_name: e.target.value,
								})
							}
						/>
						<TextField
							sx={tf}
							fullWidth
							value={guestInfo.phone_number}
							id="phone_number"
							label="Phone Number"
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									phone_number: e.target.value,
								})
							}
						/>

						<TextField
							sx={tf}
							fullWidth
							value={guestInfo.unit}
							id="unit"
							label="Unit/Apt #"
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									unit: e.target.value,
								})
							}
						/>

						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel id="demo-simple-select-label">
								{`Select a State`}
							</InputLabel>

							<Select
								defaultValue="Select a state"
								value={guestInfo.state}
								id="state"
								label={`Select a State`}
								onChange={(e) =>
									setGuestInfo({
										...guestInfo,
										state: e.target.value,
									})
								}
								MenuProps={{
									anchorOrigin: {
										vertical: "bottom",
										horizontal: "center",
									},
									transformOrigin: {
										vertical: "top",
										horizontal: "center",
									},
									getContentAnchorEl: null,
									PaperProps: {
										style: {
											maxHeight: 250, // Adjust this value as needed
											overflow: "auto",
										},
									},
								}}
							>
								<MenuItem disabled value="">
									<em>Select a State</em>
								</MenuItem>
								<MenuItem value="AL">Alabama</MenuItem>
								<MenuItem value="AK">Alaska</MenuItem>
								<MenuItem value="AZ">Arizona</MenuItem>
								<MenuItem value="AR">Arkansas</MenuItem>
								<MenuItem value="CA">California</MenuItem>
								<MenuItem value="CO">Colorado</MenuItem>
								<MenuItem value="CT">Connecticut</MenuItem>
								<MenuItem value="DE">Delaware</MenuItem>
								<MenuItem value="DC">
									District Of Columbia
								</MenuItem>
								<MenuItem value="FL">Florida</MenuItem>
								<MenuItem value="GA">Georgia</MenuItem>
								<MenuItem value="HI">Hawaii</MenuItem>
								<MenuItem value="ID">Idaho</MenuItem>
								<MenuItem value="IL">Illinois</MenuItem>
								<MenuItem value="IN">Indiana</MenuItem>
								<MenuItem value="IA">Iowa</MenuItem>
								<MenuItem value="KS">Kansas</MenuItem>
								<MenuItem value="KY">Kentucky</MenuItem>
								<MenuItem value="LA">Louisiana</MenuItem>
								<MenuItem value="ME">Maine</MenuItem>
								<MenuItem value="MD">Maryland</MenuItem>
								<MenuItem value="MA">Massachusetts</MenuItem>
								<MenuItem value="MI">Michigan</MenuItem>
								<MenuItem value="MN">Minnesota</MenuItem>
								<MenuItem value="MS">Mississippi</MenuItem>
								<MenuItem value="MO">Missouri</MenuItem>
								<MenuItem value="MT">Montana</MenuItem>
								<MenuItem value="NE">Nebraska</MenuItem>
								<MenuItem value="NV">Nevada</MenuItem>
								<MenuItem value="NH">New Hampshire</MenuItem>
								<MenuItem value="NJ">New Jersey</MenuItem>
								<MenuItem value="NM">New Mexico</MenuItem>
								<MenuItem value="NY">New York</MenuItem>
								<MenuItem value="NC">North Carolina</MenuItem>
								<MenuItem value="ND">North Dakota</MenuItem>
								<MenuItem value="OH">Ohio</MenuItem>
								<MenuItem value="OK">Oklahoma</MenuItem>
								<MenuItem value="OR">Oregon</MenuItem>
								<MenuItem value="PA">Pennsylvania</MenuItem>
								<MenuItem value="RI">Rhode Island</MenuItem>
								<MenuItem value="SC">South Carolina</MenuItem>
								<MenuItem value="SD">South Dakota</MenuItem>
								<MenuItem value="TN">Tennessee</MenuItem>
								<MenuItem value="TX">Texas</MenuItem>
								<MenuItem value="UT">Utah</MenuItem>
								<MenuItem value="VT">Vermont</MenuItem>
								<MenuItem value="VA">Virginia</MenuItem>
								<MenuItem value="WA">Washington</MenuItem>
								<MenuItem value="WV">West Virginia</MenuItem>
								<MenuItem value="WI">Wisconsin</MenuItem>
								<MenuItem value="WY">Wyoming</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item md={12}>
						<Typography mb variant="h6">
							Additional Information
						</Typography>
						<FormControl sx={{ mb: 1 }}>
							<FormLabel id="allow-plus-one">
								{switchName
									? `Does ${switchName} get a plus one?`
									: `Does this guest get a plus one?`}
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="allow-plus-one"
								name="can-plus-one"
								onChange={(e) =>
									setGuestInfo({
										...guestInfo,
										can_plus_one: e.target.value,
									})
								}
							>
								<FormControlLabel
									value={true}
									control={<Radio />}
									label="Yes"
								/>
								<FormControlLabel
									value={false}
									control={<Radio />}
									label="No"
								/>
							</RadioGroup>
						</FormControl>

						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel id="spouse_association">
								{switchName
									? `Who is ${switchName} is associated with...`
									: `Who is this guest is associated with...`}
							</InputLabel>

							<Select
								value={guestInfo.spouse_association}
								id="spouse_association"
								label={
									switchName
										? `Who is ${switchName} is associated with...`
										: `Who is this guest is associated with...`
								}
								onChange={(e) =>
									setGuestInfo({
										...guestInfo,
										spouse_association: e.target.value,
									})
								}
							>
								<MenuItem value={details.spouse_1}>
									Guest of {details.spouse_1}
								</MenuItem>
								<MenuItem value={details.spouse_2}>
									Guest of {details.spouse_2}
								</MenuItem>
							</Select>
						</FormControl>

						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel>
								{`Relationship to ${guestInfo.spouse_association}...`}
							</InputLabel>

							<Select
								value={guestInfo.relationship}
								id="relationship"
								label={`Relationship to ${guestInfo.spouse_association}...`}
								onChange={(e) =>
									setGuestInfo({
										...guestInfo,
										relationship: e.target.value,
									})
								}
							>
								{relationships.map((relation) => (
									<MenuItem
										key={relation.id}
										value={relation.id}
									>
										{guestInfo.spouse_association}'s{" "}
										{relation.category}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Button
						sx={{ mt: 1, p:1.5 }}
						fullWidth
						variant="contained"
						type="submit"
					>
						Add To Guestlist
					</Button>
				</Grid>
			</Collapse>
		</form>
	);
}

export default GuestListForm;
