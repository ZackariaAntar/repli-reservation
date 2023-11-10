import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ActiveWedding() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const details = useSelector((store) => store.activeWeddingDetails);
	const events = useSelector((store) => store.activeWeddingEvents);
	const guests = useSelector((store) => store.activeWeddingGuests);
	const meals = useSelector((store) => store.activeWeddingMeals);
	const posts = useSelector((store) => store.activeWeddingPosts);
	const RSVPs = useSelector((store) => store.activeWeddingReplis);

	// TODO: Create and source in components for:
	// - Edit wedding details form
	// - Add/edit event form
	// - Assign guests to events
	// - Send RSVPs via email(single vs batch?): how do we cache temp passwords/can encriptLib decrypt on server before sending?
	// - Add/edit meals form
	// - Add/edit announcement form
	// - Visualize RSVP data.
	return (
		<>
			<p>
				<span>{user.id}</span>
				<span>{user.first_name}</span>
				<span>{user.last_name}</span>
				<span>{user.username}</span>
				<span>{user.phone_number}</span>
			</p>
			{details.map((info) => (
				<div key={info.id}>
					<p> {info.id} </p>
					<p></p>
				</div>
			))}
			{events.map((event) => (
				<div key={event.id}>
					<p> {event.id} </p>
					<p></p>
				</div>
			))}
			{guests.map((guest) => (
				<div key={guest.id}>
					<p> {guest.id} </p>
					<p></p>
				</div>
			))}
			{meals.map((meal) => (
				<div key={meal.id}>
					<p> {meal.id} </p>
					<p></p>
				</div>
			))}
			{posts.map((post) => (
				<div key={post.id}>
					<p> {post.id} </p>
					<p></p>
				</div>
			))}
			{RSVPs.map((repli) => (
				<div key={repli.id}>
					<p> {repli.id} </p>
					<p></p>
				</div>
			))}
			Active Wedding
		</>
	);
}

export default ActiveWedding;
