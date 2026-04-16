import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'spec-coding-skills',
  tagline:
    'Spec-driven skills for AI coding agents that plan with acceptance criteria, correct from feedback, and reuse project memory.',
  favicon: 'img/logo.svg',

  url: 'https://h2sxxa.github.io',
  baseUrl: '/spec-coding-skills/',

  organizationName: 'H2Sxxa',
  projectName: 'spec-coding-skills',

  onBrokenLinks: 'throw',
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'spec-coding-skills',
        url: 'https://h2sxxa.github.io/spec-coding-skills/',
        description:
          'Spec-driven skills for AI coding agents that plan with acceptance criteria, correct from feedback, and reuse project memory.',
      }),
    },
  ],
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
    image: 'img/og-card.svg',
    metadata: [
      {
        name: 'keywords',
        content:
          'ai agent skills, ai coding agents, codex skills, spec driven development, acceptance criteria, bdd, debugging workflow, project memory',
      },
      {
        property: 'og:type',
        content: 'website',
      },
    ],
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
