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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import EditWeddingDetailsForm from "../EditWeddingDetailsForm/EditWeddingDetailsForm";
import AddEventForm from "../AddEventForm/AddEventForm";
import EditEventForm from "../EditEventForm/EditEventForm";
import AddGuestToEventForm from "../AddGuestToEventForm/AddGuestToEventForm";
import AddAnnouncementForm from "../AddAnnouncementForm/AddAnnouncementForm";
import ActiveWeddingEventCard from "../ActiveWeddingEventCard/ActiveWeddingEventCard";
import GuestListForm from "../GuestListForm/GuestListForm";
import MealForm from "../MealForm/MealForm";
import ActiveWeddingGuestListTable from "../ActiveWeddingGuestListTable.jsx/ActiveWeddingGuestListTable";
import ActiveWeddingEventsBulletin from "../ActiveWeddingEventsBulletin/ActiveWeddingEventsBulletin";

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
	const [expanded, setExpanded] = useState(false);

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
		<Container
			maxWidth="lg"
			// sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
		>
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
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<Button
						variant="outlined"
						onClick={() => setEditWedding(!editWedding)}
						sx={{ p: 1.5, width: "51%", mb: 2, ml:25 }}
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
				<Grid item xs={12} sm={12} md={12}>
					<ActiveWeddingGuestListTable guests={guests} />
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<Button
						startIcon={
							expanded ? (
								<KeyboardArrowUpIcon />
							) : (
								<KeyboardArrowDownIcon />
							)
						}
						variant="outlined"
						sx={{ p: 1.25, width: "51%", mb: 2, ml: 25 }}
						onClick={() => setExpanded(!expanded)}
					>
						{expanded ? "Close" : "Manage RSVPs"}
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
					</Collapse>
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<ActiveWeddingEventsBulletin events={events} />
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
					<h2>Meals</h2>
					{details[0] && <MealForm details={details[0]} />}
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
