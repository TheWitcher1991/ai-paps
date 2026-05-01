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
}

export default nextConfig
