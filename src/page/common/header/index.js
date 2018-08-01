/*
 * @Author: 琼歌先生 
 * @Date: 2018-07-30 22:11:21 
 * @Last Modified by: lastName.琼歌先生
 * @Last Modified time: 2018-07-31 17:07:50
 */
/*---------------------------------------------导入类---------------------------------------------------------*/
require('./index.css');
var _mm=require('util/mm.js');

/*---------------------------------------------逻辑类---------------------------------------------------------*/
//通用页面头部
var header={
  init :function(){/**初始化时候执行绑定的方法 */
      this.bindEvent();
  },
  onLoad:function(){
    var keyword=_mm.getUrlParam('keyword');
    //回填输入框
    if (keyword){
      $('#search-input').val(keyword);
    };
  },
  bindEvent: function () {
      var _this=this;
      //点击提交搜索按钮
      $('#search-btn').click(function () {
          _this.searchSubmit();
      });
      //输入后点击回车
      $('#search-input').keyup(function(e){
        if(e.keyCode==13){
           _this.searchSubmit();
        }
      });
  },
  searchSubmit:function(){
    alert('你好');
    var keyword=$.trim($('#search-input').val());
    if(keyword){
      //跳转向list页面，然后附加参数
      window.location.href='./list.html?keyword='+keyword;
    }else{//如果关键字为空，直接返回首页
      _mm.goHome();
    }
  }
};
header.init(); /*模块输出*/