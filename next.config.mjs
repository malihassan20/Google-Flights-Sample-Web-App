/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'content.skyscnr.com',
            port: '',
            pathname: '/m/3719e8f4a5daf43d/original/**',
          },
        ],
      },
    
};

export default nextConfig;
