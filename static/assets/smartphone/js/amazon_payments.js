/* ===================================================================
javascript information

File Name  : amazon_payments.js
Author     :
Style Info :
=================================================================== */

//****************************************************
// 初期表示制御
//****************************************************

// Amazonログインキーがある場合
if (isExistAmazonLoginKey()) {
    var paySelected = $('.tgl_radio[name="paySelected"]').val();
    if (paySelected != '7') {
        $('.tgl_elm[data-target="paySelect07"]').show();
    }
    showWalletWidget();
    if (paySelected != '7') {
        $('.tgl_elm[data-target="paySelect07"]').hide();
    }
}

// Amazonログインキーがない場合
if (!isExistAmazonLoginKey()) {
    showLoginWithAmazon();
}

//****************************************************
// PayWithAmazon
//****************************************************

function showWalletWidget() {
    $('.tgl_elm[data-target="payWithAmazon"]').show();
    $('.tgl_elm[data-target="loginWithAmazon"]').hide();
    new OffAmazonPayments.Widgets.Wallet({
        sellerId : gAmazonSellerId,
        design : {
            designMode : 'smartphoneCollapsible'
        },
        onOrderReferenceCreate : function(orderReference) {
            amazonOrderReferenceId = orderReference.getAmazonOrderReferenceId();
        },
        onPaymentSelect : function() {
            setAmazonOrderReferenceId(amazonOrderReferenceId);
        },
        onError : function(error) {
            // BuyerSessionExpired
            if (error.getErrorCode() == 'BuyerSessionExpired') {
                showLoginWithAmazon();
            }
        }
    }).bind('walletWidgetDiv');
}

//****************************************************
// LoginWithAmazon
//****************************************************

function showLoginWithAmazon() {
    $('.tgl_elm[data-target="payWithAmazon"]').hide();
    $('.tgl_elm[data-target="loginWithAmazon"]').show();
    var authRequest;
    OffAmazonPayments.Button('loginWithAmazon', gAmazonSellerId, {
        type : 'LwA',
        color : 'Gold',
        size : 'large',
        authorization : function() {
            loginOptions = {scope : 'profile payments:widget payments:shipping_address', popup : true};
            authRequest = amazon.Login.authorize(loginOptions);
        },
        onSignIn : function(orderReference) {
            showWalletWidget();
        },
        onError : function(error) {
            // On Error
        }
    });
}

//****************************************************
// Set OrderReferenceId
//****************************************************

function setAmazonOrderReferenceId(id) {
    $('#amazonOrderReferenceId').val(id);
}
