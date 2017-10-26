/* ===================================================================
javascript information

File Name  : apple_payicon.js
Author     :
Style Info :
=================================================================== */

//****************************************************
// applepayアイコン制御
//****************************************************

var tag = document.createElement('style');
tag.type = "text/css";
document.getElementsByTagName('head').item(0).appendChild(tag);
var ss = document.styleSheets.item(document.styleSheets.length - 1);
ss.insertRule("i.apay{ display: none !important; }", 0);
if (window.ApplePaySession) {
  if (ApplePaySession.canMakePayments())
    ss.cssRules.item(0).style.removeProperty('display');
}
