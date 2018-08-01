/*
 * @Author: 琼歌先生 
 * @Date: 2018-07-30 14:07:03 
 * @Last Modified by: lastName.琼歌先生
 * @Last Modified time: 2018-08-01 10:35:11
 */
//-----------------------------------------载入---------------------------------------------------------------
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，以此区分是dev / online环境，通过配置可以使得
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log("部署的环境:" + WEBPACK_ENV);

//------------------------------------------公共方法----------------------------------------------------------
 // 获取html-webpack-plugin参数的方法 
 var getHtmlConfig = function (name, title) {
   console.log("启动对象:getHtmlConfig 以设置统一参数");
   return {
     template: './src/view/' + name + '.html', //需要引入文件的html文件
     filename: 'view/' + name + '.html', //编译后的文件放置的位置
     favicon: './favicon.ico',
     title: title, //标题,被页面用webpack.option.title获取
     inject: true, //是否自动引入
     hash: true, //是否设置hash
     chunks: ['common', name] //引入的模块
   };
 };

 //-------------------------------------webpack config对象----------------------------------------------------
var config={
  entry: { //入口文件，配置需要访问的页面
    'common': './src/page/common/index.js',
    'index': './src/page/index/index.js',
    //'list': './src/page/list/index.js',
    //'detail': './src/page/detail/index.js',
    //'cart': './src/page/cart/index.js',
    //'order-confirm': './src/page/order-confirm/index.js',
    'order-list': './src/page/order-list/index.js',
    //'order-detail': './src/page/order-detail/index.js',
    //'payment': './src/page/payment/index.js',
    //'user-login': './src/page/user-login/index.js',
    //'user-register': './src/page/user-register/index.js',
    //'user-pass-reset': './src/page/user-pass-reset/index.js',
    'user-center': './src/page/user-center/index.js',
    //'user-center-update': './src/page/user-center-update/index.js',
    //'user-pass-update': './src/page/user-pass-update/index.js',
    'result': './src/page/result/index.js',
    'about': './src/page/about/index.js',
  },
  output: { //输出文件
    /* 
     * 【改动】：删除path的配置，在webpack4中文件默认生成的位置就是/dist,
     *  而publicPath和filename特性的设置要保留
     */
    // path        : __dirname + '/dist/',//存放文件时候的路径
    publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/MMALL_NEW/dist/', //访问文件时候的路径
    filename: 'js/[name].js'
  },
   externals: { //设置jquey模块,以后的jquery可以直接在页面引用
     'jquery': 'window.jQuery'
   },
   module:{//处理加载的样式
    rules: [ //以前的loader加载器字段换为rules字段,用来放各种文件的加载器
      
      // css文件的处理：css的加载方式
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ //用于抽离css到单独的模块中
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      
      // 模板文件的处理：文件的加载方式
      {
        test: /\.string$/,//添加项目中允许处理的数据格式
        use: {
          loader: 'html-loader',//安装依赖
          options: {
            minimize: true,
            removeAttributeQuotes: false
          }
        }
      },
     
      // 图片的配置：图片的加载方式和字体文件分开
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader', //图片的依赖，正常逻辑会生成一个base64的串部署在css中
          options: {
            /* 
             * 【改动】：图片小于2kb的按base64打包
             */
            limit: 2048, //小于该kb值会变成base64
            name: 'resource/[name].[ext]' //拓展名
          }
        }]
      },
      
      // 字体图标的配置：字体文件的加载方式变化
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/, //字体文件类型
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'resource/[name].[ext]'
          }
        }]
      }
      //追加位置
    ]
   },

   /**
    * 
    * 正常情况下，我们如果需要在js页面引用工具类，那么我们需要执行类似：
    * var _mm=require('../../../mm.js');
    * 这样的操作会使得页面出现很多的冗余， 并且很难看, 因此我们可以设置将某些页面路径给全局化resolve
    * 请求方式：require('util/mm.js'),require会自觉去匹配util的路径并自动内部补充
    */
   resolve: {
     alias: {
       node_modules: __dirname + '/node_modules', //指向当前路径，以后请求则变成
       util: __dirname + '/src/util',
       page: __dirname + '/src/page',
       service: __dirname + '/src/service',
       image: __dirname + '/src/image'
     }
   },

   /* 
    * 【新增】：webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面
    * npm install extract-text-webpack-plugin --save - dev 用于独立出css样式
    */
   optimization: {
     runtimeChunk: false,
     splitChunks: {
       cacheGroups: {
         common: {
           name: "common",
           chunks: "all",
           minChunks: 2
         }
       }
     }
   },
  plugins: [
    /* 
     * 【移除】：webpack4里面移除了commonChunksPulgin插件
     */
    // // 独立通用模块到js/base.js
    // new webpack.optimize.CommonsChunkPlugin({
    //     name : 'common',
    //     filename : 'js/base.js'
    // }),
    // 把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),//根据名字打包成不同的名称的css样式
    // html模板的处理:html-webpack-plugin的方法会使得,不用再页面在写引入css,而是由系统自己去追加
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
    //new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
    //new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    //new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
    //new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
    //new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
    //new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    //new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
    //new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
    //new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    //new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    //new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    //new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall')),
  ],
  /* 
   * 【新增】：在v1.0.1版本中新增了devServer的配置，用自带的代理就可以访问接口
   * npm install webpack-dev-server@1.16.5  安装好后，启动完可以快速跟随你后端的改变前端自动改变
   * 启动：webpack-dev-server --inline --port 8088
   * 如何访问：当项目启动会有供一个路径，我们根据路径访问则可以
   * 相当于:
   * if('dev'=='WEBPACK_ENV'){
   *       config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
   * }
   */
  devServer: {
    port: 8088,
    inline: true,
    proxy: {
      '**/*.do': {
        target: 'http://test.happymmall.com',
        changeOrigin: true
      }
    }
  }


};
module.exports=config;
