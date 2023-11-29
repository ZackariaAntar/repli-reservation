import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function ActiveWeddingGuestsTableRow({ guest }) {
	const loading = useSelector((store) => store.loadingEmails);
	return (
		<>
			<TableRow key={guest.id}>
				{loading ? (
					<TableCell>
						<CircularProgress />
					</TableCell>
				) : (
					<TableCell align="left">
						{guest.invite_sent ? "✅" : "❌"}
					</TableCell>
				)}
				<TableCell align="left">
					{`${guest.first_name} ${guest.last_name}`}
				</TableCell>
				<TableCell align="left">{guest.phone_number}</TableCell>
				<TableCell align="left">{guest.contact_email}</TableCell>
				<TableCell align="left">{guest.allergies}</TableCell>
				<TableCell colSpan={2} align="left">
					{guest.accommodations}
				</TableCell>
				<TableCell align="left">{guest.guest_meal_choice}</TableCell>
				<TableCell align="left">{guest.spouse_party}</TableCell>
				<TableCell align="left">
					{guest.relationship_to_spouse}
				</TableCell>
				<TableCell align="left">
					{guest.can_plus_one ? "✅" : "❌"}
				</TableCell>
				<TableCell align="left">
					{guest.can_plus_one
						? `${guest.plus_one_first_name} ${guest.plus_one_last_name}`
						: " "}
				</TableCell>
				<TableCell align="left">
					{guest.plus_one_notes ? `${guest.plus_one_notes}` : " "}
				</TableCell>
				<TableCell align="left">
					{guest.plus_one_meal_choice
						? `${guest.plus_one_meal_choice}`
						: " "}
				</TableCell>
			</TableRow>
		</>
	);
}

export default ActiveWeddingGuestsTableRow;
