var server_location = 'https://windowdotlocationserver.amazonaws.com';

$(document).ready(function() {
	if (getUserNameFromParams()) {
		storeUser(getUserNameFromParams());
	}

  chrome.storage.sync.get('secretusername', function(result) {
    console.log(result);
  });
});

// Checks if user is already stored locally
function userStored() {
  return new Promise(function(resolved, reject) {
    var stored = false;
  	chrome.storage.sync.get('secretusername', function(result) {
  		stored = result.secretusername != 'none';
      return resolved(stored);
  	});
  })
}

// Finds the username in the URL parameters and returns it
function getUserNameFromParams() {
	var query_string = window.location.search;
	var secret_username = '';

	var query_string_parameters = query_string.split('&');

	$(query_string_parameters).each(function(index, parameter) {
    if (parameter.split('=')[0].match(/secretusername/)) {
    	secret_username = parameter.split('=')[1];
    }
	});

	return secret_username;
}

function storeUser(username) {
  userStored().then(function(stored) {
    if (stored) {
      return false;
    }
  	var identifier = generateIdentifier(username);
  	payload = {'secretusername': username, 'identifier': identifier};
  
  	chrome.storage.sync.set(payload);
  });
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
