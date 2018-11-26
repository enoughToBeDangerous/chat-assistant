const assistant = require('./routes/assistant'); 
const express = require('express');
const api_server = express();
const port = process.env.port || 3001;
const body_parser = require('body-parser');

api_server.use('/api/assistant', assistant);
api_server.use(body_parser.json());
api_server.listen(port, () => {console.log(`listening on port ${port}`)});