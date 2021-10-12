function isWechat() {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/micromessenger/i) != null;
}

function pay(data, cb) {
  function onBridgeReady() {
    WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res) => {
      cb(res);
    });
  }

  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
}

export default { isWechat, pay };
