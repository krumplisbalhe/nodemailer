const router = require('express').Router()
const bcrypt = require('bcrypt')
const db = require('./../db')
const { check, validationResult } = require('express-validator')

const saltRounds = 10

router.post(
    '/users/signup',
    [
        check('username')
            .isLength({ min: 3 }, { max: 20 })
            .withMessage('Username must be between 3 and 20 characters.'),
        check('email')
            .isEmail()
            .withMessage('Email is invalid.'),
        check('password')
            .isLength({ min: 5 }, { max: 15 })
            .withMessage('Password must be between 5 and 15 characters.')
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ error: errors.array() })
        }

        if (await db.get().collection('users').find({'userName': req.body.username}).count()!=0){
            return res.status(400).json({ error: "Username already exists." })
        }
        if (await db.get().collection('users').find({'emailAddress': req.body.email}).count()!=0){
            return res.status(400).json({ error: "Email already exists." })
        }

        if (req.body.username && req.body.email && req.body.password) {
            bcrypt.hash(req.body.password, saltRounds, async (error, hashedPassword) => {
                if (error) {
                    console.log(error)
                    res.status(500).json({ error: "Problem with hashing the password" })
                }
                db.get().collection('users').insertOne({'userName': req.body.username, 'emailAddress': req.body.email,'password': hashedPassword }, (error, result) => {
                    if (error){
                        console.log(error)
                        res.status(500).json({ error: "Couldn't create user"})
                    } else {
                        console.log(result)
                        res.status(200).json(result)
                    }
                })
            })
        } else {
            console.log(error)
            res.status(400).json({response: "Required user data for signup is missing." })
        }
})

// router.post('/users/signin', async(req,res) => {
//     const user = await db.get().collection('users').find({userName: req.body.username})
//     // const users = await User.query().select().where({username: req.body.username}).limit(1)
//     // const user = users[0]

//     if (user) {
//         bcrypt.compare(req.body.password, user.password, (error, response) => {
//             if (error) {
//                 res.status(500).json({ response: "Problem hashing the password" });
//             }
//             if (response === true) {
//                 res.status(200).json({"response ": "nice"});
//             } else {
//                 res.status(401).json({});
//             }
//         });
//     } else {
//         res.status(401).json({"response": "User missing"});
//     }
// })

module.exports = router;
