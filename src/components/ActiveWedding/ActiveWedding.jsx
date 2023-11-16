import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ActiveWedding() {
	const dispatch = useDispatch();
	const params = useParams();
	const wedding_id = params.id;
	const user = useSelector((store) => store.user);
	const details = useSelector((store) => store.activeWeddingDetails);
	const events = useSelector((store) => store.activeWeddingEvents);
	const guests = useSelector((store) => store.activeWeddingGuests);
	const meals = useSelector((store) => store.activeWeddingMeals);
	const posts = useSelector((store) => store.activeWeddingPosts);
	const RSVPs = useSelector((store) => store.activeWeddingReplis);

	useEffect(() => {
		dispatch({ type: "GET_ACTIVE_WEDDING_DETAILS", payload: wedding_id });
	}, []);

	// TODO: Create and source in components for:
	// - Edit wedding details form
	// - Add/edit event form
	// - Assign guests to events
	// - Send RSVPs via email(single vs batch?): how do we cache temp passwords/can encriptLib decrypt on server before sending?
	// - Add/edit meals form
	// - Add/edit announcement form
	// - Visualize RSVP data and Fix query?

	return (
		<Container maxWidth="lg">
			<Button component={Link} to="/user">
				return to dashboard
			</Button>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={12}>
					<h5>WEDDING DETAILS</h5>
					{details.map((info) => (
						<div key={info.id}>
							<p>{info.wedding_title}</p>
							<p>{info.wedding_blurb}</p>
							<p>{info.wedding_date}</p>
							<p>{info.spouse_1}</p>
							<p>{info.spouse_2}</p>
							<Button>edit details</Button>
						</div>
					))}
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<h2>Wedding Events</h2>
					<Button>Add an event</Button>
					<Grid container spacing={1}>
						{events.map((event) => (
							<Grid item xs={12} sm={6} md={3}>
								<div key={event.id}>
									{/* <p>{event.wedding_id}</p> */}
									<p>{event.event_broadcast}</p>
									<h4>{event.event_name}</h4>
									<p>{event.event_street_address}</p>
									<p>{event.event_city}</p>
									<p>{event.event_state}</p>
									<p>{event.event_zip}</p>
									<p>{event.event_maps_url}</p>
									<p>{event.event_date}</p>
									<p>{event.event_start_time}</p>
									<p>{event.event_end_time}</p>
									<Button>Edit event</Button>
								</div>
							</Grid>
						))}
					</Grid>
				</Grid>

				<Grid item xs={12} sm={12} md={12}>
					<h2>Announcements</h2>
					<Button>Add an announcement</Button>
					<Grid container spacing={1}>
						{posts.map((post) => (
							<Grid item xs={12} sm={6} md={3}>
								<div key={post.id}>
									{/* <p> {post.id} </p> */}
									<h4>
										{post.event_name} <br />{" "}
										{post.event_date}
									</h4>
									<p>{post.announcement}</p>
									<p>{post.creator_first_name}</p>
									<p>{post.creator_last_name}</p>
									{/* <p>{post.event_id}</p> */}
								</div>
							</Grid>
						))}
					</Grid>
				</Grid>

				<Grid item xs={12} sm={12} md={12}>
					<h2>Guest List</h2>
					<Button>Manage guest list</Button>
					<Grid container spacing={1}>
						{guests.map((guest) => (
							<Grid item xs={12} sm={6} md={3}>
								<div key={guest.id}>
									<p> {guest.id} </p>
									<p> user_id: {guest.user_id}</p>
									<p> first_name: {guest.first_name}</p>
									<p> last_name: {guest.last_name}</p>
									<p> phone_number: {guest.phone_number}</p>
									<p>
										{" "}
										street_address: {guest.street_address}
									</p>
									<p> unit: {guest.unit}</p>
									<p> city: {guest.city}</p>
									<p> state: {guest.state}</p>
									<p> zip: {guest.zip}</p>
									<p> allergies: {guest.allergies}</p>
									<p>
										{" "}
										accommodations: {guest.accommodations}
									</p>
									<p> contact_email: {guest.contact_email}</p>
									<p> spouse_party: {guest.spouse_party}</p>
									<p>
										relationship_to_spouse:
										{guest.relationship_to_spouse}
									</p>
									<p>
										{" "}
										guest_meal_choice:{" "}
										{guest.guest_meal_choice}
									</p>
									<p>
										can_plus_one:{" "}
										{guest.can_plus_one ? `Yes` : `No`}
									</p>
									<p> plus_one_id: {guest.plus_one_id}</p>
									<p>
										{" "}
										plus_one_first_name:{" "}
										{guest.plus_one_first_name}
									</p>
									<p>
										{" "}
										plus_one_last_name:{" "}
										{guest.plus_one_last_name}
									</p>
									<p>
										{" "}
										plus_one_meal_choice:{" "}
										{guest.plus_one_meal_choice}
									</p>
									<p>
										{" "}
										plus_one_notes: {guest.plus_one_notes}
									</p>
									<Button>edit guest</Button>
								</div>
							</Grid>
						))}
					</Grid>
				</Grid>

				<Grid item xs={12} sm={12} md={12}>
					<h2>RSVPs</h2>
					<Button>Manage rsvps</Button>
					<Grid container spacing={1}>
						{RSVPs.map((repli) => (
							<Grid item xs={12} sm={6} md={3}>
								<div key={repli.event_id}>
									<h5>
										{repli.event_name} - {repli.event_date}
									</h5>
									<p>
										<span>
											Attending: {repli.num_attending}
										</span>{" "}
										<span>
											Pending: {repli.num_pending}
										</span>{" "}
										<span>
											Declined: {repli.num_declined}
										</span>
									</p>
									<p></p>
									{repli.guests.map((guest) => (
										<p key={guest.guest_id}>
											{guest.plus_one_first_name ? (
												<span>
													Guest:{" "}
													{guest.guest_first_name}{" "}
													{guest.guest_last_name}
													<br />
													Plus one:{" "}
													{
														guest.plus_one_first_name
													}{" "}
													{guest.plus_one_last_name}{" "}
												</span>
											) : (
												<span>
													Guest:{" "}
													{guest.guest_first_name}{" "}
													{guest.guest_last_name}
												</span>
											)}
											{"  "} Status: {"  "}
											{guest.status}
										</p>
									))}
								</div>
							</Grid>
						))}
					</Grid>
				</Grid>

				<Grid item xs={12} sm={12} md={12}>
					<h2>Meals</h2>
					<Button>Manage meals</Button>
					<Grid container spacing={1}>
						{meals.map((meal) => (
							<Grid item xs={12} sm={6} md={3}>
								<div key={meal.id}>
									<p> {meal.id} </p>
									<p>{meal.meal_name}</p>
									<p>{meal.meal_description}</p>
								</div>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default ActiveWedding;
