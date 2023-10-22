const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Endpoint to query a guest list for a specific wedding by the wedding id
router.get("/:wedding_id", rejectUnauthenticated, (req, res) => {
	const queryText = `;`;
    const wedding_id = req.params.id
	pool.query(queryText)
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.log(": ", err);
			res.sendStatus(500);
		});
});
// Endpoint to create guest info to a wedding's guest list
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

// Endpoint to change existing user's guest information (name, address, etc...)
router.put("/", rejectUnauthenticated, (req, res) => {
    const queryText = `;`;
	const {} = req.body;
	pool.query(queryText)
		.then((result) => res.sendStatus(201))
		.catch((err) => {
			console.log(": ", err);
			res.sendStatus(500);
		});
});

module.exports = router;
