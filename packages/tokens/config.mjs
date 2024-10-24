import StyleDictionary from 'style-dictionary';
import { expandTypesMap, register } from '@tokens-studio/sd-transforms';
import metadata from './src/tokens/$metadata.json' assert { type: 'json' };

register(StyleDictionary);

const modes = metadata.tokenSetOrder
  .filter((fileName) => fileName.includes('mapped/'))
  .map((fileName) => fileName.replace('mapped/', ''));

const configs = metadata.tokenSetOrder
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
            ? ['src/tokens/base.json']
            : [
                'src/tokens/base.json',
                `src/tokens/${fileName}.json`,
                `src/tokens/mapped/${mode}.json`,
                'src/tokens/component.json',
              ],
        preprocessors: ['tokens-studio'],
        buildPath: 'src/css/',
        platforms: {
          css: {
            transformGroup: 'tokens-studio',
            transforms: ['name/kebab'],
            buildPath: 'src/css/',
            files: [
              {
                destination: `${destinationFileName}.css`,
                format: 'css/variables',
                options: {
                  selector: `.${destinationFileName}`,
                },
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

export default configs;
