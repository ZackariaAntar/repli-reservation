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
	SELECT
	wedding.id AS wedding_id,
	wedding.wedding_title,
	to_char(wedding.wedding_date, 'Month DD, YYYY') AS wedding_date,
	wedding.wedding_photo,
	wedding.wedding_blurb FROM guest_list_junction
	JOIN wedding ON wedding.id = guest_list_junction.wedding_id
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

router.get("/active_RSVP_details/:id", rejectUnauthenticated, (req, res) => {
	const queryText = `SELECT
	events.*, to_char(events.event_date, 'Month DD, YYYY') AS event_date,
	TO_CHAR(events.event_start_time, 'FMHH12:MI am') AS event_start_time,
	TO_CHAR(events.event_end_time, 'FMHH12:MI am') AS event_end_time,
	meal_options.meal_name,
	meal_options.meal_description,
	event_attendees_junction.event_id,
	event_attendees_junction.is_attending,
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
	JOIN event_attendees_junction ON event_attendees_junction.guest_id = guest_list_junction.guest_id
	JOIN plus_one ON plus_one.id = guest_list_junction.plus_one_id
	JOIN wedding ON wedding.id = guest_list_junction.wedding_id
	JOIN meal_options ON meal_options.id = guest_list_junction.meal_id
	JOIN events ON events.id = event_attendees_junction.event_id
	WHERE guest_list_junction.wedding_id = $1 AND guest_list_junction.guest_id = $2
	ORDER BY events.id ASC;`
	const wedding_id = req.params.id;
	const user_id = req.user.id;
	pool.query(queryText, [wedding_id, user_id])
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.log(
				`Failed to ${queryText}, $1 used in query is: ${wedding_id}, $2 used in query is : ${user_id}`,
				err
			);
			res.sendStatus(500);
		});
});

