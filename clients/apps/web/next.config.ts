import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compress: true,
	reactStrictMode: true,
	generateEtags: true,
	skipProxyUrlNormalize: true,
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	crossOrigin: 'use-credentials',
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'stgau.ru',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				
			},
		],
	},
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
}

export default nextConfig
