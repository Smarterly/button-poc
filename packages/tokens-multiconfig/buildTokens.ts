import StyleDictionary, { Config } from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import metadata from './tokens/$metadata.json' assert { type: 'json' };

register(StyleDictionary);

const configs: Config[] = metadata.tokenSetOrder.map((fileName) => {
  const destinationFileName = fileName.replace('alias/', '').replace('/', '-');
  return {
    log: {
      verbosity: 'verbose',
    },
    source:
      fileName === 'base'
        ? ['tokens/base.json']
        : ['tokens/base.json', `tokens/${fileName}.json`],
    preprocessors: ['tokens-studio'],
    buildPath: 'src/assets/css/',
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: 'src/assets/css/',
        files: [
          {
            destination: `${destinationFileName}.css`,
            format: 'css/variables',
          },
        ],
      },
    },
  };
});

configs.forEach(async (config) => {
  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
});