router.get("/active_details/:id", rejectUnauthenticated, (req, res) => {
	console.log("get active wedding", req.params);
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
router.get("/active_events/:id", rejectUnauthenticated, (req, res) => {
	const queryText = `SELECT events.*, to_char(events.event_date, 'Month DD, YYYY') AS event_date, TO_CHAR(events.event_start_time, 'FMHH12:MI am') AS event_start_time,
   TO_CHAR(events.event_end_time, 'FMHH12:MI am') AS event_end_time FROM events WHERE events.wedding_id = $1;`;
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
router.get("/active_guests/:id", rejectUnauthenticated, (req, res) => {
	const queryText = `
SELECT
	guest_info.*,
	"user".username AS contact_email,
	guest_list_junction.spouse_association AS spouse_party,
	relationship.category AS relationship_to_spouse,
	guest_list_junction.can_plus_one,
	(SELECT meal_options.meal_name FROM meal_options WHERE meal_options.id = guest_list_junction.meal_id) AS guest_meal_choice,
	(SELECT plus_one.first_name FROM plus_one WHERE plus_one.id = guest_list_junction.plus_one_id) AS plus_one_first_name,
	(SELECT plus_one.last_name FROM plus_one WHERE plus_one.id = guest_list_junction.plus_one_id) AS plus_one_last_name,
	(SELECT plus_one.notes FROM plus_one WHERE plus_one.id = guest_list_junction.plus_one_id) AS plus_one_notes,
	(SELECT meal_options.meal_name FROM meal_options WHERE meal_options.id = plus_one.meal_id ) AS plus_one_meal_choice
	FROM guest_list_junction
	JOIN "user" ON "user".id = guest_list_junction.guest_id
	JOIN guest_info ON guest_info.user_id = guest_list_junction.guest_id
	JOIN relationship ON relationship.id = guest_list_junction.relationship
	LEFT JOIN plus_one ON plus_one.id = guest_list_junction.plus_one_id
	WHERE guest_list_junction.wedding_id = $1;`;

	const wedding_id = req.params.id;
	pool.query(queryText, [wedding_id])
		.then((result) => {
			res.send(result.rows);
		})
		.catch((err) => {
			console.log(
				`Failed to ${queryText}, $1 used in query is: ${wedding_id}`,
				err
			);
			res.sendStatus(500);
		});
});

router.get("/active_meals/:id", rejectUnauthenticated, (req, res) => {
	const queryText = `SELECT meal_options.id, meal_options.meal_name, meal_options.meal_description FROM meal_options WHERE meal_options.wedding_id = $1;`;
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

router.get("/active_posts/:id", rejectUnauthenticated, (req, res) => {
	const queryText = `
	SELECT
	wedding_announcements.id,
	wedding_announcements.announcement,
	guest_info.first_name AS creator_first_name,
	guest_info.last_name AS creator_last_name,
	events.id AS event_id,
	events.event_name,
	to_char(events.event_date, 'Month DD, YYYY') AS event_date
	FROM wedding_announcements
	JOIN guest_info ON guest_info.user_id = wedding_announcements.creator_id
	JOIN events ON events.id = wedding_announcements.event_id
	WHERE wedding_announcements.wedding_id = $1;
`;
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
// ORIGINAL QUERY
// router.get("/active_replis/:id", rejectUnauthenticated, (req, res) => {
// 	const queryText = `
// 	SELECT
// 	events.id AS event_id,
// 	events.event_name,
// 	to_char(events.event_date, 'Month DD, YYYY') AS event_date,
// 	guest_info.user_id AS guest_id,
// 	guest_info.first_name,
// 	guest_info.last_name,
// 	event_attendees_junction.is_attending,
// 	plus_one.id AS plus_one_id,
// 	plus_one.first_name AS plus_one_first,
// 	plus_one.last_name AS plus_one_last
// 	FROM event_attendees_junction
// 	JOIN events ON events.id = event_attendees_junction.event_id
// 	JOIN guest_info ON guest_info.id = event_attendees_junction.guest_id
// 	JOIN guest_list_junction ON guest_list_junction.wedding_id = event_attendees_junction.wedding_id
// 	JOIN plus_one ON plus_one.id = guest_list_junction.plus_one_id
// 	WHERE event_attendees_junction.wedding_id = $1;`;
// 	const wedding_id = req.params.id;
// 	pool.query(queryText, [wedding_id])
// 		.then((result) => res.send(result.rows))
// 		.catch((err) => {
// 			console.log(
// 				`Failed to ${queryText}, $1 used in query is: ${wedding_id}`,
// 				err
// 			);
// 			res.sendStatus(500);
// 		});
// });

// MODIFIED
router.get("/active_replis/:id", rejectUnauthenticated, (req, res) => {
	console.log("active replis", req.params);
	const queryText = `
	WITH guest_info_cte AS (
    SELECT
        guest_info.id AS guest_id,
        guest_info.first_name AS guest_first_name,
        guest_info.last_name AS guest_last_name,
        event_attendees_junction.is_attending,
        events.id AS event_id,
        events.event_name,
        to_char(events.event_date, 'Month DD, YYYY') AS event_date,
        plus_one.first_name AS plus_one_first_name,
        plus_one.last_name AS plus_one_last_name
    FROM
        event_attendees_junction
    JOIN events ON events.id = event_attendees_junction.event_id
    JOIN guest_info ON guest_info.id = event_attendees_junction.guest_id
    LEFT JOIN guest_list_junction ON guest_list_junction.guest_id = guest_info.id
    LEFT JOIN plus_one ON plus_one.id = guest_list_junction.plus_one_id
    WHERE events.wedding_id = $1
)

SELECT
    event_id,
    event_name,
    event_date,
    jsonb_agg(
        jsonb_build_object(
            'guest_id', guest_id,
            'guest_first_name', guest_first_name,
            'guest_last_name', guest_last_name,
            'plus_one_first_name', plus_one_first_name,
            'plus_one_last_name', plus_one_last_name,
            'status',
            CASE
                WHEN is_attending = TRUE THEN 'Attending'
                WHEN is_attending IS NULL THEN 'Pending'
                WHEN is_attending = FALSE THEN 'Declined'
            END
        )
    ) AS guests,
    COUNT(DISTINCT guest_id) FILTER (WHERE is_attending = TRUE) + COUNT(DISTINCT plus_one_first_name) FILTER (WHERE plus_one_first_name IS NOT NULL AND is_attending = TRUE) AS num_attending,
    COUNT(DISTINCT guest_id) FILTER (WHERE is_attending IS NULL) + COUNT(DISTINCT plus_one_first_name) FILTER (WHERE plus_one_first_name IS NOT NULL AND is_attending IS NULL) AS num_pending,
    COUNT(DISTINCT guest_id) FILTER (WHERE is_attending = FALSE) + COUNT(DISTINCT plus_one_first_name) FILTER (WHERE plus_one_first_name IS NOT NULL AND is_attending = FALSE) AS num_declined
FROM
    guest_info_cte
GROUP BY
    event_id, event_name, event_date
ORDER BY
    event_date ASC;
`;
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
		spouse_2,
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
			console.log(
				`Problem with ${queryText}, Data used in post: ${req.body}`,
				err
			);
			res.sendStatus(500);
		});
});

router.post(
	"/guest_confirm_meal_and_plus_one",
	rejectUnauthenticated,
	async (req, res) => {
		const client = await pool.connect();

		const {
			wedding_id,
			guest_id,
			meal_id,
			first_name,
			last_name,
			plus_meal_id,
			notes,
		} = req.body;

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
		} finally {
			await client.release();
		}
	}
);

router.post(
	"/invitation/add_guests_to_event",
	rejectUnauthenticated,
	async (req, res) => {
		const addToEventQuery = `
		INSERT INTO event_attendees_junction(guest_id, wedding_id, event_id)
		VALUES($1, $2, $3);
		`;
		const client = await pool.connect();
		const guestData = req.body;
		try {
			for (let i = 0; i < guestData.length; i++) {
				const entry = guestData[i];
				console.log("weddingrouter addGuestsToEvents", { entry });
				await client.query("BEGIN");
				await client.query(addToEventQuery, [
					entry.guest_id,
					entry.wedding_id,
					entry.event_id,
				]);
			}
			await client.query("COMMIT");
			return res.sendStatus(201);
		} catch (error) {
			await client.query("ROLLBACK");
			console.log("ERROR WITH ADDING GUEST TO EVENT", error);
			return res.sendStatus(500);
		} finally {
			await client.release();
		}
	}
);
router.post(
	"/invitation/delete_guest_from_event",
	rejectUnauthenticated,
	(req, res) => {
		console.log(req.body);

		const { guest_id, wedding_id, event_id } = req.body;
		const removeFromEventQuery = `
		DELETE FROM event_attendees_junction WHERE guest_id = $1 AND wedding_id=$2 AND event_id = $3;
		`;
		pool.query(removeFromEventQuery, [guest_id, wedding_id, event_id])
			.then(() => res.sendStatus(200))
			.catch((err) => {
				console.log(
					`Failed to ${removeFromEventQuery}, $1,$2,$3 used in query is: ${guest_id},${wedding_id}, ${event_id}`,
					err
				);
				res.sendStatus(500);
			});
	}
);


module.exports = router;
