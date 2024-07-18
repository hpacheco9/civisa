module.exports = function (api) {
  api.cache(true);

  const presets = ["babel-preset-expo"];
  const plugins = [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
    "react-native-iconify/plugin",
  ];

  return {
    presets,
    plugins,
  };
};
