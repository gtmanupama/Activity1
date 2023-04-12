const express = require('express')
const router = express.Router()

// Import Person schema
const Person = require('./../../models/Person')

//@type     -   GET
//@route    -   /api/profile
//@desc     -   Just for testing
//@access   -   PUBLIC
router.get('/', (req, res) => res.send('Profile related routes'))


//@type     -   GET
//@route    -   /api/profile/get
//@desc     -   Get all people record
//@access   -   PUBLIC
router.get('/get-username', async (req, res) => {
    
    // without cursor.
    const people = await Person.find({});
    try {
        res.send(people);
    } catch (error) {
        res.status(500).send(error);
    }
})

//@type     -   POST
//@route    -   /api/profile/add
//@desc     -   Insert a person record
//@access   -   PUBLIC
//Adding user
router.post('/add-username', (req, res) => {
    // check to keep usernames unique
    Person
        .findOne({username: req.body.username})
        .then(person => {
            if (person) {
                return res
                        .status(400)
                        .send('Username already exists')    
            } else {
                const newPerson = Person({
                    username: req.body.username
                })

                newPerson
                    .save()
                    .then(person => res.send(person))
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})

module.exports = router