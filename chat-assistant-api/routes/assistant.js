require('dotenv').config();
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const assistant_router = express.Router();
const Assistant = new AssistantV1({
    version: process.env.ASSISTANT_API_VERSION,
    iam_apikey: process.env.ASSISTANT_IAM_APIKEY,
    url: process.env.ASSISTANT_API_URL
});

assistant_router.post('/message/:messageText', (req, res) => {
    Assistant.message({
        workspace_id: process.env.TEST_SKILL_WORKSPACE_ID,
        input: {text: req.params.messageText}
    }, (err, response) => {
        if (err) {
            console.error(err);
            res.send('error');
        } else {
            console.log(JSON.stringify(response, false, 4));
            res.send(JSON.stringify(response));
        }
    });
});

module.exports = assistant_router;