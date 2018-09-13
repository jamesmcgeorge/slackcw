import express = require('express');
const router = express.Router();
const ticket = require('./ticket/index');

router.use('/ticket', ticket);

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("BAD LINK");
});

export = router; 
