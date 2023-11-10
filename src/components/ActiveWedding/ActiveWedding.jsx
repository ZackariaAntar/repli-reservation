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
				<Grid item xs={12} sm={6} md={4}>
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
				<Grid item xs={12} sm={6} md={4}>
					<h5>Wedding Events</h5>
					<Button>Add an event</Button>
					{events.map((event) => (
						<div key={event.id}>
							<p>{event.wedding_id}</p>
							<p>{event.event_broadcast}</p>
							<p>{event.event_name}</p>
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
					))}
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<h5>Announcements</h5>
					<Button>Add an announcement</Button>
					{posts.map((post) => (
						<div key={post.id}>
							<p> {post.id} </p>
							<p>{post.announcement}</p>
							<p>{post.creator_first_name}</p>
							<p>{post.creator_last_name}</p>
							<p>{post.event_id}</p>
							<p>{post.event_name}</p>
							<p>{post.event_date}</p>
						</div>
					))}
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<h5>Guest List</h5>
					<Button>Manage guest list</Button>
					{guests.map((guest) => (
						<div key={guest.id}>
							<p> {guest.id} </p>
							<p>{guest.user_id}</p>
							<p>{guest.first_name}</p>
							<p>{guest.last_name}</p>
							<p>{guest.phone_number}</p>
							<p>{guest.street_address}</p>
							<p>{guest.unit}</p>
							<p>{guest.city}</p>
							<p>{guest.state}</p>
							<p>{guest.zip}</p>
							<p>{guest.allergies}</p>
							<p>{guest.accommodations}</p>
							<p>{guest.contact_email}</p>
							<p>{guest.spouse_party}</p>
							<p>{guest.relationship_to_spouse}</p>
							<p>{guest.can_plus_one}</p>
							<p>{guest.plus_one_id}</p>
							<p>{guest.meal_id}</p>
							<p>{guest.plus_one_id}</p>
							<p>{guest.plus_one_first_name}</p>
							<p>{guest.plus_one_last_name}</p>
							<p>{guest.plus_one_meal_id}</p>
							<p>{guest.plus_one_notes}</p>
							<p>{guest.meal_name}</p>
							<Button>edit guest</Button>
						</div>
					))}
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<h5>RSVPs</h5>
					<Button>Manage rsvps</Button>
					{RSVPs.map((repli) => (
						<div key={repli.id}>
							<p> {repli.id} </p>
							<p>{repli.event_id}</p>
							<p>{repli.event_name}</p>
							<p>{repli.event_date}</p>
							<p>{repli.guest_id}</p>
							<p>{repli.first_name}</p>
							<p>{repli.last_name}</p>
							<p>{repli.is_attending}</p>
							<p>{repli.plus_one_id}</p>
							<p>{repli.plus_one_first}</p>
							<p>{repli.plus_one_last}</p>
						</div>
					))}
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<h5>Meals</h5>
					<Button>Manage meals</Button>
					{meals.map((meal) => (
						<div key={meal.id}>
							<p> {meal.id} </p>
							<p>{meal.meal_name}</p>
							<p>{meal.meal_description}</p>
						</div>
					))}
				</Grid>
			</Grid>
		</Container>
	);
}

export default ActiveWedding;
