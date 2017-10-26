// 共通の画面読み込み時処理
$(function(){
	// formは一応onsubmitをfalseに
//	$("form").submit(function() {return false});
    $("form[name!='login_topActionForm']").submit(function() {return true});

	$("#wrapper").attr("style", "display:block;");

	// location.hash指定の場合はジャンプ
	if (document.location.hash != null && document.location.hash != "") {
		document.location = document.location.hash;
	}
});
