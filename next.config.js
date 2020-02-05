// next.config.js
const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");


const nextConfig = {
  // your nextjs config
  cssModules: true
};
// module.exports = withOffline(nextConfig);


const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withOffline(nextConfig);
  }

  return withCSS(nextConfig)
};