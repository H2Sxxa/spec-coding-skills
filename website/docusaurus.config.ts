import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'spec-coding-skills',
  tagline:
    'Plan with acceptance criteria, correct from feedback, and remember reusable project knowledge.',
  favicon: 'img/logo.svg',

  url: 'https://h2sxxa.github.io',
  baseUrl: '/spec-coding-skills/',

  organizationName: 'H2Sxxa',
  projectName: 'spec-coding-skills',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    navbar: {
      title: 'spec-coding-skills',
      logo: {
        alt: 'spec-coding-skills logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/docs/intro', label: 'Docs', position: 'left'},
        {to: '/docs/benchmark', label: 'Benchmark', position: 'left'},
        {
          href: 'https://github.com/H2Sxxa/spec-coding-skills',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Overview', to: '/docs/intro'},
            {label: 'Testing', to: '/docs/testing'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/H2Sxxa/spec-coding-skills'},
            {label: 'MIT License', href: 'https://github.com/H2Sxxa/spec-coding-skills/blob/main/LICENSE'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} spec-coding-skills.`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
