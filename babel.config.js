module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          lazyImports: true
        }
      ]
    ],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          "alias": {
            "~mobile": "./src",
            "~assets": "./assets"
          }
        },
      ],
      "react-native-reanimated/plugin",
    ],
  }
};