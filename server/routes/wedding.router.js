const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Endpoint for getAllMyWeddingsDetails
router.get("/all_weddings", rejectUnauthenticated, (req, res) => {
	const queryText = `SELECT wedding.*, to_char(wedding.wedding_date, 'Month DD, YYYY') AS wedding_date FROM wedding WHERE wedding.wedding_creator_id = $1;`;
	const user_id = req.user.id;
	pool.query(queryText, [user_id])
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.log(
				`Failed to ${queryText}, $1 used in query is: ${user_id}`,
				err
			);
			res.sendStatus(500);
		});
});
router.get("/all_RSVPs", rejectUnauthenticated, (req, res) => {
	const queryText = `
	SELECT guest_list_junction.id AS rsvp_id,
	guest_list_junction.can_plus_one,
	guest_list_junction.meal_id AS my_meal,
	plus_one.first_name AS po_first_name,
	plus_one.last_name AS po_last_name,
	plus_one.meal_id AS po_meal,
	plus_one.id AS po_id,
	wedding.id AS wedding_id,
	wedding.wedding_title,
	to_char(wedding.wedding_date, 'Month DD, YYYY') AS wedding_date,
	wedding.wedding_photo,
	wedding.wedding_blurb FROM guest_list_junction
	JOIN plus_one ON plus_one_id = guest_list_junction.plus_one_id
	JOIN wedding ON wedding_id = guest_list_junction.wedding_id
	WHERE guest_list_junction.guest_id = $1
	ORDER BY wedding.wedding_date ASC;
	`;
	const user_id = req.user.id;
	pool.query(queryText, [user_id])
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.log(
				`Failed to ${queryText}, $1 used in query is: ${user_id}`,
				err
			);
			res.sendStatus(500);
		});
});

router.get("/active_details/:id", rejectUnauthenticated, (req, res) => {
	const queryText = `SELECT wedding.*, to_char(wedding.wedding_date, 'Month DD, YYYY') AS wedding_date FROM wedding WHERE wedding.id = $1;`;
	const wedding_id = req.params.id;
	pool.query(queryText, [wedding_id])
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.log(
				`Failed to ${queryText}, $1 used in query is: ${wedding_id}`,
				err
			);
			res.sendStatus(500);
		});
});


router.post("/new_wedding", rejectUnauthenticated, (req, res) => {
	const queryText = `
	INSERT INTO wedding(wedding_photo, wedding_blurb, wedding_title, wedding_date, wedding_creator_id, spouse_1, spouse_2)
	VALUES($1, $2, $3, $4, $5, $6, $7)
	;`;

	const {
		wedding_photo,
		wedding_blurb,
		wedding_title,
		wedding_date,
		wedding_creator_id,
		spouse_1,
		spouse_2
	} = req.body;

	const weddingDetails = [
		wedding_photo,
		wedding_blurb,
		wedding_title,
		wedding_date,
		wedding_creator_id,
		spouse_1,
		spouse_2,
	];
	pool.query(queryText, weddingDetails)
		.then((result) => res.sendStatus(201))
		.catch((err) => {
			console.log(`Problem with ${queryText}, Data used in post: ${req.body}`, err);
			res.sendStatus(500);
		});
});

router.post("/guest_confirm_meal_and_plus_one", rejectUnauthenticated, async (req, res) => {
	const client = await pool.connect();

	const {wedding_id, guest_id, meal_id, first_name, last_name, plus_meal_id, notes} = req.body;

	const plusOneDetails = [first_name, last_name, plus_meal_id, notes];
	const addPlusOne = `
	INSERT INTO plus_one(first_name, last_name, meal_id, notes)
	VALUES($1, $2, $3, $4) RETURNING id;
	`;

	const chooseMeal = `
	UPDATE TABLE guest_list_junction SET plus_one_id = $1 SET meal_id = $2
	WHERE wedding_id = $3 AND guest_id = $4;
	`;
	try {
		await client.query("BEGIN");
		const plus_one_id = await client.query(addPlusOne, plusOneDetails);

		const mealDetails = [plus_one_id, meal_id, wedding_id, guest_id];
		await client.query(chooseMeal, mealDetails);

		await client.query("COMMIT");
		res.sendStatus(201);
	} catch (error) {
		await client.query("ROLLBACK");
		console.log("ERROR WITH REGISTRATION", error);
		res.sendStatus(500);

	} finally{
		await client.release();
	}
});

module.exports = router;
