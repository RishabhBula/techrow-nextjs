/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: '/',
  },
  trailingSlash: true
}

module.exports = nextConfig
