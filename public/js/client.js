//TODO LIST
//  - MESSAGES KEEP GOING OFF SCREEN
//  - MESSAGES DONT MAKE SOUND ON MOBILE
//  - MESSAGES DON'T DISAPPEAR ON OTHER OPEN TABS
//  - FIX BUTTON
//  - MESSAGES DO NOT DISAPPEAR WHEN PAGE IS NOT ACTIVE (WHEN YOU'RE ON A DIFFERENT TAB,
//    PARTICULARLY DOES THIS ON CHROME)
//  - CHANGE FONT SIZE BASED ON MESSAGE LENGTH
//  - FIX BUTTON (SIZE)
//  - ADD COLOR TO TEXT
//  - SOME ERROR CHECKING SHOULD BE DONE ON SERVER SIDE!!
//  - TRIM WHITE SPACE

//NOTES
//  - YOU COULD USE JQUERY TO DO THINGS YOU CAN'T DO IN CSS!
//  E.G. CHANGE COLOR OF ONE CLASS WHEN MOUSE HOVERS OVER OTHER CLASS



//user connects on arrow click
$('#arrow').click(function (){

  var socket = io.connect();

  setPlaceholder();

  $('form').submit(function(){

    var message = {
      text: $('#message-bar').val().trim(),
      team: getTeam()
    };

    //only submit message if message isn't empty
    if (message != null && message.text != "") {
      socket.emit('msg', message);
      $('#message-bar').val('');
      return false;
    }
    return false;
  });


  socket.on('msg', function(msg){

    //get the dimensions of the screen to generate
    //random coordinates for message to be placed
    var width = $('#chat-page').width();
    var height = $('#chat-page').height();
    var text = msg.text;
    var team = msg.team;

    var coords = getRandomCoordinates(width, height, text);
    var x = coords[0];
    var y = coords[1];

    //font size should decrease for longer messages
    var fontSz = 460/text.length + 5;
    var pulse = Math.random()*225;

    var msgSz = Math.floor(pulse + fontSz) + '%';
    var imgSz = 45;
    var animation = "animated pulse";
    var soundFile = "/sounds/msg.mp3";
    var imgFile = getTeamIcon(team);

    addMessageToScreen(x, y, msgSz, imgSz, text, animation, soundFile, imgFile);

    // Create the fadeout effect at the end of pulse animation
    // and remove the message once its done fading out
    $("li").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
      $(this).addClass("animated fadeOut")
      $(this).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
        $(this).remove();
      });
    });

  });

  // socket.on('topic change', function(topic){

  //   $('#topic').text(topic.title);
  // })

});


//helper functions
function getTeamIcon(team) {
  if (team == "Choose your team")
    return '/img/logos/nba-logo.jpg';
  return '/img/logos/' + team + '.png';
}


function getTeam() {
  var teams = document.getElementById("teams");
  var team = teams.options[teams.selectedIndex].text;
  return team;
}


function setPlaceholder() {
  var topic = document.getElementById('topic').innerHTML;
  $('#message-bar').attr('placeholder', ' Comment on ' + topic + " (Limit 100 characters)");
}


//get random coordinates for message based on width and
//height of screen and message length
function getRandomCoordinates(width, height, msg) {

  //used to prevent messages from going off right side of screen
  var mult = 14;
  //change this if messages keep going off right of screen
  var padX = msg.length*mult;
  //increase this if messages keep going off top/bottom of screen
  var padY = 100;

  var x1 = 0;
  var x2 = width - padX;  // (e.g messages of length 100 will be placed between 0 and width-(14*100))

  var y1 = padY;
  var y2 = height - padY;

  var x = Math.floor(Math.random()*x2);   //number between 0 and x2
  var y = Math.floor(Math.random()*(y2-y1) + y1);   //number between y1 and y2

  return [x, y];
}


function constructSound(filepath) {

  return "<audio autoplay>" + "<source src='" +
          filepath + "' type='audio/mpeg'" + "</audio></li>";
}


function constructMessage(x, y, sz, msg, animation) {

  return "<li class='" + animation + "'" +
         "style = 'position : absolute; top: " + y + "px;" +
         "left: " + x + "px; font-size : " + sz + "; '>&nbsp" + msg;
}


function constructImage(filepath, sz) {
  return "<img src='" + filepath + "' width='" + sz + "px' height='auto' " +
         "alt=icon style='float:left'>";
}


function constructElement(msg, img, sound) {
  return msg + img + sound;
}


function addMessageToScreen(x, y, msgSz, imgSz, msg, animation, soundFile, imgFile) {

  var message = constructMessage(x, y, msgSz, msg, animation);
  var image = constructImage(imgFile, imgSz);
  var sound = constructSound(soundFile);
  var element = constructElement(message, image, sound);

  $('#messages').append(element);
}