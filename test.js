var XboxController = require('./lib/xbox');
var xbox = new XboxController();

var arDrone  = require("ar-drone"),
    client   = arDrone.createClient(),
    angle    = 64,
    speed    = 0.4;

client.config('control:altitude_max', 100000);
client.config('control:control_vz_max', 1000);
client.config('control:control_yaw', 4.0);
client.config('control:euler_angle_max', 0.3);

xbox.on('a:press', function (key) {
  console.log(key + ' press');
  client.takeoff();
});

xbox.on('b:press', function (key) {
  console.log(key + ' press');
  client.land(function(){
    console.log('landed');
    client.stop();
  });
});

xbox.on('left:move', function(position){

  var dead = 2;

  if (position.x <= dead) {
    var val = (dead - position.x) / angle * speed;
    console.log("left:", val, position);
    client.left(val);
  } else if (position.x > dead) {
    var val = (position.x - dead) / angle * speed;
    console.log("right:", val, position);
    client.right(val);
  };


  if (position.y <= dead) {
    var val = (dead - position.y) / angle * speed;
    console.log("front:", val, position);
    client.front(val);
  } else if (position.y > dead) {
    var val = (position.y - dead) / angle * speed;
    console.log("back:", val, position);
    client.back(val);
  };
});

xbox.on('right:move', function(position) {

  var dead = 2;

  if (position.y <= dead) {
    var val = (dead - position.y) / angle * speed;
    console.log("up:", val, position);
    client.up(val);
  } else if (position.y > dead) {
    var val = (position.y - dead) / angle * speed;
    console.log("down:", val, position);
    client.down(val);
  }

  if (position.x <= dead) {
    var val = (dead - position.x) / angle * speed;
    console.log("counterclockwise:", val, position);
    client.counterClockwise(val);
  } else if (position.x > 64) {
    var val = (position.x - dead) / angle * speed;
    console.log("clockwise:", dead, position);
    client.clockwise(val);
  }
});

/* TODO: understand this options for ar-drone

var arDrone = require('ar-drone');
var client = arDrone.createUdpControl();
var start   = Date.now();

var ref  = {};
var pcmd = {};

console.log('Recovering from emergency mode if there was one ...');
ref.emergency = true;

setTimeout(function() {
  console.log('Takeoff ...');

  ref.emergency = false;
  ref.fly       = true;

}, 1000);

setTimeout(function() {
  console.log('Turning clockwise ...');

  pcmd.clockwise = 0.5;
}, 6000);

setTimeout(function() {
  console.log('Landing ...');

  ref.fly = false;
  pcmd = {};
}, 8000);


setInterval(function() {
  client.ref(ref);
  client.pcmd(pcmd);
  client.flush();
}, 30);

*/