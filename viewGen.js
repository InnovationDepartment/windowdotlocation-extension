function generateView() {
  var appendable = "<div style='width: 400px; position: fixed; z-index: 100000; bottom: 0; margin: 0; right: 20px; background-color: #3b4773; border-top-right-radius: 5px; border-top-left-radius: 5px; font-family: sans-serif; color: #fff; text-align: center; box-shadow: 0px 2px 0px #990000;'><p style='display: inline-block; margin: 0%; padding: 0; color: #fff; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.4); padding: 10px 0px; cursor: pointer;' id='expandLinks'>View Window.location <span id='caret'>&darr;</span></p><div style='display:none; background: #fff; border: 1px solid rgba(0,0,0,0.4); max-height: 400px; overflow-y: scroll; overflow-x: hidden; font-size: 14px;' id='hiddenLinks'>";
  $(window.visits).each(function(index, visit){
  	appendable += "<div style='width: 100%; color: rgba(0,0,0,0.8); padding: 10px 0px; border-bottom: 1px solid rgba(0,0,0,0.4); text-align: left; padding-left: 20px;'>" + visit.username + ": " + "<a href='" + visit.url + "' target='_blank'>" + visit.url.substring(0,40) + "...</a></div>"
  });
  appendable += "</div></div>"

  return appendable;
}

function appendView() {
	var view = generateView();
  $("html").append(view);
}

function initializeView() {
	appendView();

	$('#expandLinks').on('click', function(){
		if ($('#hiddenLinks').css("display") == 'none') {
			$('#hiddenLinks').css({"display": "block"});
			$('#caret').html('&uarr;');
		} else {
			$('#hiddenLinks').css({"display": "none"});
			$('#caret').html('&darr;');
		}
	})
}

function updateView(visit) {
	if ( $("#hiddenLinks #" + visit.username).length > 0 ){
		$("#hiddenLinks #" + visit.username).html(visit.username + ": " + "<a href='" + visit.url + "' target='_blank'>" + visit.url.substring(0,40) + "...</a>");
	} else {
		$('#hiddenLinks').append("<div style='width: 100%; color: rgba(0,0,0,0.8); padding: 10px 0px; border-bottom: 1px solid rgba(0,0,0,0.4); text-align: left; padding-left: 20px;' id='" + visit.username + "'>" + visit.username + ": " + "<a href='" + visit.url + "' target='_blank'>" + visit.url.substring(0,40) + "...</a></div>");
	}
}
