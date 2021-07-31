let mix = require('laravel-mix');

mix.js('src/app.js', 'dist')
	.webpackConfig({
		module: {
			rules: [
				{
					test: /\.(glsl|vs|fs|vert|frag)$/,
					exclude: /node_modules/,
					use: [
						'raw-loader',
						'glslify-loader'
					]
				}
			]
		}
	})
	.setPublicPath('dist');