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
					
			} else {
					console.log(error)
					res.status(400).json({response: "Required user data for accessing this page is missing." })
			}
})


module.exports = router;
