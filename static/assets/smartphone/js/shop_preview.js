/*<![CDATA[*/
$(function() {

	// プレビュー日時
	var previewTime = document.getElementById("previewTime");

	// 店舗プレビュー時に遷移可能なURL
	var shopPreviewAllowUrl = document.getElementById("shopPreviewAllowUrl");

	if (null != previewTime && "" != previewTime.value) {

		// プレビュー日時がNULL／空白ではない場合

		// <a>タグの設定
		var aTags = document.getElementsByTagName("a");
		// <a>タグの数
		var aTagsLength = aTags.length;
		var i = 0;

		var paramsArray = [];
		paramsArray['previewTime'] = previewTime.value;

		while (aTagsLength > i) {

			var aTagHref = aTags[i].href;

			if (null == aTagHref.match(previewTime.value)
					&& null != shopPreviewAllowUrl) {

				// プレビュー日時の内容がhref内に無い かつ
				// 店舗プレビュー時に遷移可能なURLが設定済み

				var shopPreviewAllowUrlArray = shopPreviewAllowUrl.value
						.split(",");
				var shopPreviewAllowUrlArrayLength = shopPreviewAllowUrlArray.length;
				var k = 0;
				var shopPreviewNotAllowFlg = true;

				while (shopPreviewAllowUrlArrayLength > k) {

					var replaceStr = shopPreviewAllowUrlArray[k];

					if (null == aTagHref || "" == aTagHref
							|| aTagHref.match(replaceStr)) {
						// href内に店舗プレビュー時に遷移可能なURLが含まれる

						// 遷移OK
						shopPreviewNotAllowFlg = false;
						break;
					}
					k++;
				}

				if (shopPreviewNotAllowFlg) {
					// 店舗プレビュー時に遷移NGのURLの場合

					var classNames = aTags[i].className.replace(/^\s+|\s+$/g,
							'').split(' ');

					// 店舗プレビューを許可するclassが設定されていた場合
					if (classNames.indexOf("shopPreviewAllow") >= 0) {

						i++;

						// 遷移OK
						continue;
					}

					// エラーポップアップ
					if (classNames.indexOf("mfp-close") >= 0) {

						i++;

						// 遷移OK
						continue;
					}

					if (classNames.toString() === '') {
						classNames = [];
					}

					// 店舗プレビューを許可しないclassを追加
					// このclassが指定されたボタン・リンクを無効化する
					classNames.push("shopPreviewNotAllow");

					aTags[i].className = classNames.join(' ');

				} else {
					// 店舗プレビュー時に遷移OKのURLの場合

					// リンク先URLにプレビュー日時を付与
					aTags[i].href = setParameter(aTagHref, paramsArray);
				}
			}

			i++;
		}

		if (null == document.URL.match("previewTime")
				&& null != shopPreviewAllowUrl) {

			// 現在のURLにpreviewTimeが無い かつ
			// 店舗プレビュー時に遷移可能なURLが設定済み

			// リンク先URLにプレビュー日時を付与

			history.replaceState('', '', setParameter(location.href,
					paramsArray));
		}
	}

	// 店舗プレビューを許可しないclassが付与された
	// ボタン・リンクを無効化する
	jQuery.fn.extend({
		disablementLink: function() {
			return this.attr({href: "javascript:void(0);", onclick: "return false;", target: ""}).click(function(e) {
				e.stopImmediatePropagation();
				return false;
			});
		}
	});

	$(document).ready(function() {
		$('a.shopPreviewNotAllow').disablementLink();
	});

	// パラメータを設定したURLを返す
	function setParameter(aTagHref, paramsArray) {

		for (key in paramsArray) {
			aTagHref += (aTagHref.indexOf('?') == -1) ? '?' : '&';
			aTagHref += key + '=' + paramsArray[key];
		}
		return aTagHref;
	}
});
/* ]]> */