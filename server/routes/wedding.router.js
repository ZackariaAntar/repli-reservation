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
