var g_lock = false;

//指定したFormをサブミットする
function button_submit_target(form, name, value) {
	if(!g_lock) {
		var id = document.getElementById(form);
		var len = arguments.length;
		var param = new Array();
		for (var i = 1; i < len; i++) {
			param[i] = arguments[i];
		}
		g_lock = true;

		for (var ii = 1; ii < len; ii += 2) {
			eval("id." + arguments[ii]).value = arguments[ii + 1];
		}
		id.submit();
		if (!$.browser.msie) {
			g_lock = false;
		}
	}
	return false;
}

//指定したFormに値をセットする
function value_set_target(form, name, value) {
	var id = document.getElementById(form);
	var len = arguments.length;
	var param = new Array();
	for (var i = 1; i < len; i++) {
		param[i] = arguments[i];
	}
	for (var ii = 1; ii < len; ii += 2) {
		eval("id." + arguments[ii]).value = arguments[ii + 1];
	}
	return false;
}
/**
 * リンクのHREFを解析し、画面遷移用フォームのActionにURLをセット、
 * URLパラメータはhiddenにしてサブミットする.
 * この関数を使用する場合は、hrefにURLをセットし、onclick属性に関数をreturn付きで指定してください.
 * 例 <a href='/aaaa?xxx=aaa&bbbb=dddd' onclick='return linkHrefParse(this)'>XXXX</a>
 * d:linkを使用した場合は、記述しなくとも勝手に付加されます.
 * @param link aタグ
 * @return
 */
function linkHrefParse(link){
	if(!g_lock){
		g_lock = true;
		var f = document.getElementById('location_form');
		// formが無い場合は、何もしない
		if(f == null){
			alert('location_formがありません.');
			g_lock = false;
			return false;
		}
		// formの内部を初期化する
		f.innerHTML = '';
		var lh = link.href;
		if(lh.indexOf('?') > -1 ){
			// パラメータを取得
			var paramater = lh.split('?')[1];
			var params = paramater.split('&');
			for(var i = 0; i < params.length; i++){
				var keyValue = params[i].split('=');
				var ele = document.createElement('input');
				ele.type = 'hidden';
				ele.name = keyValue[0];
				ele.value = keyValue[1];
				f.appendChild(ele);
			}
			lh = lh.split('?')[0];
		}
		f.action = lh;
		f.submit();
		if (!$.browser.msie) {
			g_lock = false;
		}
	}
	return false;
}

/**
 * 確認メッセージを出力した後、formのactionに指定した値を追加してからサブミットする.
 */
function confirm_action(msg, action){
	if(!g_lock) {
		if(confirm(msg)){
			g_lock = true;
			var f =	document.getElementById('mainForm');
			var temp = f.action;
			f.action += action;
			f.submit();
			// IE 以外のブラウザでサブミットし、ブラウザの戻るボタンを押下すると
			// 変数が変わったままになっているので、元に戻しておく。
			if (!$.browser.msie) {
				g_lock = false;
				f.action = temp;
			}
			return true;
		}
	}
	return false;
}

/**
 * formのactionに指定した値を追加してからサブミットする.
 */
function add_action(action){
	if(!g_lock) {
		g_lock = true;
		var f =	document.getElementById('mainForm');
		var temp = f.action;
		f.action += action;
		f.submit();
		// IE 以外のブラウザでサブミットし、ブラウザの戻るボタンを押下すると
		// 変数が変わったままになっているので、元に戻しておく。

		// 20121214 CRT0038 ２度押し対策 start
		if(navigator.userAgent.toLowerCase().search(/firefox/) != -1
			|| navigator.userAgent.toLowerCase().search(/safari/) != -1
			|| navigator.userAgent.toLowerCase().search(/chrome/) != -1 ) {

			window.addEventListener('pageshow', function(event) {
				// cache利用時は初期化
				if(event.persisted){
					g_lock = false;
				}
			}, false);
		}
		f.action = temp;
		// 20121214 CRT0038 ２度押し対策 end

		return true;
	}
	return false;
}

/**
 * formのactionに指定した値を追加してからサブミットする.
 */
