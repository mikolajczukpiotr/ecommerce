/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media3.giphy.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "correct-acoustics-cb3eb839ab.media.strapiapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
