import StyleDictionary, { Config } from 'style-dictionary';
import { expandTypesMap, register } from '@tokens-studio/sd-transforms';
import metadata from './tokens/$metadata.json' assert { type: 'json' };

register(StyleDictionary);

const modes = metadata.tokenSetOrder
  .filter((fileName) => fileName.includes('mapped/'))
  .map((fileName) => fileName.replace('mapped/', ''));

const configs: Config[] = metadata.tokenSetOrder
  .filter((fileName) => fileName.includes('alias'))
  .flatMap((fileName) => {
    return modes.map((mode) => {
      const destinationFileName = fileName
        .replace('alias/', '')
        .concat(`-${mode}`);
      return {
        log: {
          verbosity: 'verbose',
        },
        expand: {
          typesMap: expandTypesMap,
        },
        source:
          fileName === 'base'
            ? ['tokens/base.json']
            : [
                'tokens/base.json',
                `tokens/${fileName}.json`,
                `tokens/mapped/${mode}.json`,
                'tokens/component.json',
              ],
        preprocessors: ['tokens-studio'],
        buildPath: 'src/build/css/',
        platforms: {
          css: {
            transformGroup: 'tokens-studio',
            transforms: ['name/kebab'],
            buildPath: 'src/build/css/',
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
  });

configs.forEach(async (config) => {
  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
});
