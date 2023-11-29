import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function ActiveWeddingAnnouncements({posts}) {
	const [expanded, setExpanded] = useState(false);
	const btn = { p: 1.5, width: "51%", mb: 2 };

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
				{expanded ? "Close" : "View Announcements"}
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
					{posts.map((post) => (
						<Grid item key={post.id} xs={12} sm={6} md={4}>
							<Card elevation={3}>
								<CardContent>
									<Typography sx={{ fontSize: "1.5rem" }}>
										{post.event_name}
									</Typography>
									<Typography variant="caption">{post.event_date}</Typography>
								</CardContent>
								<CardContent>

										<Typography>
											{post.announcement}
										</Typography>
                                        <br />
										<Typography>
											{`- ${post.creator_first_name} ${post.creator_last_name}`}
										</Typography>

								</CardContent>
							</Card>
							{/* <div>
								<p> {post.id} </p>
								<h4>
									{post.event_name} <br /> {post.event_date}
								</h4>
								<p>{post.creator_first_name}</p>
								<p>{post.creator_last_name}</p>
								<p>{post.event_id}</p>
							</div> */}
						</Grid>
					))}
				</Grid>
			</Collapse>
		</Container>
	);
}

export default ActiveWeddingAnnouncements;
