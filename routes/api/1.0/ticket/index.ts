import express = require('express');
const router = express.Router();
let logger = require('../../../../services/logger.service');

import { GetCWTicketDetails, sendMessageToSlackResponseURL } from '../../../../services/slack.service';


router.post('/', (req: express.Request, res: express.Response) => {
    let token = req.body.token;
    if (token !== 'ixJqRDxBTHhes7gOpg7lWPkt') {
        res.status(400).send("Invalid");
        return;
    }
    logger.info("Slash Command: " + req.body.command + " Received from: " + req.body.user_name + " and query: " + req.body.text)
    res.status(200).header('content-type', 'application/json');
    
    let text: string = req.body.text;
    let ticketID;
    let match = text.match('\\d{6}')
    if (match) {
        ticketID = match[0];
    } else {
        res.status(200).send({ text: "Please input valid ticket number" });
        return;
    }

    res.send({
        text: "One moment while I grab details for ticket #" + ticketID
    })

    Promise.resolve(GetCWTicketDetails(ticketID))
        .then(function (details) {
            sendMessageToSlackResponseURL(req.body.response_url, details);
        }).catch(function (error) {
            let json = {
                text: "Error getting ticket information",
                attachments: [{
                    title: "Error Message",
                    text: error.message
                }
                ]
            }
            sendMessageToSlackResponseURL(req.body.response_url, json);
        })
});

export = router; 
