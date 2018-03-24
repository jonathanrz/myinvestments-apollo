module.exports = {
  type: 'react-app',
  webpack: {
    publicPath: ''
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
      ]
    ]
  }
}
