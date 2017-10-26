/* ===================================================================
javascript information

File Name  : modal.js
Author     : k-mimura
Style Info :
=================================================================== */

//====================================================================
//
// モーダル処理用JavaScript定義
//
//====================================================================

/**
 * 郵便番号モーダル表示処理
 * @param (postNoList) 郵便番号(postNo)保持オブジェクトのリスト
 * @param (nextUrl) 次画面URL
 * @param (cancelUrl) 他の地域を検索URL
 * @param (decisionUrl) 確定時遷移先URL(Default:nextUrlと同じ値を使用)
 * @param (postNoParamName) 郵便番号URLパラメータ名称(Default:zip)
 *
 */
function callPostNoModal(postNoList, nextUrl, cancelUrl, decisionUrl) {

  if (postNoList.length > 1) {
    /* 複数件有る場合は郵便番号モーダルを設定して表示 */
    $("li[id ^= post_no_]").remove();
    $.each(postNoList, function(index, value) {
      var item = $("#template_post_no_modal_item").clone();
      item.attr("id", "post_no_" + (index + 1));
      item.find("#candidate_label").first().html("候補" + (index + 1));
      item.find("#postno").first().html(value.postNo);

      var selectUrl = nextUrl.replace(/\{blockCode\}/g, value.blockCode);
      /* リンクURLに郵便番号を付与 */
      selectUrl = selectUrl + (selectUrl.indexOf("?") >= 0 ? "&" : "?");
      selectUrl = selectUrl +  "zip=" + value.postNo;
      item.find("#select_link").first().attr("href", selectUrl);

      /* hidden属性を削除 */
      item.removeClass("neo_hidden");
      item.appendTo("#post_no_list");
    });
    /* キャンセルURL設定 */
    if(cancelUrl) {
      $("#searchZipCode").find("#cancel_link").first().attr("href", cancelUrl);
    } else {
      $("#searchZipCode").find("#cancel_link").addClass("neo_hidden");
    }

    $("#show_post_no_modal").trigger("click");
  } else if (postNoList.length == 1){
    /* 1件の場合は呼び出し元画面へ遷移 */
    var deciUrl = decisionUrl;
    if (!deciUrl) {
      // decisionUrlが未設定の場合はnextUrlを使用
      deciUrl = nextUrl;
    }
    deciUrl = deciUrl + (deciUrl.indexOf("?") >= 0 ? "&" : "?");
    deciUrl = deciUrl + "zip=" + postNoList[0].postNo;

    // 指定のURLへ遷移
    location.href = deciUrl;
  } else {
    <!-- /* 対象郵便番号無し TODO：エラーモーダル表示？ */ -->
  }
}

/**
 * 現在地モーダル表示処理
 * @param (locationList) 現在地保持オブジェクトのリスト
 * @param (nextUrl) 次画面URL
 * @param (cancelUrl) 他の地域を検索URL
 * @param (decisionUrl) 確定時遷移先URL(Default:nextUrlと同じ値を使用)
 *
 */
function callCurrentLocationModal(locationList, nextUrl, cancelUrl, decisionUrl) {
	if (!locationList || locationList == null || locationList.length == 0) {
		callErrorModal(["現在地を取得することができませんでした"]);
		return;
	}



	/* 前回の表示内容を全てクリア */
	$("li[id ^= current_location_]").remove();
	$.each(locationList, function(index, value) {
	  var item = $("#template_location_modal_item").clone();
	  item.attr("id", "current_location_" + (index + 1));
	  item.find("#candidate_label").first().html("候補" + (index + 1));
	  item.find("#address").first().html(value.address);

	  if (value.postNoList != null && value.postNoList.length > 1) {
	    // 郵便番号が複数件存在する場合は選択時に郵便番号モーダル表示
	    var selectLink = item.find("#select_link").first();
	    selectLink.attr("href", "#");
	    selectLink.addClass("search_zip_from_block_code");
	    selectLink.data("block_code", value.blockCode);
	    selectLink.data("next_url", nextUrl);
	    selectLink.data("cancel_url", cancelUrl);
	    selectLink.data("decision_url", decisionUrl);
	  } else {
	    var selectUrl = nextUrl.replace(/\{blockCode\}/g, value.blockCode);
	    var deciUrl = decisionUrl;
	    if (!deciUrl) {
	      // decisionUrlが未設定の場合はnextUrlを使用
	      deciUrl = selectUrl;
	    }
	    /* リンクURLに郵便番号を付与 */
	    selectUrl = selectUrl + (selectUrl.indexOf("?") >= 0 ? "&" : "?");
	    selectUrl = selectUrl + "zip=" + value.postNoList[0].postNo;
	    /* リンクURLに区画コードを付与 */
	    item.find("#select_link").first().attr("href", selectUrl);
	  }

	  /* hidden属性を削除 */
	  item.removeClass("neo_hidden");
	  item.appendTo("#location_list");
	});
	/* キャンセルURL設定 */
	$("#searchPlace").find("#cancel_link").first().attr("href", cancelUrl);

	$("#show_location_modal").trigger("click");
}

/**
 * エラーメッセージモーダル表示処理
 * @param errorMessageList
 * @returns
 */
function callErrorModal(errorMessageList) {
  /* 前回の表示内容を全てクリア */
  $("p[id ^= error_message_]").remove();
  $.each(errorMessageList, function(index, value) {
    var item = $("#template_error_modal_item").clone();
    item.attr("id", "error_message_" + (index + 1));
    item.html("・" + value);
    /* hidden属性を削除 */
    item.removeClass("neo_hidden");
    item.appendTo("#error_message_list");
  });

  // モーダル表示
  $("#show_error_modal").trigger("click");
}

/**
 * エラーメッセージモーダル表示処理
 * @param errorMessageList
 * @returns
 */
function callErrorMessageModal(errorMessage) {
  /* 前回の表示内容を全てクリア */
  $("p[id ^= error_message_]").remove();
  var item = $("#template_error_modal_item").clone();
  item.attr("id", "error_message_001");
  item.html("・" + errorMessage);
  /* hidden属性を削除 */
  item.removeClass("neo_hidden");
  item.appendTo("#error_message_list");

  // モーダル表示
  $("#show_error_modal").trigger("click");
}

/**
 * 現在地モーダルから呼び出される郵便番号モーダル表示処理
 */
$(".show_post_no_modal").live("click", function(event) {
  var sender = $(this);
  callPostNoModal(
    sender.data("post_no_list"),
    sender.data("next_url"),
    sender.data("cancel_url"),
    sender.data("decision_url")
  );
});
