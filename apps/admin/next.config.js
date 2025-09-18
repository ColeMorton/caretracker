/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@caretracker/ui", "@caretracker/shared"],
}

module.exports = nextConfig