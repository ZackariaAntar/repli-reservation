import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";


import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import EditWeddingDetailsForm from "../EditWeddingDetailsForm/EditWeddingDetailsForm";
import AddEventForm from "../AddEventForm/AddEventForm";
import EditEventForm from "../EditEventForm/EditEventForm";
import AddGuestToEventForm from "../AddGuestToEventForm/AddGuestToEventForm";
import AddAnnouncementForm from "../AddAnnouncementForm/AddAnnouncementForm";
import ActiveWeddingEventCard from "../ActiveWeddingEventCard/ActiveWeddingEventCard";
import GuestListForm from "../GuestListForm/GuestListForm";
import ActiveWeddingGuestListTable from "../ActiveWeddingGuestListTable.jsx/ActiveWeddingGuestListTable";

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


	const [editWedding, setEditWedding] = useState(false);
	const [addEvent, setAddEvent] = useState(false);
	const [editEvent, setEditEvent] = useState(false);
	const [addAnnouncement, setAddAnnouncement] = useState(false);

	useEffect(() => {
		dispatch({ type: "GET_ACTIVE_WEDDING_DETAILS", payload: wedding_id });
	}, []);

	const btn = { p: 1.5, width: "25%", mb: 2 };

	// TODO: Create and source in components for:
	// - Connect edit wedding form to saga and server
	// - Connect add/edit event forms to saga and server
	// - Assign guests to events
	// - Send RSVPs via email(single vs batch?): how do we cache temp passwords/can encriptLib decrypt on server before sending?
	// - Add/edit meals form
	// - Add/edit announcement form

	return (
		<Container maxWidth="lg">
			<Grid container spacing={1}>
				<Grid item xs={12} sm={12} md={12}>
					{details.map((info) => (
						<div key={info.id}>
							<Typography
								align="center"
								sx={{ fontSize: "4rem" }}
							>
								{info.wedding_title}
							</Typography>
							<Typography
								align="center"
								sx={{ fontSize: "3rem" }}
							>
								{info.wedding_date}
							</Typography>
							<Typography
								align="center"
								sx={{ fontSize: "1rem" }}
							>
								{info.wedding_blurb}
							</Typography>
						</div>
					))}
					<Button
						variant="outlined"
						onClick={() => setEditWedding(!editWedding)}
						sx={{ p: 1.5, width: "25%", mb: 2 }}
					>
						edit wedding details
					</Button>
					{details[0] && (
						<EditWeddingDetailsForm
							editWedding={editWedding}
							setEditWedding={setEditWedding}
							details={details}
						/>
					)}
				</Grid>
			</Grid>
			<Grid container spacing={1} sx={{}}>
				<Grid item xs={12} sm={12} md={4}>
					{details[0] && <GuestListForm details={details[0]} />}
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<AddEventForm wedding_id={wedding_id} />
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					{posts && (
						<AddAnnouncementForm
							events={events}
							wedding_id={wedding_id}
						/>
					)}
				</Grid>
			</Grid>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={12} md={4}>
					{/* <Grid container spacing={1}>
						{events.map((event) => (
							<Grid item key={event.id} xs={12} sm={6} md={3}>
							<div key={event.id}>
							<p>{event.wedding_id}</p>
							<h4>{event.event_name}</h4>
							<p>
							{event.event_broadcast
								? "Guests can see"
								: "Guests can't see"}
								</p>
								<p>{event.event_street_address}</p>
								<p>{event.event_city}</p>
								<p>{event.event_state}</p>
								<p>{event.event_zip}</p>
								<p>{event.event_maps_url}</p>
								<p>{event.event_date}</p>
								<p>{event.event_start_time}</p>
								<p>{event.event_end_time}</p>
								<Button
								onClick={() => setEditEvent(!editEvent)}
								>
								Edit event
								</Button>
								</div>
								<EditEventForm
								editEvent={editEvent}
								setEditEvent={setEditEvent}
								event={event}
								/>
								</Grid>
								))}
							</Grid> */}
				</Grid>

				<Grid item xs={12} sm={12} md={12}>
					<ActiveWeddingGuestListTable guests={guests} />
					{/* <h2>Our Guest List</h2>
					<Grid container spacing={1}>
						{guests.map((guest) => (
							<Grid item key={guest.id} xs={12} sm={6} md={3}>
								<div>
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
								</div>
							</Grid>
						))}
					</Grid> */}
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<h2>Announcements</h2>
					<Grid container spacing={1}>
						{posts.map((post) => (
							<Grid item key={post.id} xs={12} sm={6} md={3}>
								<div>
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
					<h2>RSVPs</h2>
					<Grid container spacing={1}>
						{RSVPs.map((repli) => (
							<Grid
								item
								key={repli.event_id}
								xs={12}
								sm={6}
								md={6}
							>
								<ActiveWeddingEventCard
									repli={repli}
									guests={guests}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>

				<Grid item xs={12} sm={12} md={12}>
					<h2>Meals</h2>
					<Button>Manage meals</Button>
					<Grid container spacing={1}>
						{meals.map((meal) => (
							<Grid item key={meal.id} xs={12} sm={6} md={3}>
								<div>
									{/* <p> {meal.id} </p> */}
									<h3>{meal.meal_name}</h3>
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
