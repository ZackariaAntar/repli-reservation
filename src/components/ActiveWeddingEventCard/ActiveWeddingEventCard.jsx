import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { DataGrid } from "@mui/x-data-grid";

function ActiveWeddingEventCard({ repli }) {
	const [expanded, setExpanded] = useState(false);
	const columns = [
		{ field: "guestName", headerName: "Guest Name", width: 150 },
		{ field: "plusOne", headerName: "Plus One", width: 150 },
		{
			field: "status",
			headerName: "Status",
			width: 100,
		},
	];

	const rows = repli.guests.map((guest, i) => ({
		id: `${i + 1}`,
		guestName: `${guest.guest_first_name} ${guest.guest_last_name}`,
		plusOne: guest.plus_one_first_name
			? `${guest.plus_one_first_name} ${guest.plus_one_last_name}`
			: "N/A",
		status: `${guest.status}`,
	}));

	return (
		<Card elevation={4}>
			<CardContent>
				<Grid container spacing={1}>
					<Grid item md={3}>
						<Typography variant="h6">{repli.event_name}</Typography>
						<Typography variant="caption">
							{repli.event_date}
						</Typography>
					</Grid>
					<Grid item md={9}>
						<Typography variant="h6" align="center">{`Replis`}</Typography>
						<div
							style={{
								display: "flex",
								justifyContent: "space-evenly",
							}}
						>
							<Typography>{`Attending: ${repli.num_attending}`}</Typography>
							<Typography>{`Pending: ${repli.num_pending}`}</Typography>
							<Typography>{`Declined: ${repli.num_declined}`}</Typography>
						</div>
					</Grid>
				</Grid>
			</CardContent>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<div style={{ height: "auto", width: "100%" }}>
						<DataGrid
							rows={rows}
							columns={columns}
							checkboxSelection
							disableColumnMenu
							disableDensitySelector
							hideFooter
							hideFooterPagination
						/>
					</div>
					{/* <ActiveWeddingEventGuests invitedGuests={repli.guests} /> */}
				</CardContent>
			</Collapse>
			<CardActionArea onClick={() => setExpanded(!expanded)}>
				{expanded ? (
					<IconButton sx={{ fontSize: ".75rem" }} disableRipple>
						<ExpandLessIcon />
						Close
					</IconButton>
				) : (
					<IconButton sx={{ fontSize: ".75rem" }} disableRipple>
						<ExpandMoreIcon />
						See invited guests
					</IconButton>
				)}
			</CardActionArea>

			{/* <ActiveWeddingCardCollapse
				expanded={expanded}
				invitedGuests={repli.guests}
			/> */}
		</Card>
	);
}
export default ActiveWeddingEventCard;
