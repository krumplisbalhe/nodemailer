const router = require('express').Router()
const {check, validationResult} = require('express-validator')
const nodemailer = require('nodemailer')
const db = require('./../db')
const credentials = require('../credentials')

router.post(
  '/emails/send',
  [
    check('to')
      .isEmail()
      .withMessage('Please enter a valid email address.'),
    check('subject')
      .isLength({min: 1}, {max: 15})
      .withMessage('Subject must be between 0 and 15 characters.'),
    check('text')
      .isLength({min: 1}, {max: 200})
      .withMessage('Message must be between 1 and 200 characters.')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()})
    }
    // TODO: get the username out from some kind of authentication

    if (req.body.to && req.body.text && req.body.username && req.body.subject) {
      const main = async () => {
        const transporter = nodemailer.createTransport({
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

        transporter.sendMail(mailOptions, async () => {
          await db.get().collection('users').updateMany({userName: req.body.username}, {$push: {messages: {to: req.body.to, subject: req.body.subject, text: req.body.text}}})
          const userData = await db.get().collection('users').find({userName: req.body.username}).toArray()
          return res.status(200).json({response: `Email has been sent to ${req.body.to}`, userData})
        })
      }
      main().catch(console.error)
    } else {
      res.status(400).json({response: 'Required data to send email is missing.'})
    }
  }
)

module.exports = router
