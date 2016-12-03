var server_location = '//www.windowdotlocation.club';
var visits = Array();

$(document).ready(function() {
  // Is the user setting their username?
	if (getUserNameFromParams()) {
		storeUser(getUserNameFromParams());
	}

  window.socket = io(server_location);

  // Send a visit when connected to socket
  socket.on('connect', function() {
   logVisit();
  });

  visitsObserved();

  initializeView();
});
