import express = require('express');
const router = express.Router();
const api = require('./api/index');

router.use('/api', api);

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("BAD LINK");
});

export default router;
