const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.post("/event", rejectUnauthenticated, (req, res) => {
	const queryText = `
    INSERT INTO events(
        wedding_id,
        event_broadcast,
        event_name,
        event_street_address,
        event_city,
        event_state,
        event_zip,
        event_maps_url,
        event_date,
        event_start_time,
        event_end_time
        )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`;
	const {
		wedding_id,
		event_broadcast,
		event_name,
		event_street_address,
		event_city,
		event_state,
		event_zip,
		event_maps_url,
		event_date,
		event_start_time,
		event_end_time,
	} = req.body;
	pool.query(queryText, [
		wedding_id,
		event_broadcast,
		event_name,
		event_street_address,
		event_city,
		event_state,
		event_zip,
		event_maps_url,
		event_date,
		event_start_time,
		event_end_time,
	])
		.then(() => {
			res.sendStatus(201);
		})
		.catch((err) => {
			console.log("Problem with ADD EVENT on Actions Router", err, "\n query:", queryText);
			res.sendStatus(500);
		});
	// POST route code here
});
router.post("/announcement", rejectUnauthenticated, (req, res) => {
	const queryText = `
    INSERT INTO wedding_announcements(creator_id,wedding_id,event_id,announcement)
    VALUES($1,$2,$3,$4)
    ;`;
	const {creator_id,wedding_id,event_id,announcement} = req.body;
	pool.query(queryText, [creator_id, wedding_id, event_id, announcement])
		.then(() => {
			res.sendStatus(201);
		})
		.catch((err) => {
			console.log(
				"Problem with ADD ANNOUNCEMENT on Actions Router",
				err,
				"\n query:",
				queryText
			);
			res.sendStatus(500);
		});
	// POST route code here
});
router.post("/meal", rejectUnauthenticated, (req, res) => {
	const queryText = `
    INSERT INTO meal_options(wedding_id,meal_name,meal_description)
    VALUES($1,$2,$3)
    ;`;
	const {wedding_id,meal_name,meal_description} = req.body;
	pool.query(queryText, [wedding_id, meal_name, meal_description])
		.then(() => {
			res.sendStatus(201);
		})
		.catch((err) => {
			console.log(
				"Problem with ADD MEAL on Actions Router",
				err,
				"\n query:",
				queryText
			);
			res.sendStatus(500);
		});
});

router.delete("/meal/:id", rejectUnauthenticated, (req, res) => {
	const queryText = `
	DELETE FROM meal_options WHERE id = $1;`;
	pool.query(queryText, [req.params.id])
	.then(() => res.sendStatus(200))
	.catch((err) => {
		console.log('Failed to delete meal', err)
	})
})

router.post("/update/wedding", rejectUnauthenticated, (req, res) => {
    console.log('/actions/update/wedding', req.body);
	const queryText = `
    UPDATE wedding SET wedding_blurb = $1, wedding_title=$2, wedding_date =$3
    WHERE "id" = $4
    ;`;
	const { wedding_blurb, wedding_title, wedding_date, id } = req.body;
	pool.query(queryText, [
		wedding_blurb,
		wedding_title,
		wedding_date,
		id,
	])
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(
				"Problem with UPDATE WEDDING DETAILS on Actions Router",
				err,
				"\n query:",
				queryText
			);
			res.sendStatus(500);
		});
	// POST route code here
});



module.exports = router;
