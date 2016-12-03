var server_location = 'https://windowdotlocationserver.amazonaws.com';
var visits = Array();

$(document).ready(function() {
  // Is the user setting their username?
	if (getUserNameFromParams()) {
		storeUser(getUserNameFromParams());
	}

  window.socket = io('http://104.131.251.160:3000');

  // Send a visit when connected to socket
  socket.on('connect', function() {
   logVisit();
  });

  visitsObserved();
});
