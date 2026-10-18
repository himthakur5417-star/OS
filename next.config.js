/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/vault/doc": [
        "./CDS mathematics/**/*",
        "./NDA mathematics/**/*",
        "./NDA CDS English/**/*",
        "./A2Z Vocabulary/**/*",
        "./Syllabus/**/*",
      ],
    },
  },
};

module.exports = nextConfig;
