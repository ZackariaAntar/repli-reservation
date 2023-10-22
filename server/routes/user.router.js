const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  // TODO: MIGHT NEED TO CHANGE THE QUERY FOR USER TO BE MORE DATA RICH IN ORDER TO BETTER SERVE CLIENT SIDE REQUESTS/AUTHORIZATIONS
  res.send(req.user);
});

// Handles POST request with new user data
// async post to guest_info table after user create profile for themselves
router.post('/register', async (req, res, next) => {
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
		accomodations,
	} = req.body;
	// user_id might only need to be req.user
	const user_id = req.user.id;

	const username = req.body.username;
	const password = encryptLib.encryptPassword(req.body.password);

	const authData = [username, password];

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
		accomodations,
	];

	const client = await pool.connect();

	const createUserQuery = `
  INSERT INTO "user" (username, password)
  VALUES ($1, $2) RETURNING id;`;

	const addDetailsQuery = `
  INSERT INTO "guest_info" (user_id, first_name, last_name,	phone_number,	street_address, unit, city, state, zip, allergies, accomodations)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
  `;

	// assignRelationshipQuery MIGHT NEED TO LIVE SOMEWHERE ELSE!!
	// DOUBLE CHECK TO MAKE SURE THE DEFAULTS WERE CHANGED ON THE DB!!
	// THIS IS GOING TO BE USED FOR INITAL ADDING PEOPLE TO THE GUEST LIST
	const assignRelationshipQuery = `
  UPDATE TABLE guest_list_junction SET relationship = $1 SET spouse_association = $2 SET can_plus_one = $3
  WHERE wedding_id = $4 AND guest_id = $5
  ;`;

	try {
		await client.query("BEGIN");
		await client.query(createUserQuery, [authData]);
		await client.query(addDetailsQuery, [userDetails]);
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

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
