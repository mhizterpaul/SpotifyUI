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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thisis-images.spotifycdn.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https', 
        hostname: "image-cdn-ak.spotifycdn.com",
        port: '',
        pathname: '/**'
      }
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  }
}
