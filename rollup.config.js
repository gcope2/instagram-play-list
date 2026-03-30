import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig({
  outputDir: 'public'
});

// Override to use consistent filename instead of hash
baseConfig.output.entryFileNames = 'instagram-play-list.js';
baseConfig.output.chunkFileNames = 'instagram-play-list-[name].js';
baseConfig.output.assetFileNames = 'instagram-play-list-[name][extname]';

export default {
  ...baseConfig,
  input: 'instagram-play-list.js',
};