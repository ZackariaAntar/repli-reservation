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
import Container from "@mui/material/Container";


import { useState } from "react";

import ActiveWeddingGuestsTableRow from "./ActiveWeddingGuestsTableRow";

function ActiveWeddingGuestListTable({ guests}) {
	const [expanded, setExpanded] = useState(false);


	const btn = { p: 1.5, width: "51%", mb: 2};

	return (
		<Container
			maxWidth="lg"
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				mb: 2,
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
					width: "105%",
				}}
			>
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell
									colSpan={2}
									sx={{
										paddingRight: 12,
										fontWeight: "bold",
									}}
								>
									Name
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Phone Number
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Email
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Allergies
								</TableCell>
								<TableCell
									colSpan={2}
									sx={{ paddingRight: 5, fontWeight: "bold" }}
									align="left"
								>
									Accommodations
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Meal Choice
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Spouse Party
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Realtionship
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Plus One
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Name
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Additional Information
								</TableCell>
								<TableCell
									sx={{
										fontWeight: "bold",
									}}
									align="left"
								>
									Meal Choice
								</TableCell>
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
		</Container>
	);
}

export default ActiveWeddingGuestListTable;
