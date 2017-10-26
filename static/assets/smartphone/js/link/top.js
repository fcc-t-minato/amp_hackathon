/* TOPページ固有のjavascript */
$(function(){
	// 登録住所から探す
	$("#button_search_address").click(function() {
		return add_action_link_target('address', 'addressForm');
	});

	// 郵便番号から探す
	$("#button_search_zip").click(function() {
		return add_action_link_target('', 'zipForm');
	});
	// 郵便番号から探す
	$("#zipForm").submit(function() {
		$("#button_search_zip").click();
		return false;
	});

	// キーワードから探す
	$("#button_search_keyword").click(function() {
		return keywordSearchAction('', 'keywordForm');
	});
	// キーワードから探す
	$("#keywordForm").submit(function() {
		$("#button_search_keyword").click();
		return false;
	});
	

	// 携帯へ送信
	$("#button_submit_mobile").click(function() {
		return open_window($('#mobileForm').attr('action') + '?' + $('#mobileForm').serialize(), {'width':'400', 'height':'300'});
	});
	
	// 別ウィンドウで開く
	$("#service_kaketsuke_area a, #service_yoyaku_area a").click(function() {
		return open_normal_window(this);
	});

	// 地図のflash埋め込み
	swfobject.embedSWF(
		$('#swf_dir_path').attr("href") + "demae.swf",
		"headerFlash",
		"325",
		"150",
		"6",
		$('#swf_dir_path').attr("href") + "expressInstall.swf",
		{},
		{wmode: "transparent"},
		{ id : 'movie', name : 'movie' }
	);
	var version = swfobject.getFlashPlayerVersion();
	if (version.major > 0
		|| version.minor > 0
		|| version.release > 0) {
		$('#flashMap').hide();
		$("#toggle_map_link").click(function() {
			$('#flashMap').toggle();
		});
	} else {
		$("#toggle_map_link").colorbox({width:"350px", inline:true, href:"#inline_element"});
	}

	// 出前館flash埋め込み
	swfobject.embedSWF(
		$('#swf_dir_path').attr("href") + "demae_topfla.swf",
		"topFlash",
		"945",
		"155",
		"6",
		$('#swf_dir_path').attr("href") + "expressInstall.swf",
		{author:$('#ma_fs_script_var_author').attr("value"), campaignId:$('#ma_fs_script_var_campaign').attr("value"), countUrlGroupId:$('#ma_fs_script_var_count_url').attr("value"), countUrlSeqNo:$('#ma_fs_script_var_count_seq').attr("value")},
		{base : '.'},
		{}
	);

	// 設定住所IDを変更する
	$("#button_update_address").click(function() {
		return chk_submit();
	});

});
