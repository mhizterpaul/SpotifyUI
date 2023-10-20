/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ["i.scdn.co", 't.scdn.co', 'd1csarkz8obe9u.cloudfront.net'],
    }
}

module.exports = nextConfig

const options = { buildId: '',
   dev: false,
    isServer: false }
module.exports = {
  webpack: (config, options) => {
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
}