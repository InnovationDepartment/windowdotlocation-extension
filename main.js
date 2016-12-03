var server_location = 'https://windowdotlocationserver.amazonaws.com';

$(document).ready(function() {
	if (getUserNameFromParams()) {
		storeUser(getUserNameFromParams());
	}
});

// Checks if user is already stored locally
function userStored() {
  var stored = false;
	chrome.storage.sync.get('secretusername', function(result) {
		stored = result.secretusername != 'none';
	});
  return stored;
}

// Finds the username in the URL parameters and returns it
function getUserNameFromParams() {
	var query_string = window.location.search;
	var secret_username = 'none';

	var query_string_parameters = query_string.split('&');

	$(query_string_parameters).each(function(index, parameter) {
    if (parameter.split('=')[0].match(/secretusername/)) {
    	secret_username = parameter.split('=')[1];
    }
	});

	return secret_username;
}

function storeUser(username) {
	if (userStored()) {
		return;
	}
  if (username == 'none') {
    return;
  }
	var identifier = generateIdentifier(username);
	payload = {'secretusername': username, 'identifier': identifier};
  
	chrome.storage.sync.set(payload);
}

function generateIdentifier(username) {
  var seed;
  
  $.getJSON('//jsonip.com/', function(data) {
    seed = data.ip.replace(/\./g, '');
  });

  var numericname = "";
  var length = username.length;
  for(var i = 0; i < length; i++) {
  	ascii = username.charCodeAt(i);
  	numericname = numericname + ascii.toString();
  }

	return parseInt(numericname) << seed;
}
