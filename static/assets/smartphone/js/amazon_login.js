/* ===================================================================
javascript information

File Name  : amazon_login.js
Author     : 
Style Info : 
=================================================================== */

var redirectUrl = getRedirectUrl();

//****************************************************
// 初期表示制御
//****************************************************
// 2017/02/13 S.Hasegawa #21558 Amazonログインボタンをカート画面に表示する ADD START
if ($('#container').hasClass('order_cart_disp') && !redirectUrl) {
    type = 'PwA';
    size = 'x-large';
} else {
	type = 'LwA';
    size = 'large';
}
// 2017/02/13 S.Hasegawa #21558 Amazonログインボタンをカート画面に表示する ADD END

showLoginWithAmazon();

//****************************************************
// LoginWithAmazon
//****************************************************

function showLoginWithAmazon() {
    var authRequest;
    OffAmazonPayments.Button('loginWithAmazon', gAmazonSellerId, {
        // 2017/02/13 S.Hasegawa #21558 Amazonログインボタンをカート画面に表示する MOD START
        // type : 'LwA',
        // color : 'Gold',
        // size : 'large',
        type : type,
        color : 'Gold',
        size : size,
        // 2017/02/13 S.Hasegawa #21558 Amazonログインボタンをカート画面に表示する MOD END
        authorization : function() {
            loginOptions = {scope: 'profile payments:widget payments:shipping_address', popup: true};
            authRequest = amazon.Login.authorize (loginOptions, redirectUrl);
        },
        onSignIn : function(orderReference) {
            // on sign in
            // 2017/01/30 S.Hasegawa #21558 Amazonログインボタンをカート画面に表示する ADD START
            if ($('#container').hasClass('order_cart_disp') && !redirectUrl) {
                $("#button").addClass("closed");
                $(':hidden[name="couponCode"]').val($('#couponCode').val());
                $(':hidden[name="amazonPayFlg"]').val("1");
                $('#cartDispForm').attr('action', $('#cartDispForm').attr('action'));
                $("#next_submit").click();
            }
            // 2017/01/30 S.Hasegawa #21558 Amazonログインボタンをカート画面に表示する ADD END
        },
        onError : function(error) {
            // your error handling code
        }
    });
}

//****************************************************
// RedirectUrl
//****************************************************

function getRedirectUrl() {
    var redirectUrl = null;
    var scripts = document.getElementsByTagName("script");
    var param = null;
    for (var i = 0; i < scripts.length; i++) {
        var s = scripts[i];
        if (s.src && s.src.match(/amazon_login\.js(\?.*)?/)) {
            param = s.src.replace(/.+\?/, '');
            break;
        }
    }
    params = param.split("&");
    var configs = new String;
    for (var i = 0; i < params.length; i++) {
        var value = params[i].split('=');
        if (value[0] === 'redirect') {
            redirectUrl = value[1];
            break;
        }
    }
    return redirectUrl;
}

