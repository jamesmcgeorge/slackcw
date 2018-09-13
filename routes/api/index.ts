import express = require('express');
const router = express.Router();
const v10 = require('./1.0/index');

router.use('/1.0', v10)

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("BAD LINK");
});

export = router; 
