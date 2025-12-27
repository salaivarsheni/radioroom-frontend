/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },

  typescript: {
    ignoreBuildErrors: true
  },

  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  },

  images: {
    domains: ['flagcdn.com']
  },

  transpilePackages: [
    'react-syntax-highlighter',
    '@mui/x-date-pickers'
  ]
};

module.exports = nextConfig;
