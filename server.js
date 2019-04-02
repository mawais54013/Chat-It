// const express = require('express');
// const bodyparser = require('body-parser');
// const cors = require('cors');
// const Pusher = require('pusher');

// const app = express();

// const pusher = new Pusher({
//     appId: '749058',
//     key: '0309639b3bc0d2427a18',
//     secret: 'e988bf4661d5c0996a3a',
//     cluster: 'us3',
//     useTLS: true
// });

// app.use(cors());
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());

// app.post('/update-editor', (req, res) => {
//     pusher.trigger('editor', 'text-update', {
//         ...req.body,
//     });

//     res.status(200).send('OK');
// });

// app.set('port', process.env.PORT || 3000);
// const server = app.listen(app.get('port'), () => {
//     console.log(`Express running on PORT ${server.address().port}`)
// });
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('server listening on port 3000')