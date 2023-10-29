/** @type {import('next').NextConfig} */



module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    })
 
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.scdn.co',
        port: '',
        pathname: '/image/**',
      },
    ],
  }
}