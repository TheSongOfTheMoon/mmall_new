/*
 * @Author: 琼歌先生 
 * @Date: 2018-07-31 09:51:42 
 * @Last Modified by: lastName.琼歌先生
 * @Last Modified time: 2018-07-31 11:12:25
 */
/*---------------------------------------------导入类---------------------------------------------------------*/
 var _mm=require('util/mm.js');

 /*--------------------------------------------逻辑类---------------------------------------------------------*/
 var _user={
   loginout:function(resolve,reject){
     _mm.request({
         url      : _mm.getServerUrl('/user/loginout.do'),
         method   : 'GET',
         success  :resolve,
         error    :reject   
     });
   },
   checklogin: function (resolve, reject) {
     _mm.request({
       url: _mm.getServerUrl('/user/get_user_info.do'),
       method: 'GET',
       success: resolve,
       error: reject
     });
   }

 }

module.exports=_user;
