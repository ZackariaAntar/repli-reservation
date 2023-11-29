const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const pool = require("../modules/pool");
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const passport = require("passport");

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.EMAIL,
		pass: process.env.WORD,
		clientId: process.env.OAUTH_CLIENTID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
	},
});

router.post("/send_email", rejectUnauthenticated, async (req, res) => {
	const client = await pool.connect();
	const { wedding_id } = req.body;
	const queryText = `
    SELECT "user".username, "user".temp_pass, wedding.wedding_blurb, to_char(wedding.wedding_date, 'Month DD, YYYY') AS wedding_date, wedding.spouse_1, wedding.spouse_2 FROM guest_list_junction
    JOIN user on user.id = guest_list_junction.guest_id
    JOIN wedding on wedding.id = guest_list_junction.wedding_id
    WHERE guest_list_junction.wedding_id = $1 AND invite_sent = false
    ;`;

	try {
		await client.query("BEGIN");

		const get_emails = await client.query(queryText, [wedding_id]);
		const allEmails = get_emails.rows;
		console.log(allEmails);

		await allEmails.map((email) => {
			let mailOptions = {
				from: `${req.body.mailerState.email}`,
				to: email,
				subject: `Message from: ${req.body.mailerState.email}`,
				text: `
                You're invited to ${email.spouse_1} and ${email.spouse_2}'s wedding on ${email.wedding_date}.
                ${email.spouse_1} and ${email.spouse_2} are using Repli to organize their wedding. Please log in with these credentials to see details about the events, and send your RSVPs:
                Username: ${email.username}
                Temporary Password: ${email.temp_pass}

                You will be prompted to change your password when you first log in :D
                `,
			};

			transporter.sendMail(mailOptions, function (err, data) {
				if (err) {
					res.json({
						status: "fail",
					});
				} else {
					console.log("== Message Sent ==");
					res.json({
						status: "success",
					});
				}
			});
		});

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

module.exports = router;
