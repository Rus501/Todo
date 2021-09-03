const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   devtool: 'inline-source-map',
   module: {
      rules: [
         {
           test:/\.(s*)css$/,
           exclude: /node_modules/,
           use: [ miniCss.loader, 
           {
            loader: 'css-loader',
            options: {
               url: false
            }
           },
              {
                 loader: 'postcss-loader',
                 options: {
                    postcssOptions: {
                       plugins: ['autoprefixer']
                    },
                 },
              },
              'sass-loader', ],
         },
         {
            test: /\.(png|jpg)$/,
            use: [
               'file-loader',
            ]
         },
      ],
   },
   plugins: [
      new miniCss({
         filename: 'style.css',
      })
   ],
};