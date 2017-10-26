/* ===================================================================
javascript information

File Name  : amazon_header.js
Author     : 
Style Info : 
=================================================================== */

var gAmazonClientId = null;
var gAmazonSellerId = null;
setConfig();

//****************************************************
// AmazonLoginReady
//****************************************************

window.onAmazonLoginReady = function() {
  amazon.Login.setClientId(gAmazonClientId);
};

//****************************************************
// Amazonログインキー有無判定
//****************************************************

function isExistAmazonLoginKey() {
    if (getAmazonLoginKey() != null) {
        return true;
    }
    return false;
}

//****************************************************
// 認証キー取得
//****************************************************

function getAmazonLoginKey() {
    var result = null;
    var cookieName = 'amazon_Login_state_cache' + '=';
    var allcookies = document.cookie;
    var position = allcookies.indexOf(cookieName);
    if (position != -1) {
        var startIndex = position + cookieName.length;
        var endIndex = allcookies.indexOf(';', startIndex);
        if (endIndex == -1) {
            endIndex = allcookies.length;
        }
        result = decodeURIComponent(allcookies.substring(startIndex, endIndex));
    }
    return result;
}

//****************************************************
// 設定（共通）
//****************************************************

function setConfig() {
    var scripts = document.getElementsByTagName("script");
    var param = null;
    for (var i = 0; i < scripts.length; i++) {
        var s = scripts[i];
        if (s.src && s.src.match(/amazon_header\.js(\?.*)?/)) {
            param = s.src.replace(/.+\?/, '');
            break;
        }
    }
    params = param.split("&");
    var configs = new String;
    for (var i = 0; i < params.length; i++) {
        var value = params[i].split('=');
        if (value[0] === 'clientId') {
            gAmazonClientId = value[1];
        } else if (value[0] === 'sellerId') {
            gAmazonSellerId = value[1];
        }
    }
}

