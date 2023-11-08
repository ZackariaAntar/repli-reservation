const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
	const queryText = `;`;
	const user_id = req.user.id;
	pool.query(queryText, [user_id])
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.log(": ", err);
			res.sendStatus(500);
		});
});

router.post("/", rejectUnauthenticated, (req, res) => {
	const queryText = `;`;
	const {} = req.body;
	pool.query(queryText)
		.then((result) => res.sendStatus(201))
		.catch((err) => {
			console.log(": ", err);
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
