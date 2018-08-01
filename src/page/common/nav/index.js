/*
 * @Author: 琼歌先生 
 * @Date: 2018-07-30 22:11:21 
 * @Last Modified by: lastName.琼歌先生
 * @Last Modified time: 2018-07-31 14:02:49
 */
/*---------------------------------------------导入类---------------------------------------------------------*/
require('./index.css');
var _mm=require('util/mm.js');
var _user = require('service/user-service.js'); 
var _cart = require('service/cart-service.js');
/*---------------------------------------------逻辑类---------------------------------------------------------*/
var nav={
  init :function(){/**初始化时候执行绑定的方法 */
      this.bindEvent();
      this.loadUserInfo();
      this.loadCartCount();
      return this;
  },
  bindEvent:function(){
    //登录点击事件---跳转
    $('.js-login').click(function(){
      _mm.doLogin();
    });
    //注册事件
    $('.js-register').click(function(){
       window.location.href = './register.html';//直接跳转
    });
    //退出事件
    $('.js-loginout').click(function () {
       _user.loginout(function(res){
          window.location.reload();//重新请求,并刷新页面
       },
       function (errMsg) {
          _mm.errorTips(errMsg);
       });
    });
  },
  //加载用户信息
  loadUserInfo:function(){
    _user.checklogin(function(res){
       $('.user not-login').hide().siblings('.user.login').show()//将user not-login给隐藏起来,同时查找同级的use login
       .find('.username').text(res.username);
    },
    function (errMsg) {
       //_mm.errorTips(errMsg);,检查失败保持原状
       //alert('检查登录失败,页面保持原状');
    });
  },
  loadCartCount:function(){
    _cart.getCartCount(function (res) {
        $('.nav .cart-cont').text(res||0);
      },
      function (errMsg) {
       $('.nav .cart-cont').text(0);
      });
  }
};
module.exports=nav.init();/*模块输出*/