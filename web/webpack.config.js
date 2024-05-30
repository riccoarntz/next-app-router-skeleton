const webpackConfig = (config) => {
  // svg
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              {
                name: 'removeDimensions',
              },
            ],
          },
        },
      },
    ],
  });

  // camel-case style names from css modules
  config.module.rules
    .find(({ oneOf }) => !!oneOf)
    .oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
    .reduce((acc, { use }) => acc.concat(use), [])
    .forEach(({ options }) => {
      if (options.modules) {
        options.modules.exportLocalsConvention = 'camelCase';
      }
    });

  return config;
};

module.exports = webpackConfig;
