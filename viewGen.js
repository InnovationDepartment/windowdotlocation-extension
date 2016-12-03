function generateView() {
  var appendable = "<div style='width: 400px; position: fixed; z-index: 100000; bottom: 0; margin: 0; right: 20px; background-color: #3b4773; border-top-right-radius: 5px; border-top-left-radius: 5px; font-family: sans-serif; color: #fff; text-align: center; box-shadow: 0px 2px 0px #990000;'><p style='display: inline-block; margin: 0%; padding: 0; color: #fff; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.4); padding: 10px 0px; cursor: pointer;' id='expandLinks'>View Window.href</p><div style='display:none' id='hiddenLinks'>";
  $(window.visits).each(function(index, visit){
  	appendable += "<div style='width: 100%;'>" + visit.username + ": " + visit.url + "</div>"
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
		$('#hiddenLinks').css({"display": "block"});
	})
}

function updateView(visit) {
	$('#hiddenLinks').append("<div style='width: 100%;'>" + visit.username + ": " + visit.url + "</div>");
}
