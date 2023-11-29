const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const pool = require("../modules/pool");
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

let transporter = nodemailer.createTransport({
	service: "gmail",
	pool: true,
	auth: {
		user: "antarzack@gmail.com", // replace with your email address
		pass: "yolo ruhm tjas hnow", // replace with your client ID
	},
});

router.post("/send_email", rejectUnauthenticated, async (req, res) => {
	const client = await pool.connect();
	console.log(req.body);
	const { wedding_id } = req.body;
	const getEmailsQuery = `
    SELECT guest_list_junction.id AS j_id, guest_list_junction.invite_sent, "user".username, "user".temp_pass, wedding.wedding_blurb, to_char(wedding.wedding_date, 'Month DD, YYYY') AS wedding_date, wedding.spouse_1, wedding.spouse_2
    FROM guest_list_junction
    JOIN "user" on "user".id = guest_list_junction.guest_id
    JOIN wedding on wedding.id = guest_list_junction.wedding_id
    WHERE guest_list_junction.wedding_id = $1 AND invite_sent = false
    ;`;
	const updateInvitedStatus = `
    UPDATE guest_list_junction
    SET invite_sent = true
    WHERE id = $1
    ;`;

	try {
		await client.query("BEGIN");

		const get_emails = await client.query(getEmailsQuery, [wedding_id]);
		const allEmails = get_emails.rows;
		// console.log(allEmails);

		const sendAllEmails = allEmails.map(async (email) => {
			let mailOptions = {
				from: "antarzack@gmail.com",
				to: `replireservation@gmail.com`,
				subject: `You're invited to ${email.spouse_1} and ${email.spouse_2}'s wedding`,
				text: `
		        You're invited to ${email.spouse_1} and ${email.spouse_2}'s wedding on ${email.wedding_date}.
		        ${email.spouse_1} and ${email.spouse_2} are using Repli to organize their wedding. Please log in with these credentials to see details about the events, and send your RSVPs:
		        Username: ${email.username}
		        Temporary Password: ${email.temp_pass}

		        You will be prompted to change your password when you first log in :D
		        `,
			};

			return new Promise(async (resolve, reject) => {
				 transporter.sendMail(mailOptions, async (err, data) => {
					if (err) {
						console.log("== Message Failed ==", err);
						reject(err);
					} else {
                        try {
                            await client.query(updateInvitedStatus, [email.j_id]);
                            console.log("== Message Sent ==", data.response);
                            resolve();
                        } catch (error) {
                            console.log(error);
                        }

					}
				});
			});
		});
		// const updateStatus = await allEmails.map(async(email) => {
		//     console.log(email);
		//     return new Promise((resolve, reject)=>{
		//         client.query(updateInvitedStatus, [email.jId], (err, res) => {
		//        if (err) {
		//           console.log("== Failed to update status ==", err);
		//           reject(err);
		//        } else {
		//           resolve();
		//        })
		//     })})

		// const updateStatus = allEmails.map(async (email) => {
		// 	return new Promise((resolve, reject) => {
		// 		client.query(updateInvitedStatus, [email.jId], (err, res) => {
		// 			if (err) {
		// 				console.log("== Failed to update status ==", err);
		// 				reject(err);
		// 			} else {
		// 				console.log("== Updated status ==", res);
		// 				resolve();
		// 			}
		// 		});
		// 	});
		// });

		// await Promise.all(updateStatus);
		await Promise.all(sendAllEmails);
		// await Promise.all(updateStatus);
		await client.query("COMMIT");
		res.sendStatus(201);
	} catch (error) {
		await client.query("ROLLBACK");
		console.log("ERROR WITH /send_email", error);
		res.sendStatus(500);
	} finally {
		await client.release();
	}
});

module.exports = router;
