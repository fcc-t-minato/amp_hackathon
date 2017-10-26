$(document).ready(function() {

	var pathStr = '';
	if (location.href.indexOf("?") >= 0) {
		pathStr = '&pageNo=';
	} else {
		pathStr = '?pageNo=';
	}
	path = new Array();
	path.push(location.href + pathStr);
	path.push("");
	$('.auto_loading_contents').infinitescroll({
		navSelector : ".auto_loading_contents .navigation",
		nextSelector : ".auto_loading_contents .navigation a",
		itemSelector : ".auto_loading_contents .auto_loading_item",
		dataType : "html",
		maxPage: lastPage,
		animate : false,
		loading : {
			img : "/assets/smartphone/img/loading_animation_01.gif",
			msgText : "",
			finishedMsg : "",
		},
		path : path

	});
});
