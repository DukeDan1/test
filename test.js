/*jshint esversion: 8 */
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.disable('x-powered-by');
app.set('trust proxy',true); 
var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
};
app.use(bodyParser.json({ verify: rawBodySaver, limit:'50mb' }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true, limit:'50mb' }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*', limit:'50mb' }));

app.all('/', (req, res) => {
    res.json({success: true, message: "Hello, World!"});
});

app.post('/test', (req, res) => {
    if(!req.body.msg) return res.json({success:false, reason: "Missing data"});
    res.json({success:true, message: `Received message ${req.body.msg}.`});
    console.log(req.body);
});

app.all("/status-check", (req, res) => res.json({online: true}));

app.get('/html-file', (req, res) => res.sendFile('test.html', {root: '.'}));

app.listen(port, '0.0.0.0', () => {
  console.log(`Webserver running on port 7000.`);
});