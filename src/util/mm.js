/*
* @Author: 琼歌
* @Date:   2018-05-15 15:26:38
 * @Last Modified by: lastName.琼歌先生
 * @Last Modified time: 2018-07-31 11:12:56
*/

'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost : 'httP://www.cyq.com'
};

/*
 *工具类请求和传入数据的方式如下：
 *_mm.request({
 *    url    :'',
 *    type   :'',
 *    success:function(res){
 *    
 *    },
 *    error:function(err){}
 *}); 
 * 
 * 
 * 
 */
var _mm = {
    // 网络请求
    request : function(param){
        var _this = this;//对于内部的方法,相当于java直接的调用，此处把该页面的对象赋值给_this;
        $.ajax({
            type        : param.method  || 'get',//访问的类型
            url         : param.url     || '',//访问的连接
            dataType    : param.type    || 'json',//数据格式
            data        : param.data    || '',//传过去的参数
            success     : function(res){//请求成功
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录,与后端约定的
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){//请求失败，后台返回错误信息吗
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 获取服务器地址,获取后端接口地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    // 获取url参数,获取什么参数
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');//对url进行获取，匹配出key=value的模式
        var result  = window.location.search.substr(1).match(reg);//search就是url中问号之后的参数，包括问号
        return result ? decodeURIComponent(result[2]) : null; //result[2]则是value,decodeURIComponent为解码
    },
    // 渲染html模板
    /*
     *一般，而言传入的htmlTemplate都是携带{{xx}}参数的html代码对象，如var html='<div>{{da}}</div>'
     *data:{da:'123'}
     * _mm.renderHtml(html,data);
     * 模式如上：
     */
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),//初始化hogan组件并编译模板，需要在页面前端引入hogan对象
            result = template.render(data); //通过data将数据给返回到页面，在前端所传入的模板则可以，通过{{key}}来获取参数
        return result;
    },
    // 成功提示,提示方法
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);//去掉前后空格，并转化为字符串
        
        // 非空验证
        if('require' === type){//输入require的时候，则意味着是必须有值的
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);//以1开口，后面是10位
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);//邮箱格式验证，百度后自测，可以直接将正则复制到浏览器的console里面测试，支持js
        }
    },

    // 统一登录处理,统一的处理方法
    //redircet:encodeURIComponent(window.location.href);其中window.location.href是请求访问的当前页面，该操作是对该页面进行了重新新编码，redirect是重新传入的意思，也即是说处理完后会重新返回最初的页面
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    /**
     * 跳转会主页的方法
     */
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;