function confirm_add_action(msg, action){
	if(!g_lock) {
		if(confirm(msg)){
			g_lock = true;
			var f =	document.getElementById('mainForm');
			var temp = f.action;
			f.action += action;
			f.submit();
			// IE 以外のブラウザでサブミットし、ブラウザの戻るボタンを押下すると
			// 変数が変わったままになっているので、元に戻しておく。

			// 20121214 CRT0038 ２度押し対策 start
			if(navigator.userAgent.toLowerCase().search(/firefox/) != -1
				|| navigator.userAgent.toLowerCase().search(/safari/) != -1
				|| navigator.userAgent.toLowerCase().search(/chrome/) != -1 ) {

				window.addEventListener('pageshow', function(event) {
					// cache利用時は初期化
					if(event.persisted){
						g_lock = false;
					}
				}, false);
			}
			f.action = temp;
			// 20121214 CRT0038 ２度押し対策 end

			return true;
		}
	}
	return false;
}

/**
 * 指定したformのactionに指定した値を追加してからサブミットする.
 */
function add_action_target(action, target){
	if(!g_lock) {
		g_lock = true;
		var f =	document.getElementById(target);
		var temp = f.action;
		f.action += action;
		f.submit();
		// IE 以外のブラウザでサブミットし、ブラウザの戻るボタンを押下すると
		// 変数が変わったままになっているので、元に戻しておく。
		if (!$.browser.msie) {
			g_lock = false;
			f.action = temp;
		}
		// ここでfalseを返さないとsubmitで遷移したあとにhref属性に記述された場所へ飛ぶ.
		return true;
	}
	return false;
}

/**
 * 指定したformのactionに指定した値を追加してからサブミットする.
 * flash内で呼び出すときに、2度押ししたらlockがかかったままの状態になってしまうので
 * IEでもlockを解除する。
 */
function add_action_target_unlock(action, target){
	if(!g_lock) {
		g_lock = true;
		var f =	document.getElementById(target);
		var temp = f.action;
		f.action += action;
		f.submit();
		g_lock = false;
		f.action = temp;
		return true;
	}
	return false;
}

/**
 * formのactionに指定した値を追加してからサブミットする.(linkバージョン)
 */
function add_action_link(action){
	if(!g_lock) {
		g_lock = true;
		var f =	document.getElementById('mainForm');
		var temp = f.action;
		f.action += action;
		f.submit();
		// IE 以外のブラウザでサブミットし、ブラウザの戻るボタンを押下すると
		// 変数が変わったままになっているので、元に戻しておく。

		// 20121214 CRT0038 ２度押し対策 start
		if(navigator.userAgent.toLowerCase().search(/firefox/) != -1
			|| navigator.userAgent.toLowerCase().search(/safari/) != -1
			|| navigator.userAgent.toLowerCase().search(/chrome/) != -1 ) {

			window.addEventListener('pageshow', function(event) {
				// cache利用時は初期化
				if(event.persisted){
					g_lock = false;
				}
			}, false);
		}
		f.action = temp;
		// 20121214 CRT0038 ２度押し対策 end

		// ここでfalseを返さないとsubmitで遷移したあとにhref属性に記述された場所へ飛ぶ.
		return false;
	}
	return false;
}

/**
 * 指定したformのactionに指定した値を追加してからサブミットする.(linkバージョン)
 */
function add_action_link_target(action, target){
	if(!g_lock) {
		g_lock = true;
		var f =	document.getElementById(target);
		var temp = f.action;
		f.action += action;
		f.submit();
		// IE 以外のブラウザでサブミットし、ブラウザの戻るボタンを押下すると
		// 変数が変わったままになっているので、元に戻しておく。

		// 20121214 CRT0038 ２度押し対策 start
		if(navigator.userAgent.toLowerCase().search(/firefox/) != -1
			|| navigator.userAgent.toLowerCase().search(/safari/) != -1
			|| navigator.userAgent.toLowerCase().search(/chrome/) != -1 ) {

			window.addEventListener('pageshow', function(event) {
				// cache利用時は初期化
				if(event.persisted){
					g_lock = false;
				}
			}, false);
		}
		f.action = temp;
		// 20121214 CRT0038 ２度押し対策 end

		// ここでfalseを返さないとsubmitで遷移したあとにhref属性に記述された場所へ飛ぶ.
		return false;
	}
	return false;
}

