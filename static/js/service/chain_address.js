/* ===================================================================
javascript information

File Name  : chain_address.js
Author     : d-takachi
Style Info :
=================================================================== */

//====================================================================
//
// 住所検索用JavaScript定義 chain用
//
//====================================================================

/**
 * 区画コードから丁目一覧を取得する
 * @param chainId
 * @param blockCode
 * @param success
 * @param failure
 */
function chainDetailName(chainId, blockCode, success, failure) {
  $.ajax({
    type: 'GET',
    url: neo_api_chain_address_detail_name + '/' + chainId + '/' + blockCode + '/',
    dataType: 'json',
  }).done(function(response) {
      success(response);
  }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
    if (failure) {
      failure(XMLHttpRequest, textStatus, errorThrown);
    }
  });
}

/**
 * 区画コードから郵便番号一覧を取得する
 * @param blockCode
 * @param success
 * @param failure
 */
function searchPostNoWithBlockCode(blockCode, success, failure) {
  $.ajax({
    type: 'GET',
    url: neo_api_search_address_postno + '/' + blockCode,
    dataType: 'json',
  }).done(function(response) {
      success(response);
  }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
    if (failure) {
      failure(XMLHttpRequest, textStatus, errorThrown);
    }
  });
}

$(document).on("click", ".search_zip_from_block_code", function() {
    var sender = $(this);
    searchPostNoWithBlockCode(
        $(this).data("block_code"),
        function(response) {
          <!-- /* 郵便番号リストモーダル */ -->
          callPostNoModal(
            response.addressInfoList[0].addressInfo,
            sender.data("next_url"),
            sender.data("cancel_url")
          );
        }
     );
  });


/**
 *
 * @param postNo 郵便番号
 */
function chainZip(postNo,chainid) {
  $.ajax({
    type: 'GET',
    url: neo_api_chain_zip + '/' + chainid + '?postNo=' + postNo,
    dataType: 'json',
  }).done(function(response) {
    // エラーメッセージが返ってきた場合、エラーダイアログ表示
    if(response.errorMessageList != null) {
      callErrorModal(response.errorMessageList);
    } else {
      if(response.isAdddressOver == true) {
        // 県・町またぎフラグがtrueのとき
        location.href = neo_search_address_zip + "?zip=" + response.postNo;
      }  else {
        // 複数件の場合は郵便番号を引数として店舗検索(郵便番号から選択)画面へ遷移
        location.href = neo_chain_address_zip + chainid + "?zip=" + response.postNo;
      }
    }
  }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
    if (failure) {
      failure(XMLHttpRequest, textStatus, errorThrown);
    }
  });
}

// 郵便番号から探すボタン押下時処理
$(".chain_zip").live("click", function(event) {
  var sender = $(this);
  var inputPostNoItem = $("#" + sender.data("input_postno_id")).first();
  var chainId = sender.data("chain_id");
  chainZip(inputPostNoItem.val(),chainId);
});


/**
 * 現在地から住所候補を検索し、モーダル表示する。
 * @param nextUrl
 * @param cancelUrl
 * @param decisionUrl
 */
function showCurrentLocationModal(nextUrl, cancelUrl, decisionUrl) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position){
    $.ajax({
      type: 'GET',
          url: neo_api_search_address_location + '?latitude=' + position.coords.latitude + "&longitude=" + position.coords.longitude,
      dataType: 'json',
    }).done(function(response) {
      // 住所候補モーダル表示
      callCurrentLocationModal(response.addressInfoList, nextUrl, cancelUrl, decisionUrl)
    }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
      // エラー表示
      callErrorModal(["現在地を取得することができませんでした"]);
    });
        },
        function(error) {

        // エラー表示
        callErrorModal(["現在地を取得することができませんでした"]);
        },
      {
        enableHighAccuracy:true,
        timeout: 15000
      }
      );
  } else {
    // エラー表示
    callErrorModal(["現在地を取得することができませんでした"]);
  }
  }

// 現在地から探すボタン押下時処理
$(".show_current_location_modal").live("click", function(event) {
  var sender = $(this);
  showCurrentLocationModal(
    sender.data("next_url"),
    sender.data("cancel_url"),
    sender.data("decision_url")
  );
});

function searchByZip(e) {
	if (!e)
	e = window.event;
	if ((e.keyCode || e.which) == 13) {
	$("#inputZipNumberA").click();
	}
}
