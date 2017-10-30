/**
 * Created by houdong on 2017/10/30.
 */
const path = require('path');
module.exports = {
    entry:'./index.js',
    output:{
        path:path.join(__dirname,'./dist/build'),
        filename:'[name].js',
        publicPath:'/'
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [["import", [{
                        "libraryName": "material-ui",
                        "libraryDirectory": "components",  // default: lib
                        "camel2DashComponentName": false,  // default: true
                    }]]]
                }
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader',
            },
            {
                test:/\.less$/,
                loader:'style!css!less'
            },
        ]
    }
}