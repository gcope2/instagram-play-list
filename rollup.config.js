import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

export default {
  ...baseConfig,
  input: 'instagram-play-list.js',
};