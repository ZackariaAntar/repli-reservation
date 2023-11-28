import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";

import { useState } from "react";

import ActiveWeddingGuestsTableRow from "./ActiveWeddingGuestsTableRow";

function ActiveWeddingGuestListTable({ guests}) {
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
				{expanded ? "Close" : "Our Guestlist"}
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
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align="left">Phone Number</TableCell>
								<TableCell align="left">Email</TableCell>
								<TableCell align="left">Allergies</TableCell>
								<TableCell align="left">
									Accommodations
								</TableCell>
								<TableCell align="left">Meal Choice</TableCell>
								<TableCell align="left">Spouse Party</TableCell>
								<TableCell align="left">Realtionship</TableCell>
								<TableCell align="left">Plus One</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="left">
									Additional Information
								</TableCell>
								<TableCell align="left">Meal Choice</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{guests.map((guest) => (
								<ActiveWeddingGuestsTableRow
									key={guest.id}
									guest={guest}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Collapse>
		</>
	);
}

export default ActiveWeddingGuestListTable;
