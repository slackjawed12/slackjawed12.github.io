const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'export',
};

module.exports = withContentlayer(nextConfig);
