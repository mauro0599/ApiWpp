// Import Express.js
const VERIFY_TOKEN = "EAAS1yufpNIYBPoAZBz29dqcXSZB4tWDsZAVIYZC7TumIMOnkUdouvvqC4nsWAMA7i2P37Sz4wl1QAUGrYaZCbWJDAZCRGrQFCvgK8iatfVt9WK4sCQTAiOv8LiQKivpDhN29RxYQvdYN2ImKZBCSJ32alDwK1IRILOSQPlI3xoJMV7hgR7ipTZCk1HNaNPFCPAYfiZAjtrrwvWa63NX8V3EDx8hvhKPNuTS2RZA05tzFPWVqQwxgZDZD";
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});