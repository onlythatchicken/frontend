const Dotenv = require('dotenv-webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withSourceMaps(
  withBundleAnalyzer({
    compress: true,
    webpack: config => {
      let prod = process.env.NODE_ENV === 'production';
      config.plugins.push(new Dotenv({ silent: true }));
      config.mode = prod ? 'production' : 'development';

      return config;
    },
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 5,
    },
  }),
);