/**
 * キーワード検索用アクション
 * テキストボックスが空の場合、入力例を消してから検索に行く
 */
function keywordSearchAction(action, target){
	if(searchOK){
		return add_action_link_target(action, target);
	}
	document.getElementById('ma_keyword').value='';
	return add_action_link_target(action, target);
}


/**
 * 確認後、formのactionに指定した値を追加してからサブミットする.(linkバージョン)
 */
function confirm_add_action_link(msg, action){
	if(!g_lock) {
		if(confirm(msg)){
			// 2015/01/30 T.Minato ADD AmazonPayments START
			// 退会処理の場合はAmazonログアウトを行う
			if (action == 'process') {
				amazonLogout();
			}
			// 2015/01/30 T.Minato ADD AmazonPayments END
			g_lock = true;
			var f =	document.getElementById('mainForm');
			var temp = f.action;
			f.action += action;
			f.submit();
			// IE 以外のブラウザでサブミットし、ブラウザの戻るボタンを押下すると
			// 変数が変わったままになっているので、元に戻しておく。

			// 20121214 CRT0038 ２度押し対策 start
			if(navigator.userAgent.toLowerCase().search(/firefox/) != -1
				|| navigator.userAgent.toLowerCase().search(/safari/) != -1
				|| navigator.userAgent.toLowerCase().search(/chrome/) != -1 ) {

				window.addEventListener('pageshow', function(event) {
					// cache利用時は初期化
					if(event.persisted){
						g_lock = false;
					}
				}, false);
			}
			f.action = temp;
			// 20121214 CRT0038 ２度押し対策 end

			// ここでfalseを返さないとsubmitで遷移したあとにhref属性に記述された場所へ飛ぶ.
			return false;
		}
	}
	return false;
}

/**
 * 二重押しチェックをしてからサブミットする
 */
function chk_submit(){
	if(!g_lock) {
		g_lock = true;
		document.getElementById('mainForm').submit();
		if (!$.browser.msie) {
					g_lock = false;
				}
		return true;
	}
	return false;
}

/**
 * 二重押しチェックをしてから任意のフォームをサブミットする
 */
function chk_target_submit(form){
	if(!g_lock) {
		g_lock = true;
		document.getElementById(form).submit();
		// 20121214 CRT0038 ２度押し対策 start
		if(navigator.userAgent.toLowerCase().search(/firefox/) != -1
			|| navigator.userAgent.toLowerCase().search(/safari/) != -1
			|| navigator.userAgent.toLowerCase().search(/chrome/) != -1 ) {

			window.addEventListener('pageshow', function(event) {
				// cache利用時は初期化
				if(event.persisted){
					g_lock = false;
				}
			}, false);
		}
		// 20121214 CRT0038 ２度押し対策 end
		return true;
	}
	return false;
}

/**
 * 二重押しチェックをしてからロケーションする
 */
function chk_location(){
	if(!g_lock) {
		g_lock = true;
		if (!$.browser.msie) {
			g_lock = false;
		}
		return true;
	}
	return false;
}

/**
 * 二重押しチェックをしてからロケーションする
 */
function chk_confirm_location(msg){
	if(!g_lock) {
		if(confirm(msg)){
			g_lock = true;
			if (!$.browser.msie) {
				g_lock = false;
			}
			return true;
		}
	}
	return false;
}

/**
 * form変数を設定して、submitする
 * @param name	parameter
 * @param value	parameterにセットする値
 */
function button_submit(name, value) {
	if(!g_lock) {
		var len 	= arguments.length;
		var param = $A(new Array());
		for (var i = 0; i < len; i++) {
			param[i] = arguments[i];
		}
		g_lock = true;
		for (var i = 0; i < len; i += 2) {
			eval("$('#mainForm')." + arguments[i]).value = arguments[i + 1];
		}
		$('#mainForm').submit();
		
		if (!$.browser.msie) {
			g_lock = false;
		}
	}
	return false;
}




