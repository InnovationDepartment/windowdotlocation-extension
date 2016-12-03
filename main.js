var server_location = 'https://windowdotlocationserver.amazonaws.com';

$(document).ready(function() {
	console.log(window.location);
	console.log(window.location.search);

	if (getUserNameFromParams()) {
		storeUser(getUserNameFromParams());
		console.log("Username stored!!");
	}
});

function getUserNameFromParams() {
	var query_string = window.location.search;
	var secret_username = '';

	var query_string_parameters = query_string.split('&');

	$(query_string_parameters).each(function(index, parameter) {
		console.log(parameter);
    if (parameter.split('=')[0].match(/secretusername/)) {
    	secret_username = parameter.split('=')[1];
    }
	});

	alert(secret_username);
	return secret_username;
}

function storeUser(username) {
	var password = generatePassword();
	console.log(username, password);
}

function generatePassword() {
	return 'yeaahahaha';
}
