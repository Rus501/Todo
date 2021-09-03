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
                  'css-loader',
                  {
                     loader: 'postcss-loader',
                     options: {
                        postcssOptions: {
                           plugins: ['autoprefixer']
                        },
                     },
                  },
                  'sass-loader',
                ],
         },
         {
            test: /\.(png|jpg)$/,
            type: 'asset/inline'
         },
      ],
   },
   plugins: [
      new miniCss({
         filename: 'style.css',
      })
   ],
};