/**
 * 確認後form変数を設定して、submitする
 * @param name	parameter
 * @param value	parameterにセットする値
 * @param confirm_message	確認メッセージ
 */
function confirm_submit(name, value, confirm_message) {
	if(!g_lock) {
		if(confirm(confirm_message)){
			var len 	= arguments.length;
			len = len - 1;
			var param = $A(new Array());
			for (var i = 0; i < len; i++) {
				param[i] = arguments[i];
			}
			g_lock = true;
			
			for (var i = 0; i < len; i += 2) {
				eval("$('#mainForm')." + arguments[i]).value = arguments[i + 1];
			}
	
			$('#mainForm').submit();
			if (!$.browser.msie) {
				g_lock = false;
			}
		}
	}
	return false;
}

/**
 * locationする
 * @param page_location	locationするパス
 **/
function goto_next(page_location)
{
	if(!g_lock)	{
		
		g_lock = true;
		location.href = page_location;
		if (!$.browser.msie) {
			g_lock = false;
		}
	}
	return false;
}

/**
 * コンボボックスの選択値を取得してlocationする
 * @param page_location	locationするパス
 **/
function combo_foward(page_location)
{
	if(!g_lock)	{
		g_lock = true;
		param = "&blockNo=" + $("#formCombo").value;
		page_location = page_location + param;
		location.href = page_location;
		if (!$.browser.msie) {
			g_lock = false;
		}
	}
	return false;
}

/**
 * 確認後locationする
 * @param page_location	locationするパス
 * @param message	確認メッセージ
 **/
function confirm_location(page_location, message)
{
	if(!g_lock)	{
		if(confirm(message)){
			g_lock = true;
	        location.href = page_location;
	        return false;
		}
	}
	return false;
}

/**
 * window.openする
 * @param url window.openするパス
 * @param opts オプション
 * @return false
 **/
function open_window(url, opts) {

	var defOpts = {"toolbar":"no",
				"location":"no",
				"directories":"no",
				"status":"no",
				"menubar":"no",
				"scrollbars":"yes",
				"resizable":"yes",
				"height":"700",
				"width":"1000",
				"name":"openWindow",
				"centering":"yes"};

	if (opts != undefined) {
		$.each(opts, function (k, v) {
			defOpts[k] = opts[k];
		});		
	}
	
	// ウィンドウ名称取得
	var windowName = defOpts["name"];
	delete defOpts["name"];

	// センタリング処理
	var centering = defOpts["centering"];
	delete defOpts["centering"];
	if (centering == "yes") {
		var position = "";
		var width = defOpts["width"].replace("px", "");
		var height = defOpts["height"].replace("px", "");
		if (window.screen.width > width) {
			position += ",left=" + (window.screen.width-width) / 2;
		}
		if (window.screen.height > height) {
			position += ",top=" + (window.screen.height-height) / 2;
		}
	}

	var optsArray = new Array();
	$.each(defOpts, function (k, v) {
		if (v != null) {
			optsArray.unshift(k + "=" + v);
		}
	});
	
	win = window.open(url, windowName, optsArray.join() + position);

	win.focus();
	
	return false;
}

/**
 * window.openする
 * 
 * @param url window.openするパス
 * @return false
 **/
function open_normal_window(url) {
	return open_window(url, {"toolbar":"yes",
							"location":"yes",
							"directories":"yes",
							"status":"yes",
							"menubar":"yes",
							"height":null,
							"width":null,
							"centering":"no"});
}

/**
 * コンテンツ(子画面)をwindow.openする
 **/
function open_contents_window(url) {
	win = window.open(
		url,
		"contentswindow",
		"toolber=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,height=462,width=538");
	win.focus();

	return true;
}

/**
 * window.openする
 **/
function open_custom_window(url, name, style) {
	win = window.open(
		url,
		name,
		style);
	win.focus();

	return true;
}

/**
 * ウィンドウサイズをリサイズする
 * @param width	ウィンドウの幅
 * @param height	ウィンドウの高さ
 **/
function resize_window(width,height) {
	window.resizeTo(width,height);
}



