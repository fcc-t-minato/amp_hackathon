/* ===================================================================
javascript information

File Name  : search_delivery.js
Author     : d-takachi
Style Info :
=================================================================== */

//====================================================================
//
// 店舗一覧用JavaScript定義
//
//====================================================================

  /**
   * 絞り込み遷移
   */
  $('.select_move').live("click", function(event) {

	  if( $(':hidden[name="onclickFlag"]').val() == "on"){
		  return;
	  }

      var urlStr = neo_search_delivery;
      var sender = $(this);

      //「ジャンル」と「その他条件」のラジオボタン部分に対して、2度押し制御をします。
      var genreFlag = ( sender.data('genrecode') != null && sender.data('genrecode') != "" ? true : false );
      var sortColFlag = ( sender.data('sortcol') != null && sender.data('sortcol') != "" && sender.data('sortcol') != "wait_tm" ? true : false);
      if(genreFlag || sortColFlag){

    	  if(sender.parent("div").attr("class").indexOf("current") >= 0 ){

    		  return;
    	  }
      }

      $(':hidden[name="onclickFlag"]').val("on");

      // ラジオボタン切り替え
      $('.pt_radio_01').removeClass('current');
      sender.parent("div").addClass('current');
      var genreValue = ( sender.data('genrecode') != null && sender.data('genrecode') != "" ? sender.data('genrecode') : $(':hidden[name="targetGenreCode"]').val() );
      var sortColValue = ( sender.data('sortcol') != null && sender.data('sortcol') != "" ? sender.data('sortcol') : $(':hidden[name="targetSortCol"]').val() );
      var addressIdValue = $(':hidden[name="targetAddressId"]').val();
      var zipValue = $(':hidden[name="targetZip"]').val();
      var blockCodeValue = $(':hidden[name="targetBlockCode"]').val();

      if(genreValue == 'all_reload') {
          // 初期状態に読み込み
          urlStr += blockCodeValue + '/';
          urlStr = makeUrlParam(urlStr,'addressId',addressIdValue);
          urlStr = makeUrlParam(urlStr,'zip',zipValue);
      } else {
          // URL整形
          urlStr += blockCodeValue + '/';
          urlStr += ( genreValue != null && genreValue != "" ? genreValue : '');
          urlStr = makeUrlParam(urlStr,'addressId',addressIdValue);
          urlStr = makeUrlParam(urlStr,'zip',zipValue);
          urlStr = makeUrlParam(urlStr,'sortCol',sortColValue);

          if(sender.data('isrefine') == true) {
            // 絞り込みボタン実行 checkboxの値格納
            $('.checkbox input:checked').map(function() {
                urlStr += ( urlStr.indexOf("?") >= 0 ? "&" : "?" );
                urlStr += 'paymentTyp=' + $(this).val();
            });
          } else {
              var creditCardFlg = $(':hidden[name="targetCreditCardFlg"]').val();
              var amazonPaymentFlg = $(':hidden[name="targetAmazonPaymentFlg"]').val();
              var billFlg = $(':hidden[name="targetBillFlg"]').val();
              var madonnaPayFlg = $(':hidden[name="targetMadonnaPayFlg"]').val();
              urlStr = makeUrlParam(urlStr,'paymentTyp',creditCardFlg);
              urlStr = makeUrlParam(urlStr,'paymentTyp',amazonPaymentFlg);
              urlStr = makeUrlParam(urlStr,'paymentTyp',billFlg);
              urlStr = makeUrlParam(urlStr,'paymentTyp',madonnaPayFlg);
          }
      }

      // ページ遷移
      setTimeout(function() { location.href = urlStr; }, 0);
  });

  function makeUrlParam(url,argName,argValue) {
    url += ( argValue != null && argValue != "" ? ( url.indexOf("?") >= 0 ? "&" : "?" ) : '');
    url += ( argValue != null && argValue != "" ? argName + '=' + argValue : '');
    return url;
  }
