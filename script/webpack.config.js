const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectBodyPlugin = require('inject-body-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = !!process.env.PRODUCTION;

function _r(pathname) {
  return path.resolve(__dirname, pathname);
}
function getStyleLoaders() {
  return [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
      },
    },
  ];
}
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: _r('../src/index.tsx'),
  output: {
    filename: '[name].[contenthash].js',
    path: _r('../dist'),
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: isProd
    ? {}
    : {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
      {
        test: /\.tsx$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.less$/,
        use: getStyleLoaders(false),
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: _r('../public/index.html'),
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new InjectBodyPlugin({
      content: isProd
        ? ''
        : ['react/umd/react.development.js', 'react-dom/umd/react-dom.development.js'].map(
            (lib) => `<script src="/node_modules/${lib}"></script>`,
          ),
      position: 'start',
    }),
  ],
  devServer: {
    compress: false,
    allowedHosts: 'all',
    port: Number(process.env.PORT || 8080),
    static: [_r('../public'), _r('../node_modules')],
    open: true,
    onBeforeSetupMiddleware: function (devServer) {
      devServer.app.use(function (req, res, next) {
        if (req.url.startsWith('/node_modules/')) {
          req.url = req.url.slice(14);
        }
        console.log(req.url);
        next();
      });
    },
  },
};
