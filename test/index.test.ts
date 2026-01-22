import { LoadContext } from '@docusaurus/types';

import pluginGoatcounter from '../src/index';

describe('pluginGoatcounter', () => {
  it('It should error when the goatcounter-key is not set in themeConfig', () => {
    // Arrange
    const config = ({
      siteConfig: {
        themeConfig: {
          goatcounter: undefined,
        },
      },
    } as unknown) as LoadContext;

    // Act
    const handler = () => pluginGoatcounter(config);

    // Assert
    expect(handler).toThrowErrorMatchingInlineSnapshot(
      `[Error: You need to specify 'goatcounter' object in 'themeConfig' with 'code' field in it to use docusaurus-plugin-goatcounter]`
    );
  });

  it('It should error when the goatcounter key in themeConfig does not have the code field', () => {
    // Arrange
    const config = ({
      siteConfig: {
        themeConfig: {
          goatcounter: {
            code: undefined,
          },
        },
      },
    } as unknown) as LoadContext;

    // Act
    const handler = () => pluginGoatcounter(config);

    // Assert
    expect(handler).toThrowErrorMatchingInlineSnapshot(
      `[Error: You specified the \`goatcounter\` object in \`themeConfig\` but the \`code\` field was missing. Please add it.]`
    );
  });

  it('It should error when the value of the goatcounter "key" in themeConfig is not a string', () => {
    // Arrange
    const config = ({
      siteConfig: {
        themeConfig: {
          goatcounter: {
            code: {},
          },
        },
      },
    } as unknown) as LoadContext;

    // Act
    const handler = () => pluginGoatcounter(config);

    // Assert
    expect(handler).toThrowErrorMatchingInlineSnapshot(
      `[Error: You specified the \`goatcounter\` object in \`themeConfig\` but the \`code\` field should be a string.]`
    );
  });

  describe('Development', () => {
    // Store the original process.env, such that we can restore it after this test suite
    const env = { ...process.env };

    beforeEach(() => {
      process.env = { ...env };
      process.env.NODE_ENV = 'development';
    });

    afterAll(() => {
      // Restore the original process.env
      process.env = { ...env };
    });

    it('It should inject nothing', () => {
      // Arrange
      const config = ({
        siteConfig: {
          themeConfig: {
            goatcounter: {
              code: 'foo',
            },
          },
        },
      } as unknown) as LoadContext;

      // Act
      const result = pluginGoatcounter(config);

      // Assert
      expect(result?.injectHtmlTags?.({ content: undefined })).toBe(undefined);
      expect(result.name).toBe('docusaurus-plugin-goatcounter');
    });
  });

  describe('Production', () => {
    const env = { ...process.env };
    beforeEach(() => {
      process.env = { ...env };
      process.env.NODE_ENV = 'production';
    });

    afterAll(() => {
      process.env = { ...env };
    });

    it('It should inject script and preconnect link', () => {
      // Arrange
      const config = ({
        siteConfig: {
          themeConfig: {
            goatcounter: {
              code: 'foo',
            },
          },
        },
      } as unknown) as LoadContext;

      // Act
      const result = pluginGoatcounter(config);

      // Assert
      expect(result?.injectHtmlTags?.({ content: undefined }))
        .toMatchInlineSnapshot(`
          {
            "headTags": [
              {
                "attributes": {
                  "href": "https://foo.goatcounter.com",
                  "rel": "preconnect",
                },
                "tagName": "link",
              },
              {
                "attributes": {
                  "async": true,
                  "data-goatcounter": "https://foo.goatcounter.com/count",
                  "src": "//gc.zgo.at/count.js",
                },
                "tagName": "script",
              },
            ],
          }
        `);
      expect(result.name).toBe('docusaurus-plugin-goatcounter');
    });
  });
});
