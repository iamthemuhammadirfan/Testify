module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
          '.ios.js',
          '.android.js',
          '.ios.ts',
          '.android.ts',
        ],
        alias: {
          hooks: './app/hooks',
          components: './app/components',
          constants: './app/constants',
          modules: './app/modules',
          router: './app/router',
          utils: './app/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
