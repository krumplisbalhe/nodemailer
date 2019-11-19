const router = require('express').Router()
const db = require('./../db')
const {check, validationResult} = require('express-validator');
const nodemailer = require('nodemailer')
const credentials = require('../credentials')

router.post(
	'/emails/send',
	[
		check('to')
			.isEmail()
			.withMessage('Please enter a valid email address.'),
		check('subject')
			.isLength({ min: 0 }, { max: 15 })
			.withMessage('Subject must be between 0 and 15 characters.'),
		check('text')
			.isLength({ min: 1 }, { max: 200 })
			.withMessage('Message must be between 1 and 200 characters.'),
],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			console.log(errors)
			return res.status(400).json({ error: errors.array() })
		}
		//TODO: get this out from some kind of authentication
		const users = await db.get().collection('users').find({"userName": req.body.username}).toArray()
		const user = users[0]

		if (req.body.to && req.body.text && req.body.username && req.body.subject) {
			async function main() {
				let transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: credentials.user,
						pass: credentials.password
					}
				})

				const mailOptions = {
					to: req.body.to,
					subject: req.body.subject,
					html: req.body.text
				}

				transporter.sendMail(mailOptions, function (err, info) {
					if(err)
						console.log(err)
					else
						db.get().collection('users').update({userName: req.body.username}, {$push: {messages: {to: req.body.to, subject: req.body.subject, text: req.body.text}}}), (error, result) => {
							if (error){
									console.log(error)
									return res.status(500).json({ error: "Couldn't save message"})
							} else {
									console.log(result)
							}
						}
						console.log(info)
						return res.status(200).json({response: `Email has been sent to ${req.body.to}`})
				})

			}
			main().catch(console.error)
		} else {
			console.log(error)
			res.status(400).json({response: "Required user data for accessing this page is missing."})
		}
})


module.exports = router
