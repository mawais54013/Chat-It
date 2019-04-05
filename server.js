// const express = require("express");
// const path = require("path");
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Pusher = require('pusher');

// const PORT = process.env.PORT || 3001;
// const app = express();

// const pusher = new Pusher({
//   appId: '749058',
//   key: '0309639b3bc0d2427a18',
//   secret: 'e988bf4661d5c0996a3a',
//   cluster: 'us3',
//   encrypted: true
// });

// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/update-editor', (req, res) => {
//   pusher.trigger('editor', 'text-update', {
//     ...req.body,
//   });
//   res.status(200).send('OK');
// });
// // Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// // Define API routes here

// // Send every other request to the React app
// // Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`🌎 ==> Server now on port ${PORT}!`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();

const pusher = new Pusher({
  appId: '749058',
  key: '0309639b3bc0d2427a18',
  secret: 'e988bf4661d5c0996a3a',
  cluster: 'us3',
  useTLS: true,
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/update-editor', (req, res) => {
  pusher.trigger('editor', 'text-update', {
   ...req.body,
  });

  res.status(200).send('OK');
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});