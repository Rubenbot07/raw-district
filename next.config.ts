import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {    
    remotePatterns: [
       {
         protocol: 'https',
         hostname: 'pbylxfkmoxfnmiayople.supabase.co',
         pathname: '/**',
       },
     ],
  },
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
