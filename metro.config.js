const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'];
const assetExts = ['glb', 'gltf', 'png', 'jpg'];
defaultConfig.resolver.sourceExts.push(...sourceExts);
defaultConfig.resolver.assetExts.push(...assetExts);

module.exports = defaultConfig;