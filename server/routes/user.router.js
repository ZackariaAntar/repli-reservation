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

	try {
		await client.query("BEGIN");
		await client.query(createUserQuery, authData);
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

router.post('/register_invited_guest', async (req, res, next)=>{
	const client = await pool.connect();
	const {
		username,
		password,
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

	const authData = [username, password, true];

	const createUserQuery = `
  INSERT INTO "user" (username, password, isTemp)
  VALUES ($1, $2, $3) RETURNING id;
  `;

	const addDetailsQuery = `
  INSERT INTO "guest_info" (user_id, first_name, last_name,	phone_number, street_address, unit, city, state, zip, allergies, accomodations)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;
  `;

	// MAKE SURE TO GIVE GUESTS THE OPTION TO UPDATE JUNCTION
	const assignRelationshipQuery = `
  INSERT INTO guest_list_junction(wedding_id, guest_id, relationship, spouse_association, can_plus_one)
  VALUES($1, $2, $3, $4, $5)
  ;`;

	try {
		await client.query("BEGIN");

		const user_id = await client.query(createUserQuery, authData);

		const userDetails = [ user_id, first_name, last_name, phone_number, street_address, unit, city, state, zip, allergies, accomodations];
		const guest_id = await client.query(addDetailsQuery, userDetails);

		const relationshipDetails = [wedding_id, guest_id, relationship, spouse_association, can_plus_one];
		await client.query(assignRelationshipQuery, relationshipDetails);

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

router.post("/change-password", async (req, res, next) => {
	const { oldPassword, newPassword } = req.body;

	// Verify the old password
	pool.query('SELECT * FROM "user" WHERE id = $1', [req.user.id])
		.then((result) => {
			const user = result && result.rows && result.rows[0];
			if (
				user &&
				encryptLib.comparePassword(oldPassword, user.password)
			) {
				// The old password is correct, so update the password
				const encryptedNewPassword =
					encryptLib.encryptPassword(newPassword);
				pool.query(
					'UPDATE "user" SET password = $1, isTemp = false WHERE id = $2',
					[encryptedNewPassword, req.user.id]
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
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  if (req.user.isTemp) {
		res.redirect("login/change-password");
  } else {
		res.sendStatus(200);
  }
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;

