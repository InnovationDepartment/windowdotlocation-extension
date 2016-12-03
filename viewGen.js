function generateView() {
  return "<div style='width: 400px; position: fixed; z-index: 100000; bottom: 0; margin: 0; right: 20px; background-color: #3b4773; border-top-right-radius: 5px; border-top-left-radius: 5px; font-family: sans-serif; color: #fff; text-align: center; padding-top: .5%; padding-bottom: .5%; box-shadow: 0px 2px 0px #990000;'><p style='display: inline-block; margin: 0%; padding: 0; color: #fff;' id='expandLinks'>View Window.href</p><div style='display:none' id='hiddenLinks'>hiiii</div></div>";
}

function appendView() {
	var view = generateView();
  $("html").append(view);
}

$(document).ready(function(){
	appendView();

	$('#expandLinks').on('click', function(){
		$('#hiddenLinks').css({"display": "inline-block"});
	})
})