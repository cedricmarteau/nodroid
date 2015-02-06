// GLOBAL VAR
var $win = $(window),
  winHeight = $win.innerHeight(),
  winWidth = $win.innerWidth(),
  $abcdrList = $("#abcdr-ui ul"),
  abcdrOffset = {
    Top: $abcdrList.offset().top,
    Left: $abcdrList.offset().left,
    Right: $abcdrList.offset().left+parseInt($abcdrList.outerWidth()),
    Bottom: $abcdrList.offset().top+parseInt($abcdrList.outerHeight())
  };










// LEAP CONTROLLER
var controller = new Leap.Controller({enableGestures: true}),
callMuteRequestMade = false;
controller.loop(function(frame) {
  
    var gesture  = frame.gestures[0],
        type = gesture ? gesture.type : "";

      if (gesture){
          // $.ajax({
          //   url: '/gestures',
          //   type: 'POST',
          //   data: {
          //     action: gesture.type
          //   }
          // });
      }

      if (logLeap){
          console.log(gesture)
          // console.log(indexFinger)
      }
});

// LOG LEAP
var logLeap = false;
window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
   if (key == 84) {
      if (logLeap){
        logLeap = false;
      }else{
        logLeap = true;
      }
      console.log("logLeap",logLeap)
   }
}

// LEAP EVENTS
controller.on('ready', function() {
  console.log("ready");
});
controller.on('connect', function() {
  console.log("connect");
});
controller.on('disconnect', function() {
  console.log("disconnect");
});
controller.on('focus', function() {
  console.log("focus");
});
controller.on('blur', function() {
  console.log("blur");
});
controller.on('deviceConnected', function() {
  console.log("deviceConnected");
});
controller.on('deviceDisconnected', function() {
  console.log("deviceDisconnected");
});









// INIT OBJ LETTER
var letters = [];
var letterWidth = $abcdrList.find("li").outerWidth();
$abcdrList.find("li").each(function(){
  var $this = $(this);
  TweenMax.set($this,{
    rotation:(360/26)*$this.index()+"deg"
  });
  var letter = {
    position:$this.index()*letterWidth,
    scale:1,
    destScale:1,
    letter:$this.html(),
    $obj:$this
  }
  letters.push(letter);
});

// LETTER HOVER
var hoverObj;
var lastHoverObj = hoverObj;
var firstHover = true;
var pointerPosition = {
  x:0,
  y:0
}
$(window).mousemove(function(e){
  pointerPosition.x = e.clientX;
  pointerPosition.y = e.clientY;
  if (pointerPosition.y > abcdrOffset.Top && pointerPosition.y < abcdrOffset.Bottom && pointerPosition.x > abcdrOffset.Left && pointerPosition.x < abcdrOffset.Right ){
    hoverTracking(pointerPosition);
  }
});
$abcdrList.mouseout(function(e) {
    $.each(letters,function(){
      this.destScale = 1;
    });
});

function hoverTracking(obj){
  hoverObj = Math.round(((obj.x + 30)-abcdrOffset.Left)/60 - 1);
  if (lastHoverObj!=hoverObj){
    samePositionTimer();
  }

  if (!firstHover && lastHoverObj!=hoverObj){
    letters[lastHoverObj].destScale = 1;
    if (lastHoverObj == 0){
      letters[1].destScale = 1;
    }else if (lastHoverObj == letters.length - 1){
      letters[letters.length - 2].destScale = 1;
    }else{
      letters[lastHoverObj-1].destScale = 1;
      letters[lastHoverObj+1].destScale = 1;
    }
  }

  if (hoverObj == 0){
    letters[1].destScale = 1.2;
  }else if (hoverObj == letters.length - 1){
    letters[letters.length - 2].destScale = 1.2;
  }else{
    letters[hoverObj-1].destScale = 1.2;
    letters[hoverObj+1].destScale = 1.2;
  }

  letters[hoverObj].destScale = 2;
  firstHover = false;
  lastHoverObj = hoverObj;
}

// ANIMATE LETTER HOVER
TweenMax.ticker.addEventListener("tick",tick);
function tick(){
  if (hoverObj != 100){
    $.each(letters,function(){
        this.scale += ( this.destScale - this.scale)*0.15;
        TweenMax.set(this.$obj,{
          scale : this.scale
        });
    });
  }
};

// LISTENER SAME POSITION
var samePositionTimeout;
function samePositionTimer(){
  clearTimeout(samePositionTimeout);
  samePositionTimeout = setTimeout(function(){
    playLetter(letters[hoverObj].letter)
  },300);
};







// AUDIO
function playLetter(letter){
  var id = letter+"_audio";
  document.getElementById(id).play();
};






//  DISPLAY SCREEN
$abcdrList.addClass("display");