function checkResponse(res){
	
	
	var evalText = res.responseText;
	if(evalText.search(/<span id="critical"/) != -1){
		moveError();
	}
	if(evalText.search(/<span id="noLogin"/) != -1){
		moveNoLogin();
	}
	if(evalText.search(/<span id="404_error"/) != -1){
		move404();
	}
}

function moveError(){
	location.href = './exception.do?op=init';
}

function moveNoLogin(){
	location.href = './async.do?op=move';
}
function move404(){
	location.href = './async.do?op=not';
}


//------------- 日付フォーマット ------------- 

var g_numberElements = new Array();
var _focusDateHash = new Array();
var _blurDateHash = new Array();

/**
 * idのテキストフィールドを日付型として定義する.
 * @param id id 
 */
function defineAsDateField(id) {

	var o = $(id);
	focusListener = _dateFocusListener.bind(o);
	blurListener = _dateBlurListener.bind(o);
	_focusDateHash[id] = focusListener;
	_blurDateHash[id] = blurListener;
	Event.observe(o, 'focus', focusListener, false);
	Event.observe(o, 'blur', blurListener, false);
	g_numberElements[o.id] = o;
}


// 日付型
function _dateFocusListener() {
	this.value = unformatDate(this.value);
	Field.select(this);
}
function _dateBlurListener() {
	this.value = formatDate(this.value);
}

/**
 * 日付のスラッシュ編集戻し用文字列操作関数.
 * @param  org 元の文字列
 * @return 編集後の文字列
 */
