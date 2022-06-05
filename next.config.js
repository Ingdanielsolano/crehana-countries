/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const nextConfig = {
  ...withImages(),
  reactStrictMode: true,
  images: {
    domains: ["countryflagsapi.com"],
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
