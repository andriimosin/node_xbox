var XboxController = require('./lib/xbox');
var xbox = new XboxController();

var arDrone  = require("ar-drone"),
    client   = arDrone.createClient(),
    angle    = 64,
    speed    = 0.4;

var http = require("http"),
    drone = require("./node_modules/dronestream/index");

var server = http.createServer(function(req, res) {
  require("fs").createReadStream("index.html").pipe(res);
});

client.calibrate(1)

drone.listen(server);
server.listen(5555);


client.config('control:altitude_max', 100000);
client.config('control:control_vz_max', 1000);
client.config('control:control_yaw', 4.0);
client.config('control:euler_angle_max', 0.3);

client.config('control:outdoor', true);
client.config('control:flight_without_shell', true);

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

  var dead = 1;
  var step = 20000;

  if (position.x <= step) {
    var val = (dead - position.x) / angle * speed;
    console.log("left:", val, position);
    client.left(val);
  } else if (position.x > step) {
    var val = (position.x - dead) / angle * speed;
    console.log("right:", val, position);
    client.right(val);
  }

  if (position.y <= step) {
    var val = (dead - position.y) / angle * speed;
    console.log("front:", val, position);
    client.front(val);
  } else if (position.y > step) {
    var val = (position.y - dead) / angle * speed;
    console.log("back:", val, position);
    client.back(val);
  }
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

  if (position.x <= 30000) {
    var val = (dead - position.x) / angle * speed;
    console.log("counterclockwise:", val, position);
    client.counterClockwise(val);
  } else if (position.x > 30000) {
    var val = (position.x - dead) / angle * speed;
    console.log("clockwise:", dead, position);
    client.clockwise(val);
  }
});

xbox.on('lefttrigger', function(position){
  console.log('lefttrigger', position)
  client.animate('flipLeft', 500);
})

xbox.on('righttrigger', function(position){
  console.log('righttrigger', position)
  client.animate('wave', 2500);
})

