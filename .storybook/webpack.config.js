const path = require('path')

module.exports = {
    module: {
        loaders: [{
            test: /\.css?$/,
            loaders: [ 'style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'],
            include: path.resolve(__dirname, '../')
        }, {
            test: /\.(png|jpg|svg|eot|woff|woff2|ttf)$/,
            loader: 'file'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    postcss: [
        require('postcss-import'),
        require('postcss-cssnext')
    ]
}