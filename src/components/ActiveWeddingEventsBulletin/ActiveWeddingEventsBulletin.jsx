import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

import EditEventForm from "../EditEventForm/EditEventForm";

function ActiveWeddingEventsBulletin({ events }) {
	const [expanded, setExpanded] = useState(false);
	const btn = { p: 1.5, width: "51%", mb: 2, ml: 25 };

	return (
		<>
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
				{expanded ? "Close" : "Our Events"}
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
				<Grid container spacing={1}>
					{events.map((event) => (
						<Grid item key={event.id} xs={12} sm={12} md={4}>
							<Card elevation={3}>
								<CardContent>
									<Typography sx={{ fontSize: "2rem" }}>
										{event.event_name}
									</Typography>
									<Typography>{event.event_date}</Typography>
									<Typography>
										{`${event.event_start_time} - ${event.event_end_time}`}
									</Typography>
                                    <br />
									<Typography>
										{event.event_street_address}
									</Typography>
									<Typography>
										{`${event.event_city}, ${event.event_state} ${event.event_zip}`}
									</Typography>

									{/* <CardContent>
										<p>
											{event.event_broadcast
												? "Guests can see"
												: "Guests can't see"}
										</p>
									</CardContent> */}
									<EditEventForm event={event} />
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Collapse>
		</>
	);
}
export default ActiveWeddingEventsBulletin;
