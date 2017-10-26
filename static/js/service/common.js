/* ===================================================================
javascript information

File Name  : common.js
Author     : k-mimura
Style Info :
=================================================================== */

//====================================================================
//
// 共通JavaScript定義
//
//====================================================================

$(document).on("click touchend", "#back_button", function() {
	var backLink = $("a#back_link");
	if (!backLink.length) {
		history.back();
	} else {
		backLink.get(0).click();
	}
	return false;
});

$(document).on("click touchend", ".change_submit", function() {
	var form = $(this).closest("form");
	form.attr("action", $(this).data("submiturl"));
	form.submit();
});

$(document).on("click touchend", ".select_link", function() {

	var selectId = $(this).data("selectid");

	// 2017/2/20 S.Jiang #21862 ADD START
	if(selectId == 'history_list' && $("#" + selectId).val() == null){
		location.href = $(this).data("linkurl");
		return false;
	}
	// 2017/2/20 S.Jiang #21862 ADD END

	location.href = $(this).data("linkurl") + $("#" + selectId).val();
	return false;
});

$(document).on("click touchend", ".select_direct_link", function() {
	var selectId = $(this).data("selectid");

	// 2017/2/20 S.Jiang #21862 ADD START
	if(selectId == 'history_list'){
		var value =  $("#" + selectId).val();
		if(value == null || value == ''){
			return false;
		}
	}
	// 2017/2/20 S.Jiang #21862 ADD END

	location.href = $("#" + selectId).val();
	return false;
});

$(document).on("change", ".change_link", function() {
	// サイズ変更時
	var qty = $('[name=qty] option:selected').text();
	location.href = $(this).data("linkurl") + "&qty2=" + qty;
	return false;
});

$(document).on("change", ".option_select_link", function() {
	// 生地変更時
	var option = $(this).find("option:selected");
	var qty = $('[name=qty] option:selected').text();
	location.href = option.data("linkurl") + "&qty2=" + qty;
	return false;
});

$(document).on('click','a[href^=#]',function(){
	return false;
});