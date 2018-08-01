/*
 * @Author: 琼歌先生 
 * @Date: 2018-07-31 17:54:52 
 * @Last Modified by: lastName.琼歌先生
 * @Last Modified time: 2018-08-01 10:16:05
 */
/*---------------------------------------------导入类---------------------------------------------------------*/
require('./index.css');
var _mm=require('util/mm.js');
var templateIndex = require('./index.string');
/*---------------------------------------------逻辑类---------------------------------------------------------*/
var navSide={
  option: {//作为一个对象传入，设置了名称与数组
    name: '',
    navList: [{
        name: 'user-center',
        desc: '个人中心',
        href: './user-center.html'
      },
      {
        name: 'order-list',
        desc: '我的订单',
        href: './order-list.html'
      },
      {
        name: 'user-pass-update',
        desc: '修改密码',
        href: './user-pass-update.html'
      },
      {
        name: 'about',
        desc: '关于系统',
        href: './about.html'
      }
    ]
  },
  init :function(option){/**初始化时候执行绑定的方法 */
    
    $.extend(this.option,option);/*第一个是对象里面的，第二个是被传入的,第一个会被第二个覆盖，合并选项*/
    this.renderNav();
  },
  //渲染导航菜单
  renderNav:function(){
    // 计算active数据
    for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true;
      }
    };
    // 渲染list数据
    /**
     * 模板是index.string,其中
     *{{# navList}} 
        ---------------------------------------------
        {{#isActive}} 
        <li class = "nav-item active" > 
        {{/isActive}} 
        ---------------------------------------------
        {{^isActive}}
        <li class = "nav-item" > 
        {{/isActive}}
        ---------------------------------------------
      < a class = "link" href = "{{href}}" > {{desc}} < /a> < /li >
      {{/navList}}
     * 
     * 
    */
    var navHtml = _mm.renderHtml(templateIndex, {
      navList: this.option.navList
    });
    // 把html放入容器
    $('.nav-side').html(navHtml);
  }
};
module.exports = navSide; /*模块输出*/