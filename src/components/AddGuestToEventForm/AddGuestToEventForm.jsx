import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";


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
						<Grid
							container
							spacing={1}
							// sx={{ border: "1px solid lime" }}
						>
							{RSVPs.map((invite) => (
								<>
									<Grid
										item
										md={12}
										sx={{ border: "1px solid magenta" }}
									>
										<h2>{invite.event_name}</h2>
										<p>{invite.event_date}</p>
									</Grid>
									<Grid item md={12}>
										<Grid container spacing={1}>
											<Grid item md={12}>
												<h4>Invited Guests' Details</h4>
											</Grid>

											{invite.guests.map((guest) => (
												<Grid item md={2}>
													<Card>
														<CardHeader
															
														>
                                                            {`${guest.guest_first_name} ${guest.guest_last_name}`}
                                                        </CardHeader>
                                                        <CardContent>

														{`Response Status: ${guest.status} `}
                                                        </CardContent>
													</Card>
												</Grid>
											))}
										</Grid>
									</Grid>

									<br />
									{/* {JSON.stringify(invite, null, 2)} */}
									<br />
								</>
							))}
						</Grid>
						{/* <pre>{JSON.stringify(RSVPs, null, 2)}</pre> */}
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
