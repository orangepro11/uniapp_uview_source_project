<template>
  <view class=""> </view>
</template>

<script>
export default {
  methods: {
    WechatPay(config) {
      /**
       * @description: 唤起微信支付
       * @param {*} config: 要注入的配置，由后台给
       * @return {*} Promise
       */
      return new Promise((resolve, reject) => {
        uni.requestPayment({
          provider: "wxpay",
          ...config,
          success: () => {
            resolve('支付成功');
          },
          fail: (error) => {
            reject("支付失败，用户取消支付");
          },
          complete:(complete)=>{
            resolve('支付完成');
          },
        });
      });
    },
  },
};
</script>
