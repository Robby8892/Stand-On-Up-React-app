const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')

module.exports = {
	entry: './client/index.js',
	output: {
		filename: 'bundle.js'
	}
}