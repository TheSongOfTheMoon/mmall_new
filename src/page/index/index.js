/*
 * @Author: 琼歌先生 
 * @Date: 2018-07-30 15:01:03 
 * @Last Modified by: lastName.琼歌先生
 * @Last Modified time: 2018-08-01 10:21:48
 */
//require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');//相关页面会嵌套到改js页面对应的主页，必须要维护js才会生效
var navSide=require('page/common/nav-side/index.js');
var _mm=require('util/mm.js');
navSide.init({
  name: 'order-list'
});