import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";

function AddGuestToEventForm({
	addGuests,
	setAddGuests,
	wedding_id,
	events,
	guests,
	RSVPs,
}) {
	const dispatch = useDispatch();
	const [hide, setHide] = useState(false);
	const guestDetails = {};
	const [inviteList, setInviteList] = useState(guestDetails);

	const addToList = (event, guest) => {};

	// const events = useSelector((store)=>store.activeWeddingEvents)
	// const guests = useSelector((store)=>store.activeWeddingGuests)

	// useEffect(()=>{
	//     console.log('=================> INSIDE ADD GUESTS TO EVENT FORM COMPONENT');
	//     dispatch({ type: "GET_ACTIVE_WEDDING_GUESTS", payload: wedding_id });
	//     dispatch({ type: "GET_ACTIVE_WEDDING_EVENTS", payload: wedding_id });
	// },[])

	return (
		<>
			<Dialog
				fullScreen
				open={addGuests}
				onClose={() => setAddGuests(!addGuests)}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					p: 2,
					mx: 1,
					my: 1,
				}}
			>
				{hide ? (
					<div
						style={{
							width: "auto",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							padding: 15,
							margin: 15,
							// border: "1px solid magenta",
						}}
					>
						<button onClick={() => setHide(!hide)}>close</button>
						<pre>{JSON.stringify(RSVPs, null, 2)}</pre>
						{RSVPs.map((invite) => (
							<>
								<br />
								{invite.event_name} <br />
								{invite.event_date} <br />
								{invite.guests.map((guest) => (
									<div>
										{guest.status}
                                        <br />
										<p>
											{`${guest.guest_first_name} ${guest.guest_last_name}`}
										</p>
									</div>
								))}
								<br />
								{JSON.stringify(invite, null, 2)}
								<br />
							</>
						))}
					</div>
				) : (
					<div
						style={{
							width: "auto",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							padding: 15,
							margin: 15,
							// border: "1px solid magenta",
						}}
					>
						<div>
							<button onClick={() => setAddGuests(!addGuests)}>
								Close
							</button>
						</div>
						{events.map((event) => (
							<div
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "flex-start",
									// border: "1px solid lime",
									marginTop: 10,
									marginBottom: 10,
								}}
							>
								<h4>{event.event_name}</h4>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-evenly",
										alignItems: "center",
										// border: "1px solid blue",
										height: "10vh",
									}}
								>
									<button onClick={() => setHide(!hide)}>
										Add guests to this event
									</button>

									<button>Update guests for event</button>
								</div>
							</div>
						))}
					</div>
				)}
			</Dialog>
		</>
	);
}

export default AddGuestToEventForm;
