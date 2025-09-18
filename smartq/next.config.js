/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      // Allow all HTTPS domains only in development
      ...(process.env.NODE_ENV === 'development' ? [{
        protocol: 'https',
        hostname: '**',
      }] : []),
    ],
  },
  experimental: {
    // Allow cross-origin requests only in development
    ...(process.env.NODE_ENV === 'development' && {
      allowedDevOrigins: ['*'],
    }),
    serverActions: {
      allowedOrigins: process.env.NODE_ENV === 'development' ? ['*'] : [process.env.NEXTAUTH_URL || 'http://localhost:3000'],
    },
  },
}

module.exports = nextConfig