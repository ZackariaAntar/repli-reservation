const express = require("express");
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
	// Send back user object from the session (previously queried from the database)
	// TODO: MIGHT NEED TO CHANGE THE QUERY FOR USER TO BE MORE DATA RICH IN ORDER TO BETTER SERVE CLIENT SIDE REQUESTS/AUTHORIZATIONS
	res.send(req.user);
});

router.get("/check_existing_users/:wedding_id/:username", (req, res)=>{
const { wedding_id, username } = req.params;

	console.log('req.params', req.params);
	console.log(typeof wedding_id);
	console.log(typeof username);

	queryText = `
	SELECT "user".id AS guest_id, "user".username, guest_list_junction.wedding_id AS check_wed_id FROM "user"
	JOIN guest_list_junction ON guest_list_junction.guest_id = "user".id
	WHERE "user".username = $1;
	`;
	pool.query(queryText, [username])
	.then((result)=>{
		console.log('result.rows', result.rows);
		res.send(result.rows)

	}).catch((err)=>{
		res.sendStatus(500);
		console.log("error on /check_for_duplicates", err);

	})
});



// Handles POST request with new user data
// async post to guest_info table after user create profile for themselves
router.post("/register", async (req, res, next) => {
	console.log("req.body", req.body);
	const {
		first_name,
		last_name,
		phone_number,
		street_address,
		unit,
		city,
		state,
		zip,
		allergies,
		accommodations,
	} = req.body;

	const username = req.body.username;
	const password = encryptLib.encryptPassword(req.body.password);

	const client = await pool.connect();

	const authData = [username, password];
	const createUserQuery = `
  INSERT INTO "user" (username, password)
  VALUES ($1, $2) RETURNING id;`;

	const addDetailsQuery = `
  INSERT INTO "guest_info" (user_id, first_name, last_name,	phone_number, street_address, unit, city, state, zip, allergies, accommodations)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
  `;

	try {
		await client.query("BEGIN");

		const get_user_id = await client.query(createUserQuery, authData);
		const user_id = await get_user_id.rows[0].id; //RETURNING id didn't work in the query so had to improvise

		const userDetails = [
			user_id,
			first_name,
			last_name,
			phone_number,
			street_address,
			unit,
			city,
			state,
			zip,
			allergies,
			accommodations,
		];
		await client.query(addDetailsQuery, userDetails);

		await client.query("COMMIT");
		res.sendStatus(201);
	} catch (error) {
		await client.query("ROLLBACK");
		console.log("ERROR WITH REGISTRATION", error);
		res.sendStatus(500);
	} finally {
		await client.release();
	}
});

router.post("/invited_guest", async (req, res, next) => {
	const client = await pool.connect();
	const {
		first_name,
		last_name,
		phone_number,
		street_address,
		unit,
		city,
		state,
		zip,
		wedding_id,
		relationship,
		spouse_association,
		can_plus_one,
	} = req.body;

	const username = req.body.username;
	const password = encryptLib.encryptPassword(req.body.password); // TODO: figure out if we need to leave this unencrypted for emailing purposes.

	console.log("new guest:", req.body);

	const authData = [username, password, true];

	const createUserQuery = `
  INSERT INTO "user" (username, password, is_temp)
  VALUES ($1, $2, $3) RETURNING id;
  `;

	const addDetailsQuery = `
  INSERT INTO "guest_info" (user_id, first_name, last_name,	phone_number, street_address, unit, city, state, zip)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
  `;

	// MAKE SURE TO GIVE GUESTS THE OPTION TO UPDATE JUNCTION
	const assignRelationshipQuery = `
  INSERT INTO guest_list_junction(wedding_id, guest_id, relationship, spouse_association, can_plus_one)
  VALUES($1, $2, $3, $4, $5)
  ;`;

	try {
		await client.query("BEGIN");

		const get_user_id = await client.query(createUserQuery, authData);
		const user_id = await get_user_id.rows[0].id; //RETURNING id didn't work in the query so had to improvise

		const userDetails = [
			user_id,
			first_name,
			last_name,
			phone_number,
			street_address,
			unit,
			city,
			state,
			zip,
		];

		const get_guest_id = await client.query(addDetailsQuery, userDetails);
		const guest_id = await get_guest_id.rows[0].id; //RETURNING id didn't work in the query so had to improvise

		const relationshipDetails = [
			wedding_id,
			guest_id,
			relationship,
			spouse_association,
			can_plus_one,
		];
		await client.query(assignRelationshipQuery, relationshipDetails);

		await client.query("COMMIT");
		res.sendStatus(201);
	} catch (error) {
		await client.query("ROLLBACK");
		console.log("ERROR WITH /invited_guest", error);
		res.sendStatus(500);
	} finally {
		await client.release();
	}
});

router.post('/existing_guest', (req,res)=>{
	const {wedding_id, guest_id, relationship, spouse_association, can_plus_one} = req.body

	const assignRelationshipQuery = `
	INSERT INTO guest_list_junction(wedding_id, guest_id, relationship, spouse_association, can_plus_one)
	VALUES($1, $2, $3, $4, $5)
	;`;

	const guestInfo = [
		wedding_id,
		guest_id,
		relationship,
		spouse_association,
		can_plus_one,
	];


	pool.query(assignRelationshipQuery, guestInfo )
	.then((result)=>{
		res.sendStatus(201)
	}).catch((err)=>{
		console.log('ERROR WITH POST ON /existing_guest', err);
		res.sendStatus(500)
	})
});


router.post("/change_password", (req, res) => {
	console.log('ARRIVED ON /CHANGE_PASSWORD');
	const { username, oldPassword, newPassword } = req.body;
	pool.query('SELECT * FROM "user" WHERE username = $1', [username])
		.then((result) => {
			const user = result && result.rows && result.rows[0];
			if (
				(user &&
					encryptLib.comparePassword(oldPassword, user.password)) ||
				(user && oldPassword === user.password)
			) {
				console.log("--------------------user && passwords match");
				// The old password is correct, so update the password
				const encryptedNewPassword =
					encryptLib.encryptPassword(newPassword);
				pool.query(
					'UPDATE "user" SET password = $1, is_temp = false WHERE id = $2',
					[encryptedNewPassword, user.id]
				)
					.then(() => {
						res.sendStatus(200);
					})
					.catch((error) => {
						console.log("Error with query for user ", error);
						res.sendStatus(500);
					});
			} else {
				// The old password is incorrect
				res.sendStatus(401);
			}
		})
		.catch((error) => {
			console.log("Error with query for user ", error);
			res.sendStatus(500);
		});
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
	if (req.user.is_temp) {
		console.log("USER LOGIN ATTEMPTED WITH TEMPORARY PASSWORD, REDIRECTING THEM TO CHANGE THEIR PASSWORD");
		res.sendStatus(449);
	} else {
		res.sendStatus(200);
	}
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
	// Use passport's built-in method to log out the user
	req.logout();
	res.sendStatus(200);
});

module.exports = router;
