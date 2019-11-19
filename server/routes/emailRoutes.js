const router = require('express').Router()
const db = require('./../db')
const nodemailer = require('nodemailer')

router.post(
	'/emails/send',
	[
			check('to')
					.isEmail()
					.withMessage('Please enter a valid email address.'),
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

			if (req.body.to && req.body.text && req.body.username) {
				async function main() {
					// create reusable transporter object using the default SMTP transport

					let transporter = nodemailer.createTransport({
						service: 'gmail',
						auth: {
									 user: 'youremail@address.com',
									 pass: 'yourpassword'
							 }
					 });

					// send mail with defined transport object
					let info = await transporter.sendMail({
							from: '"Fred Foo 👻" <foo@example.com>', // sender address
							to: 'bar@example.com, baz@example.com', // list of receivers
							subject: 'Hello ✔', // Subject line
							text: 'Hello world?', // plain text body
							html: '<b>Hello world?</b>' // html body
					});

					console.log('Message sent: %s', info.messageId);
					// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

					// Preview only available when sending through an Ethereal account
					console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
					// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
				}

				main().catch(console.error);
			} else {
					console.log(error)
					res.status(400).json({response: "Required user data for accessing this page is missing." })
			}
})


module.exports = router;
