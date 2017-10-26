/* ===================================================================
javascript information

File Name  : move_shopmenu.js
Author     : d-takachi
Style Info :
=================================================================== */

//====================================================================
//
// getShopTopとgetMenuの応答値でエラーになるか判定
//
//====================================================================

/**
 * getShopTopとgetMenuを取得する
 * @param shopId
 * @param blockCode
 * @param success
 * @param failure
 */
function getShopTopAndGetMenu(shopId, blockCode, success, failure) {
  $.ajax({
    type: 'GET',
    url: neo_api_shop_menu + '/' + shopId + '/' + blockCode + '/',
    dataType: 'json',
  }).done(function(response) {
      success(response);
  }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
    if (failure) {
      failure(XMLHttpRequest, textStatus, errorThrown);
    }
  });
}

function callMoveOrErrorModal(errorMessage, nextUrl) {

  if (errorMessage == "" || errorMessage == undefined || errorMessage == null){
    /* 通常遷移 */
    // 指定のURLへ遷移
    location.href = nextUrl;
  } else {
    callErrorMessageModal(errorMessage);
  }
}
