// next.config.js
const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");


const nextConfig = {
  // your nextjs config
  cssModules: true
};
module.exports = withOffline(nextConfig);
