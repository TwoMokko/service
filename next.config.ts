import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// output: 'export', // если без vercel статический сайт, простой хостинг
	sassOptions: {
		additionalData: `$var: red;`,
	},
	images: {
		// unoptimized: true, // если без vercel статический сайт, простой хостинг
		domains: ["40ad8e7c-peleton.s3.timeweb.cloud"], // для vercel (и оптимизации изображений)
		remotePatterns: [
			{
				protocol: "https",
				hostname: "40ad8e7c-peleton.s3.timeweb.cloud",
				// port: '', // можно удалить, если не используется
				// pathname: '/**', // раскомментируйте если нужны все пути
			},
		],
	},
	trailingSlash: true,
	// assetPrefix: process.env.NODE_ENV === 'production' ? '' : '', // если без vercel статический сайт, простой хостинг
};

export default nextConfig;
