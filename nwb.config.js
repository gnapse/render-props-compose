module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'RenderProps',
      externals: {
        react: 'React',
      },
    },
  },
};
