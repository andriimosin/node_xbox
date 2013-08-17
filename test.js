var XboxController = require('./lib/xbox');
var xbox = new XboxController();

var arDrone  = require("ar-drone"),
    client   = arDrone.createClient(),
    angle    = 64,
    speed    = 0.4;

client.config('control:altitude_max', 100000)
client.config('control:control_vz_max', 1000)
client.config('control:control_yaw', 4.0)
client.config('control:euler_angle_max', 0.3)

xbox.on('a:press', function (key) {
  console.log(key + ' press');
  client.takeoff();
});

xbox.on('b:press', function (key) {
  console.log(key + ' press');
  client.land();
});

xbox.on('b:release', function (key) {
    console.log('b release');
});


// xbox.on('lefttrigger', function(position){
//   console.log('lefttrigger', position)
// })

// xbox.on('righttrigger', function(position){
//   console.log('righttrigger', position)
// })

xbox.on('left:move', function(position){
  console.log('left:move', position)
});

xbox.on('left:move', function(position){

  // fly forward-back
  // max 32767
  // min 32767

  var deadArea = 10000;
  
  // client.front(speed);
  // client.back(speed);

  if (position.y <= -deadArea) {
    console.log("front:", (position.y) / angle * speed);
    client.front(Math.abs(position.y) / angle * speed);
  } else if (position.y > deadArea) {
    console.log("back:", (position.y) / angle * speed);
    client.back(Math.abs(position.y) / angle * speed);
  }

  // if (position.x < 0) {
  //   console.log("left:", (position.x) / angle * speed);
  //   client.left(Math.abs(position.x) / angle * speed);
  // }
  // if (position.x >= 0) {
  //   console.log("right:", (position.x) / angle * speed);
  //   client.right(Math.abs(position.x) / angle * speed);
  // }
});

// if (type == "left" && value.x <= 128) {
//     console.log("left:", (128 - value.x) / angle * speed);
//     client.left((128 - value.x) / angle * speed);
// } else if (type == "left" && value.x > 128) {
//     console.log("right:", (value.x - 128) / angle * speed);
//     client.right((value.x - 128) / angle * speed);
// }