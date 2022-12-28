const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const router = express.Router();

//Get method here is also reponsible for the exact path
router.get('/', (req, res, next) => {   // The url must start with a slash
    // console.log("In the next middleware");
    // res.send('<h1>Hello from Express! </h1>');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;