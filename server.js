require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
// const io = require('socket.io')();

// io.sockets.on('connection', function(socket) {
//   socket.on('room', function(room) {
//       socket.join(room);
//   });
// });

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/update-editor/:id', (req, res) => {
  // console.log(res.req.body.key1);
  // pusher.trigger(`${res.req.body.key1}`, 'text-update', {
  //  ...req.body,
  // });
  // res.status(200).send('OK');
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});


app.set('port', process.env.PORT || 5000);
// io.listen(5001)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
