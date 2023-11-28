import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function ActiveWeddingEventCard({ repli, guests }) {
    const dispatch = useDispatch()
    const params = useParams();
	const wedding_id = Number(params.id);
	const [expanded, setExpanded] = useState(false);
	const [addGuests, setAddGuests] = useState(false);
	const checked = {
		once: false,
		wait: true,
		guests: "",
	};
	const [selected, setSelected] = useState(checked);
    const allGuests = guests.map((guest) => guest.id);
	const invited = repli.guests.map((guest) => guest.guest_id);
	const notInvited = guests.filter((pal) => !invited.includes(pal.id));

	const handleDeleteClick = (id) => () => {
        let data = {
			event_id: repli.event_id,
			wedding_id: wedding_id,
			guest_id: Number(id),
		};
        dispatch({ type: "DELETE_GUEST_FROM_EVENT", payload:data});
	};
	const handleAddClick = (id) => {
        let cache = id
        if (cache.length > 0) {
		    setSelected({ ...selected, once: true, wait:false, guests: id });
		} else {
			setSelected(checked);
		}

	};
	const saveSelection = (guest_ids) => {

        let data = [];
		for (let i = 0; i < guest_ids.length; i++) {
			let save = {
				event_id: repli.event_id,
				wedding_id: wedding_id,
				guest_id: "",
			};
			if (!data.includes(guest_ids[i])) {
				save.guest_id = guest_ids[i];
				data.push(save);
			}
		}
        dispatch({type:'ADD_GUESTS_TO_EVENT', payload:data})

        setSelected(checked);
		setAddGuests(!addGuests);
	};

	const columns = [
		{
			field: "guestName",
			headerName: "Guest Name",
			width: 150,
		},
		{ field: "plusOne", headerName: "Plus One", width: 150 },
		{
			field: "status",
			headerName: "Status",
			width: 100,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Remove",
			width: 150,
			cellClassName: "actions",
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<DeleteIcon sx={{ color: "#DC2700" }} />}
						label="Delete"
						onClick={handleDeleteClick(id)}
					/>,
				];
			},
		},
	];
	const rows = repli.guests.map((guest) => ({
		id: `${guest.guest_id}`,
		guestName: `${guest.guest_first_name} ${guest.guest_last_name}`,
		plusOne: guest.plus_one_first_name
			? `${guest.plus_one_first_name} ${guest.plus_one_last_name}`
			: "N/A",
		status: `${guest.status}`,
	}));

	const remainingColumns = [
		{
			field: "guestName",
			headerName: "Guest Name",
			width: 150,
		},
	];

	const remainingRows = notInvited.map((guest) => ({
		id: `${guest.id}`,
		guestName: `${guest.first_name} ${guest.last_name}`,
	}));

	return (
		<>
			<Card elevation={4}>
				<CardContent>
					<Grid container spacing={1}>
						<Grid item md={4}>
							<Typography>
								{repli.event_name}
							</Typography>
							<Typography variant="caption">
								{repli.event_date}
							</Typography>
						</Grid>
						<Grid item md={8}>
							<Typography
								align="center"
							>{`Replis`}</Typography>
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
						<Button
							sx={{ mb: 1 }}
							variant="outlined"
							onClick={() => {
								setAddGuests(!addGuests), setSelected(checked);
							}}
						>
							{addGuests ? "Cancel" : "Add Guests To Event"}
						</Button>
						<div style={{ height: "auto", width: "auto" }}>
							{addGuests ? (
								<DataGrid
									rows={remainingRows}
									columns={remainingColumns}
									rowSelection
									checkboxSelection
									onRowSelectionModelChange={(e) => {
										handleAddClick(e);
									}}
									disableColumnMenu
									disableDensitySelector
									hideFooter
								/>
							) : (
								<DataGrid
									rows={rows}
									columns={columns}
									editMode="row"
									disableColumnMenu
									disableDensitySelector
									hideFooter
								/>
							)}
							{!selected.wait && (
								<Button
									sx={{ mt: 2 }}
									variant="outlined"
									onClick={() => {
										saveSelection(selected.guests);
									}}
								>
									Invite Selected Guests
								</Button>
							)}
						</div>
					</CardContent>
				</Collapse>
				<CardActions onClick={() => setExpanded(!expanded)}>
					{expanded ? (
						<IconButton sx={{ fontSize: ".75rem" }} disableRipple>
							<ExpandLessIcon />
							Close
						</IconButton>
					) : (
						<IconButton sx={{ fontSize: ".75rem" }} disableRipple>
							<ExpandMoreIcon />
							Manage Guests
						</IconButton>
					)}
				</CardActions>
			</Card>
		</>
	);
}
export default ActiveWeddingEventCard;
