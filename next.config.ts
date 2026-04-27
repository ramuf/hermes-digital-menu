import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
};

export default createNextIntlPlugin({ requestConfig: './src/i18n.ts' })(nextConfig as any);