function unformatDate(org) {
	if (org == null) {
		return null;
	}
	return org.replace(/\//g, "");
}

/**
 * 日付のスラッシュ編集用文字列操作関数.
 * @param  org 元の文字列
 * @return 編集後の文字列
 */
function formatDate(org) {

	if (org == null) {
		return null;
	}
	if(!org.match(/^(-?)[0-9]{6,8}$/)){
		return org;
	}
	var tmp = org;
	if (tmp.length == 8) {
		var year  = parseInt(tmp.substring(0, 4), 10);
		var month = parseInt(tmp.substring(4, 6), 10)-1;
		var day   = parseInt(tmp.substring(6, 8), 10);
		if (isNaN(year) || isNaN(month) || isNaN(day)) {
			return org;
		}
		var d = new Date(year, month, day);
		if (month != d.getMonth()) {
			return org;
		}
		if (day != d.getDate()) {
			return org;
		}
		return tmp.substring(0, 4) + "/" + tmp.substring(4, 6) + "/" + tmp.substring(6, 8);
	}
	if (tmp.length == 6) {
		var year  = parseInt(tmp.substring(0, 4), 10);
		var month = parseInt(tmp.substring(4, 6), 10) - 1;
		if (isNaN(year) || isNaN(month)) {
			return org;
		}
		var d = new Date(year, month);
		if (month != d.getMonth()) {
			return org;
		}
		return tmp.substring(0, 4) + "/" + tmp.substring(4, 6);
	}
	return org;
}

function mapSearch(code) {
	add_action_target_unlock('city/'+code, 'mapForm')
}

/*
 * URL文字列にリクエストパラメータを付加します。
 * 単純にURLに'?'があれば'&'、なければ'?'でパラメータ連結しているだけです。
 * ※jQueryに依存しています。
 * @params url URL文字列
 * @params params 付加したいリクエストパラメータ。JSON形式({パラメータ名: 値})で設定してください。
 */
function addRequestParams(url, params) {
	if (params == null) {
		return url;
	}
	var result = url;
	$.each(params, function(k, v) {
		result += (result.match(/\?/) ? '&' : '?') + [k, v].join("=");
	});
	return result;
}

/*
 * onKeypress時にenterキー押下時のみclickと同じ動作を呼び出します。
 * ※jQuery依存
 */
function onKeypressAsClick() {
	if (event.keyCode == 13) {
		$(this).click();
		return false;
	}
	return true;
}
/*
 * ペースト(貼り付け)処理を抑制します。
 * ※jQuery依存
 * @param ペースト処理を抑制したいFormObjectのID(文字列)を複数指定可能。
 * 例）
 *   disablePaste("ma_email_confirm", "ma_password_confirm")
 * @return なし
 */
function disablePaste() {
	if (!arguments) {
		return;
	}
	$($.map(arguments, function(e) {return e.replace(/^([^#])/, '#$1');}).join()).keydown(
		function() {
			return !((event.keyCode == 86 && event.ctrlKey) || (event.keyCode == 45 && event.shiftKey)); 
		}
	).bind('paste',
		function() {
			return false;
		}
	);
}

/*
 * 注文詳細履歴画面の初期表示時、評価値を設定する。
 * MouseClick、MouseOver、MouseOut、Onfocus処理を行う。
 */
function setEvalValue(){
	// 注文詳細履歴画面の初期表示時、評価値を設定する。
	var evalValue = $("input[name^='eval']");
	for (i = 0; i < evalValue.length; i++) {
		checkEvalValue(evalValue.eq(i).val(), evalValue.eq(i).attr("id"), true);
	}
	// MouseClick、MouseOver、MouseOut、Onfocus処理を行う。
	var eval = $("a[id^='ma_eval']");
	// Onfocus
	eval.focus(function(){
		this.blur(); 
	});
	// MouseClick
	eval.click(function(){
		var str = this.id.replace(/_link.*/, "");
		eval_stars_click($(this).text(), str, true); 
	});
	// MouseOver、MouseOut
	eval.hover(
		// MouseOver
		function(){
			var str = this.id.replace(/_link.*/, "");
			eval_stars_mouseover($(this).text(), str, true); 
		},
		// MouseOut
		function(){
			var str = this.id.replace(/_link.*/, "");
			eval_stars_mouseout(str); 
		}
	);
}

/*
 * 注文詳細履歴画面で店舗評価値の範囲チェックし、評価値を設定する。
 * @param checkEvalValue 店舗評価値
 * @param id             id
 * @param flg            valueに設定するかの判定
 */
function checkEvalValue(checkEvalValue, id, flg) {
	
	if (checkEvalValue != undefined && checkEvalValue != null && checkEvalValue != '') {
		var evalValue = new Number(checkEvalValue);
		if (1 <= evalValue && 1.5 > evalValue) {
			eval_stars_click(1, id, flg);
		} else if (1.5 <= evalValue && 2 > evalValue) {
			eval_stars_click(1.5, id, flg);
		} else if (2 <= evalValue && 2.5 > evalValue) {
			eval_stars_click(2, id, flg);
		} else if (2.5 <= evalValue && 3 > evalValue) {
			eval_stars_click(2.5, id, flg);
		} else if (3 <= evalValue && 3.5 > evalValue) {
			eval_stars_click(3, id, flg);
		} else if (3.5 <= evalValue && 4 > evalValue) {
			eval_stars_click(3.5, id, flg);
		} else if (4 <= evalValue && 4.5 > evalValue) {
			eval_stars_click(4, id, flg);
		} else if (4.5 <= evalValue && 5 > evalValue) {
			eval_stars_click(4.5, id, flg);
		} else if (5 == evalValue) {
			eval_stars_click(5, id, flg);
		} else {
			// 何もしない
		}
	}
}

/*
 * MouseOut時の処理を行う。
 */
function eval_stars_mouseout(id) {
	var temp = $("#" + id + "Selected");
	eval_stars_mouseover(temp.val(), id, true);
}

/*
 * MouseClick時の処理を行う。
 */
function eval_stars_click(score, id, active) {
	var temp = $("#" + id + "Selected");
	if (temp.val() != undefined) {
		temp.val(score);
	}
	eval_stars_mouseover(score, id, active);
}

/*
 * MouseOver時の処理を行う。
 */
function eval_stars_mouseover(score, id, active) {
	tag_score = score * 10;
	if (tag_score == 0) {
		tag_score = '00';
	}
	var classEval = $('#class_' + id);
	var selectUlEval = 'select_level' + tag_score + ' clearFix';
	classEval.attr("class", selectUlEval);
	if(active == true) {
		$("#" + id).val(score);
	} else if (active == false) {
		// 何もしない
	}
}

/*
 * 単語（半角英数文字）の切れ目で改行する。
 */
function strWordBreak() {
	// ソース上のclassタグ指定
    var $targetElement = '.wordBreak';
    if($.browser.msie) {
    	// IEブラウザの場合
    	$($targetElement).css('word-break', 'break-all');
    } else {
    	// IE以外の場合
    	$($targetElement).each(function(){
    		if(navigator.userAgent.indexOf('Firefox/2') != -1) {
    			// firefox2の場合
    			$(this).html($(this).text().split('').join('<wbr />'));
    		} else {
    			// 以外の場合
    			$(this).html($.trim($(this).text().split('').join(String.fromCharCode(8203))));
    		}
    	});
    }
}

var pathName = "";

/**
 * ヘッダのログインボタンを押下した際に、ボタン押下した画面が、
 * 「ジャンルトップ」、「チェーントップ」、「店舗トップ」、「メニュー」であったら、cookieにそのパスを出力することで、
 * ログイン後そのパスに遷移するようにする。
 * また、商品詳細(トッピング、生地選択などを含む)の場合は、その商品が所属するメニュー画面に遷移するようにする。
 * このファンクションでは上記条件に合致しない場合、cookieを削除する。
 * これにより、合致しない画面ではログイン後top画面に遷移することになる
 * @param url ログインアクションのパス(mayaaで動的に決まるため)
 */
function loginFunction(url) {
	pathName = location.pathname;
	var contextPath = document.getElementById("ma_context_path").value;
	if(0==pathName.indexOf(contextPath)){
		pathName = pathName.substr(contextPath.length, pathName.length - contextPath.length);
	}

	//ログイン画面上で「ヘッダのログインボタン」を押下した場合は、cookieを作ったり削除したりしない
	if(equalsPath("/login/top/")){
		window.open(url, "_self");
		return;
	}
	
	//get(そのままのパスに遷移させるケース)
	if(equalsPath("/search/genre/")	//ジャンルトップの場合
	|| equalsPath("/search/chain/")	//チェーントップの場合
	|| equalsPath("/shop/menu/") && notEqualsPath("/shop/menu/select") && notEqualsPath("/shop/item/cancel/") && notEqualsPath("/shop/menu/order/")	//メニュー(店舗トップ含む)の場合
	|| equalsPath("/search/delivery/branding/")	//広告リンクからの店舗トップの場合
	){
		createReturnPathCookie(createReturnPath(pathName));
	}
	
	//get(商品詳細からメニューへ。要shopId別途取得モノ)
	else if(equalsPath("/shop/item/") && notEqualsPath("/shop/item/topping/") && notEqualsPath("/shop/item/edit/") && notEqualsPath("/shop/item/ok/") && notEqualsPath("/shop/item/cancel/") && notEqualsPath("/shop/item/order/")	//商品詳細画面の場合(この画面に来られるのは区画コード確定時のみ)ピザの場合は生地選択
	){
		pathName = "/shop/menu/" + document.getElementById("ma_shop_id").value;
		createReturnPathCookie(createReturnPath(pathName));
	}

	//post(商品詳細系からメニューへ。shopIdをhiddenから切りだす必要があるケース)
	else if(equalsPath("/shop/menu/select")		//セット商品の生地選択
		 || equalsPath("/shop/item/cancel/")	//トッピングの画面から「前のページに戻る」で戻った生地選択
		 || equalsPath("/shop/item/ok/")		//トッピングの画面から「確定する」で戻った生地選択
		 || equalsPath("/shop/item/edit/")		//カート画面から「変更」ボタンで戻った商品詳細画面
	){
		pathName = "/shop/menu/";
		createReturnPathCookie(createReturnPathWithQuery(pathName, createQueryString("mainForm")));
	}

	//post(pathからshopIdを切り出す必要があるケース)
	else if(equalsPath("/shop/item/topping/")	//トッピング画面(この画面に来られるのは区画コード確定時のみ)
		 || equalsPath("/shop/menu/order/")		//ネットスーパー商品一覧で「カートに入れる」ボタン押下後の商品一覧画面
		 || equalsPath("/shop/item/order/")		//ネットスーパー商品詳細で「カートに入れる」ボタン押下でエラーとなった商品詳細画面
	){
		pathName = "/shop/menu/" + pathName.split('/')[4];
		createReturnPathCookie(createReturnPathWithQuery(pathName, createQueryString("mainForm")));
	}

	//それ以外の場合はcookieを削除(これにより、ログイン画面に遷移し、ログインしたあとはトップ画面に戻ることになる)
	else{
		removeReturnPathCookie();
	}
	
	window.open(url, "_self");
}

/**
 * クエリ文字列やページ内リンクを付与したURLをURIエンコードしたものを返す。
 * Java側ではjava.net.URLDecoder#decodeでデコードする必要がある。
 */
function createReturnPath(pathName){
	var returnPath = pathName;
	if(location.search != ""){
		returnPath += location.search;
	}
	if(location.hash != ""){
		returnPath += location.hash;
	}
	if(-1!=returnPath.indexOf("/shop/menu/") && -1==returnPath.indexOf("#") && -1!=returnPath.indexOf("menuCd=")){
		returnPath += "#menu";
	}
	returnPath = encodeURIComponent(returnPath);
	return returnPath;
}


/**
 * クエリ文字列やページ内リンクを付与したURLをURIエンコードしたものを返す。
 * Java側ではjava.net.URLDecoder#decodeでデコードする必要がある。
 */
function createReturnPathWithQuery(pathName, queryString){
	var returnPath = pathName;
	if(location.search != ""){
		returnPath += location.search + "&" + queryString;
	}else{
		returnPath += "?" + queryString;
	}
	if(location.hash != ""){
		returnPath += location.hash;
	}
	if(-1!=returnPath.indexOf("/shop/menu/") && -1==returnPath.indexOf("#") && -1!=returnPath.indexOf("menuCd=")){
		returnPath += "#menu";
	}
	returnPath = encodeURIComponent(returnPath);
	return returnPath;
}

/**
 * パスが一致していればtrueを返す
 */
function equalsPath(path){
	return 0==pathName.indexOf(path);
}

/**
 * パスが一致していなければfalseを返す
 */
function notEqualsPath(path){
	return !equalsPath(path);
}

var excludeList =["menuInfoKey", "itemDetailKey"];
/**
 * 除外リストに含まれているか、除外対象であればtrueを返す
 */
function isExcludeItem(name){
	for(var i=0;i<excludeList.length;i++){
		if(name==excludeList[i]){
			return true;
		}
	}
	if(typeof name === "undefined"){
		return true;
	}
	if(0==name.indexOf("menuInfo.itemList")){
		return true;
	}
	return false;
}

/**
 * formIdのform配下にあるhiddenを使ってクエリ文字列を作成し、返す。
 */
function createQueryString(formId){
	var inputList = document.getElementById(formId).getElementsByTagName("input");
	var hiddenList = new Array();
	for(var i=0;i<inputList.length;i++){
		if(inputList.item(i).type == "hidden"){
			hiddenList.push(inputList.item(i));
		}
	}
	var queryString ="";
	for(var i=0;i<hiddenList.length;i++){
		if(isExcludeItem(hiddenList[i].name)){
			continue;
		}
		if(i!=0){
			queryString += "&";
		}
		queryString += hiddenList[i].name + "=" + hiddenList[i].value;
	}
	return queryString;
}

/**
 * ログイン後遷移元の画面に戻すためのurlをcookieに出力する
 */
function createReturnPathCookie(returnPath){
	document.cookie = "returnPath="+ returnPath+";path=/";
}

/**
 * ログイン後遷移元の画面に戻すためのcookieを削除する
 */
function removeReturnPathCookie(){
	cookieName = "returnPath=";
	date = new Date();
	date.setYear(date.getYear() - 1);
	document.cookie = cookieName + ";expires=" + date.toGMTString() + ";path=/";
}

/**
 * 電話番号のコピー
 */
function copyPhoneNo() {
	var area = $('#ma_phone_no_area').val();
	$('#ma_mobile_tel_01').val(area);

	var local = $('#ma_phone_no_local').val();
	$('#ma_mobile_tel_02').val(local);

	var suffix = $('#ma_phone_no_suffix').val();
	$('#ma_mobile_tel_03').val(suffix);
	return false;
}
