/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    serverComponentsExternalPackages: ["firebase-admin"],
    outputFileTracingIncludes: {
      "/api/vault/doc": [
        "./CDS mathematics/**/*",
        "./NDA mathematics/**/*",
        "./NDA CDS English/**/*",
        "./A2Z Vocabulary/**/*",
        "./PYQ/**/*",
        "./Syllabus/**/*",
      ],
    },
  },
  async redirects() {
    return [
      {
        source: "/programs/defense",
        destination: "/programs/defence",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
