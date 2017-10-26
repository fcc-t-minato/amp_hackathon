/* ===================================================================
javascript information

File Name  : page_backButton.js
Author     :
Style Info :
=================================================================== */

//****************************************************************
//「フォーム再送信の確認」画面が表示されることを防止するために
//****************************************************************
jQuery(document).ready(function ($) {

	if (window.history && window.history.pushState) {

	    var backUrl = document.getElementById("backUrl").value;

	    if(null != backUrl && backUrl != ""){

	    	window.history.replaceState(null,null,backUrl);
	    }
	}
});