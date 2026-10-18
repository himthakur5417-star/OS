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
        "./PYQ/**/*",
        "./Syllabus/**/*",
      ],
    },
  },
  async rewrites() {
    return [
      {
        source: "/NDA%20mathematics/:path*",
        destination: "/api/vault/doc?file=NDA mathematics/:path*",
      },
      {
        source: "/NDA mathematics/:path*",
        destination: "/api/vault/doc?file=NDA mathematics/:path*",
      },
      {
        source: "/CDS%20mathematics/:path*",
        destination: "/api/vault/doc?file=CDS mathematics/:path*",
      },
      {
        source: "/CDS mathematics/:path*",
        destination: "/api/vault/doc?file=CDS mathematics/:path*",
      },
      {
        source: "/NDA%20CDS%20English/:path*",
        destination: "/api/vault/doc?file=NDA CDS English/:path*",
      },
      {
        source: "/NDA CDS English/:path*",
        destination: "/api/vault/doc?file=NDA CDS English/:path*",
      },
      {
        source: "/A2Z%20Vocabulary/:path*",
        destination: "/api/vault/doc?file=A2Z Vocabulary/:path*",
      },
      {
        source: "/A2Z Vocabulary/:path*",
        destination: "/api/vault/doc?file=A2Z Vocabulary/:path*",
      },
      {
        source: "/PYQ/:path*",
        destination: "/api/vault/doc?file=PYQ/:path*",
      },
      {
        source: "/Syllabus/:path*",
        destination: "/api/vault/doc?file=Syllabus/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
