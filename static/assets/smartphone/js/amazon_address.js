/* ===================================================================
javascript information

File Name  : amazon_address.js
Author     : 
Style Info : 
=================================================================== */

showAddressBookWidget();

//****************************************************
// AddressBookWidget
//****************************************************

function showAddressBookWidget() {
    new OffAmazonPayments.Widgets.AddressBook({
        sellerId : gAmazonSellerId,
        design : {
            designMode : 'smartphoneCollapsible'
        },
        onOrderReferenceCreate : function(orderReference) {
            amazonOrderReferenceId = orderReference.getAmazonOrderReferenceId();
            setAmazonOrderReferenceId("");
            var element = document.getElementById('amazonAddressSelect');
            element.parentNode.className = "status02";
            element.disabled = true;
        },
        onAddressSelect : function() {
            setAmazonOrderReferenceId(amazonOrderReferenceId);
            var element = document.getElementById('amazonAddressSelect');
            element.parentNode.className = "";
            element.disabled = false;
        },
        onError : function(error) {
            setAmazonOrderReferenceId("");
            var element = document.getElementById('amazonAddressSelect');
            element.parentNode.className = "status02";
            element.disabled = true;
            // BuyerSessionExpired
            if (error.getErrorCode() == 'BuyerSessionExpired') {
                location.reload();
            }
        }
    }).bind('addressBookWidgetDiv');
}

//****************************************************
// Set OrderReferenceId
//****************************************************

function setAmazonOrderReferenceId(id) {
    $('#amazonOrderReferenceId').val(id);
}

//****************************************************
// 選択した住所で登録
//****************************************************

function preventDoubleClick() {
    var id = $('#amazonOrderReferenceId').val();
    if (id === undefined || id === null || id === "") {
        return false;
    }
    return submit();
}

//****************************************************
// 二重サブミット防止
//****************************************************

var g_lock = false;
function submit() {
    if (g_lock) {
        return false;
    }
    g_lock = true;
    document.frm.submit();
    return true;
}
