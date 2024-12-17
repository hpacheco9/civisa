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
    [
      'react-native-iconify/babel',
      {
        icons: [
          'material-symbols:notifications-outline-rounded',
          'mdi:user-outline',
          'mdi:logout',
          'material-symbols:checklist-rtl-rounded',
          'material-symbols:format-list-bulleted-rounded',
          'material-symbols:globe',
          'material-symbols:brightness-alert-outline-rounded',
          'material-symbols:newspaper-rounded',
          'material-symbols:format-list-numbered-rounded',
          'material-symbols:dictionary-outline-rounded',
          'material-symbols:chat-info-outline-rounded',
          'material-symbols:earthquake-rounded',
          'material-symbols:volcano-outline-rounded',
          'material-symbols:question-mark-rounded',
          'material-symbols:arrow-back-ios-rounded',
          'ph:calendar-light',
          'ph:clock-light',
        ],
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
