const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [
  [
    '@babel/preset-env',
    // Config for @babel/preset-env
    {
      // Example: Always transpile optional chaining/nullish coalescing
      // include: [
      //   /(optional-chaining|nullish-coalescing)/
      // ],
    }
  ],
  '@babel/preset-typescript'
];
module.exports = {
  plugins: [
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: false }]
  ],
  presets: process.env.NODE_ENV === 'development' ? devPresets : buildPresets
};
