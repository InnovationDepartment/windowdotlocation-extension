var server_location = 'https://windowdotlocationserver.amazonaws.com';

$(document).ready(function() {
  debugger;
	if (getUserNameFromParams()) {
		storeUser(getUserNameFromParams());
	}
});

// Checks if user is already stored locally
function userStored() {
	chrome.storage.sync.get('secretusername', function(result){
		console.log(result);
		return result != 'none';
	});
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
	debugger;
	var identifier = generateIdentifier(username);
	
	chrome.storage.sync.set({'secretusername': username, 'identifier': identifier});
	console.log('username stored');
}

function generateIdentifier(username) {
  var buf = new Uint32Array(4);
  var seed;

  window.crypto.getRandomValues(buf);
  
  $.getJSON('//jsonip.com/', function(data) {
    seed = data.ip.replace(/\./g, '');
  });

  var numericname = "";
  var length = username.length;
  for(var i = 0; i < length; i++) {
  	ascii = username.charCodeAt(i);
  	numericname = numericname + ascii.toString();
  }
  console.log(numericname);

	return parseInt(numericname) << seed;
}

