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

  // var deadArea = 10000;

  // client.front(speed);
  // client.back(speed);

  if (position.x <= 64) {
    console.log("front:", (position.x) / angle * speed);
    client.front((64 - position.x) / angle * speed);
  } else if (position.x > 64) {
    console.log("back:", (position.x) / angle * speed);
    client.back((64 - position.x) / angle * speed);
  };

  if (position.y <= 64) {
    console.log("front:", (position.y) / angle * speed);
    client.front((64 - position.y) / angle * speed);
  } else if (position.y > 64) {
    console.log("back:", (position.y) / angle * speed);
    client.back((64 - position.y) / angle * speed);
  };

});


// xbox.on('right:move', function(position){
  // if (position.y <= 64) {
  //     console.log("up:", (64 - position.y) / angle * speed);
  //     client.up((64 - position.y) / angle * speed);
  // } else if (type == "right" && position.y > 64) {
  //     console.log("down:", (position.y - 64) / angle * speed);
  //     client.down((position.y - 64) / angle * speed);
  // }

//   if (position.x <= 64) {
//       console.log("counterclockwise:", (64 - position.x) / angle * speed);
//       client.counterClockwise((64 - position.x) / angle * speed);
//   } else if (position.x > 64) {
//       console.log("clockwise:", (position.x - 64) / angle * speed);
//       client.clockwise((position.x - 64) / angle * speed);
//   }
// });
// if (type == "left" && value.x <= 64) {
//     console.log("left:", (64 - value.x) / angle * speed);
//     client.left((64 - value.x) / angle * speed);
// } else if (type == "left" && value.x > 64) {
//     console.log("right:", (value.x - 64) / angle * speed);
//     client.right((value.x - 64) / angle * speed);
// }