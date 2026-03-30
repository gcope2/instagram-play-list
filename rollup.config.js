import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig({
  outputDir: 'public'
});

export default {
  ...baseConfig,
  input: 'instagram-play-list.js',
};