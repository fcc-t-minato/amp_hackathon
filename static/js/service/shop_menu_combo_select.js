/* ===================================================================
javascript information

File Name  : shop_menu_combo_select.js
Author     : d-takachi
Style Info :
=================================================================== */

//====================================================================
//
// 店舗TOP画面用JavaScript定義
//
//====================================================================

/**
 *  画面側必要変数
 *  MAX_COMBO_NUM コンボ組み合わせ最大数　thymeleafで設定する
 *  nowCheckBoxCheckCnt　コンボ組み合わせ選択数
 *  blockCode thymeleafで設定する
 *  shopId　thymeleafで設定する
 *  checkboxのvalue値は:::で区切った文字列をsplitする
 *  menuCd checkbox value値　0番目の要素
 *  itemCd checkbox value値　1番目の要素
 *  child_item_cd checkbox value値　2番目の要素
 */

 // チェックされたとき
$(document).on("change", '.check_combo_item', function() {
	// リンクとして利用するかチェック
	var linkUrl = $(this).data('link_url');
	if (linkUrl) {
		$(this).prop('checked',false);
		// 選択中表記更新
	    refreshStatus();
		location.href = linkUrl;
		return;
	}

	// チェック済み総数
	nowCheckBoxCheckCnt = $('.check_combo_item:checked').length;
	if(nowCheckBoxCheckCnt > MAX_COMBO_NUM) {
	  // 最大数超えているため、チェック外す
	  $(this).prop('checked',false);
	}

	// 選択中表記更新
    refreshStatus();
});

  // 選択中表記更新 ex.0/2 1/2 2/2
function refreshStatus(){
	// チェック済み総数
	nowCheckBoxCheckCnt = $('.check_combo_item:checked').length;
	if(0 < nowCheckBoxCheckCnt){
		$('#dispSelected').addClass('active');
		$('#combo_category').addClass('noDp');
	}else{
		$('#dispSelected').removeClass('active');
		$('#combo_category').removeClass('noDp');
	}

	var status = document.getElementById("status");
	// 表示更新
	status.innerHTML = nowCheckBoxCheckCnt + "／" + MAX_COMBO_NUM;
}

  // 組み合わせ選択ボタン押下時に呼び出す
function ComboPush() {
  // checkbox valueを配列に
  var urlStr = '';
  var intCount = 0;
  // 画面内のチェックされている項目のvalue値を処理
  $('.check_combo_item:checked').map(function() {
    var valueStr = $(this).val().split(':::');
    menuCd = valueStr[0];
    itemCd = valueStr[1];
    child_item_cd[intCount] = valueStr[2];
    sizeCd = valueStr[3];
    intCount++;
  });
  if(genreNm != null){
      urlStr = neo_shop_item_set + blockCode + '/' + shopId + '/' + menuCd + '/' + itemCd + '/'+ genreNm + '/' ;
  }else{
	  urlStr = neo_shop_item_set + blockCode + '/' + shopId + '/' + menuCd + '/' + itemCd + '/';
  }
  for( var i=0; i < child_item_cd.length;i++) {
    urlStr += i==0 ? '?child_item_cd=' : '&child_item_cd=';
    urlStr += child_item_cd[i];
  }
  urlStr += '&sizeCd=' + sizeCd;
  urlStr += '&addressId=' + addressId;
  urlStr += '&zip=' + zip;
  if(previewTime != null){
	  urlStr += '&previewTime=' + previewTime;
  }
  // 組み合わせメニュー選択画面にリダイレクト
  location.href = encodeURI(urlStr);
}
