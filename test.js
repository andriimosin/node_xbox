var arDrone = require('ar-drone');
var XboxController = require('./lib/xbox')

var client  = arDrone.createClient();
var xbox = new XboxController

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


xbox.on('lefttrigger', function(position){
  console.log('lefttrigger', position)
})

xbox.on('righttrigger', function(position){
  console.log('righttrigger', position)
})

xbox.on('left:move', function(position){
  console.log('left:move', position)
})

xbox.on('right:move', function(position){
  console.log('right:move', position)
})

