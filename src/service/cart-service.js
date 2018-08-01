/*
 * @Author: 琼歌先生 
 * @Date: 2018-07-31 10:53:35 
 * @Last Modified by: lastName.琼歌先生
 * @Last Modified time: 2018-07-31 11:12:12
 */
/*---------------------------------------------导入类---------------------------------------------------------*/
var _mm = require('util/mm.js');

/*---------------------------------------------导入类---------------------------------------------------------*/
var _cart={
    getCartCount: function (resolve, reject) {
     _mm.request({
       url: _mm.getServerUrl('/cart/listCart.do'),
       method: 'GET',
       success: resolve,
       error: reject
     });
   }

};

module.exports=_cart;