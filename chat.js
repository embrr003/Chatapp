//Final 1543 07172013
//Over view of functionality
  //Send and receive messages from server displaying in chat window
//My Script Layout
  //Initial start
    //Collect name of current user
  //Welcome user to app
  //Document Load
    //clear existing fields in chat app (name, location, time)
  //Setup Interface to communicate chat with server  
	//retrieve new messages from server
	//output to user interface
	//initial call to update output
	//update time
  //Once loaded
    //Poll server for new messages
    //send message input from user to server

//Initial Start
  //console.log(Chat.username);
  alert("Welcome  " + Chat.username);

//Document Load
  //Clear existing chat fields
  $(function() {
    $('.onscreenmessages').empty();
	$('.name').empty();
	$('.location').empty();
	$('.time').empty();
	});

//Create interface between server and user
  //retrieve messages from server
  //retrieve is used throughout app to pull from server
  function retrieve(callback) {
    $.ajax({
	url: "https://api.parse.com/1/classes/chats", //Server API class url chats
	type: "GET",
	data: {order: 'createdAt' },
	success: function(data) {
	callback(data.results);
	}});}
	
  function msgOutput(message) {
$('.onscreenmessages').append('<li>' +  message  +  '</li>');
}
	
//new function to split user name from chat text. TODO	
//this function pushes all messages to screen
//function msgOutput(message) { //called by showMessages feeding message value in
//  var split =message.split(':');
//	var chatUser = split[0];
//  var chatText = split[1]; 
//	$('.onscreenname').append('<li>' + chatUser + '<li>');
//	$('.onscreenmessages').append('<li>' + chatText + '<li>');
//  }	
	
  //Send messages to user	
  function showMessages(messages) {
    $('.onscreenmessages').empty(); //This keeps onscreen messages limited
	
    for (var i = 0; i < messages.length; i++) {

         msgOutput(messages[i].text);

	  //calls msgOutput feeding messages[i].text as input
	  //console.log(msgOutput);
	  //console.log(messages[i].text)
	  
	}
  }	
  
  //function linking retrieve to displayMessages
  $(function() {
    retrieve(showMessages);
	//console.log(showMessages);
  });
  
//Collect output from user and send to server
  //Enable send
  $(function() {
    $('body').on('click', '.button', function() {
    send($('.unique').val())
	$('.unique').val('')
  });
  });

  
  
  
  
  
  //send user message to server
  function send(message) {
    $.ajax({
    url: "https://api.parse.com/1/classes/chats",
    type: "POST",
    data: JSON.stringify({'text': Chat.username + ': ' + message}),  // Prepend the username to the message
    dataType: "json"
    });
  }
  
  setInterval(function() {
    retrieve(showMessages);
	}, 3000);
