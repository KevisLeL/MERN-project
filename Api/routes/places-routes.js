const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {

    console.log('GET Request in places');
    res.json({message: 'It works dude!'});
});

module.exports = router;