module.exports = {
	module: {
		rules: [
			{
				test: /\.jsx?$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
				resolve: {
					extensions: ['.js', '.jsx'],
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true
						}
					}
				],
				include: /\.module\.css$/
			},
			{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
			},
			{
				test: /\.svg/,
				use: {
						loader: 'svg-url-loader',
						options: {}
				}
			}
		]
	}
};
