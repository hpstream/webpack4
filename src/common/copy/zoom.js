// 

// var imgHeight = $("#mainCanvas").height();
// var sceneWidth = $("#mainCanvas").width();
var sceneWidth = $("#box").width();
var imgHeight = $("#box").height();
var sceneHeight = 1024;
var screenRate = sceneHeight / sceneWidth;
var canvasWidth;
var canvasHeight;
var spriteScale, bgScale;

$(window).resize(Resize);
Resize();

function Resize() {
  // canvasWidth = $("#box").width();
  // canvasHeight = $("#box").height();
  canvasWidth = document.documentElement.clientWidth || document.body.clientWidth;
  canvasHeight = document.documentElement.clientHeight || document.body.clientHeight;

  if ((canvasHeight / canvasWidth) > (sceneHeight / sceneWidth)) {
    canvasHeight = screenRate * canvasWidth;
    spriteScale = canvasWidth / sceneWidth;
  } else {
    canvasWidth = canvasHeight / screenRate;
    spriteScale = canvasHeight / sceneHeight;
  }

  $("#box").css({
    left: "50%",
    marginLeft: -sceneWidth / 2,
    width: sceneWidth,
    height: sceneHeight,
    zoom: spriteScale.toPrecision(2)
  });
}