import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow globe.gl CDN images if needed
  images: { unoptimized: true },
  // Transpile globe.gl (ESM package)
  transpilePackages: ['globe.gl', 'three'],
}

export default nextConfig
