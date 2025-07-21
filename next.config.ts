import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 remotePatterns: [
    {
      protocol: 'https',
      hostname: 'pbylxfkmoxfnmiayople.supabase.co',
      pathname: '/**',
    },
  ],
  reactStrictMode: false,
};

export default nextConfig;
