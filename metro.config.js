const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  
  return {
    ...config,
    resolver: {
      ...config.resolver,
      sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx'],
      assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp']
    },
    transformer: {
      ...config.transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      })
    }
  };
})(); 