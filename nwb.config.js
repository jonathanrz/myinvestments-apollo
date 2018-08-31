module.exports = {
  type: 'react-app',
  webpack: {
    publicPath: '',
    define: {
      __MYINVESTMENTS_API__: JSON.stringify(process.env.MYINVESTMENTS_API)
    }
  },
  babel: {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            app: './src'
          }
        }
      ],
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
    ]
  },
  karma: {
    testContext: 'enzyme.js',
    extra: {
      captureConsole: true
    }
  }
}
