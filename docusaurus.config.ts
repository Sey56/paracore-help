import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Paracore',
  tagline: 'Write a line, press Ctrl+Enter, read the answer — no compile step, no restart.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://sey56.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/paracore-help/',

  // GitHub pages deployment config.
  organizationName: 'Sey56',
  projectName: 'paracore-help',

  trailingSlash: false,
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Cache-Control',
        content: 'no-cache, no-store, must-revalidate',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Pragma',
        content: 'no-cache',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Expires',
        content: '0',
      },
    },
  ],

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Runs in the browser after the head scripts — see the file for why this is needed.
  clientModules: [require.resolve('./src/clientModules/gtagFallback.ts')],

  markdown: {
    mermaid: true,
  },
  // --- Search Plugin Configuration ---
  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcut: false,
      },
    ],
  ],
  // -----------------------------------
  // Old lesson routes are preserved as client-side redirects. The "This page has
  // moved" stubs were removed from docs/ so local search stops indexing empties.
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: ['/docs/ai-agent/mcp-server', '/docs/ai-agent/security'], to: '/docs/ai-agent' },
          { from: ['/docs/authoring/ai-generation'], to: '/docs/ai-agent' },
          { from: ['/docs/authoring/execution', '/docs/authoring/inspector', '/docs/fundamentals/10-paracore-repl', '/docs/fundamentals/step-by-step/10-step-by-step'], to: '/docs/interactive-repl' },
          { from: ['/docs/authoring', '/docs/authoring/gallery', '/docs/authoring/metadata', '/docs/core-concepts/script-types', '/docs/fundamentals/02-creating-and-managing-scripts', '/docs/fundamentals/step-by-step/01-step-by-step', '/docs/fundamentals/step-by-step/02-step-by-step'], to: '/docs/fundamentals/01-script-sources-and-structure' },
          { from: ['/docs/authoring/vscode', '/docs/fundamentals/step-by-step/03-step-by-step'], to: '/docs/fundamentals/03-editing-scripts-in-vscode' },
          { from: ['/docs/authoring/query-builder', '/docs/fundamentals/step-by-step/07-step-by-step'], to: '/docs/fundamentals/07-visual-query-builder' },
          { from: ['/docs/core-concepts/active-data-workflows', '/docs/fundamentals/08-structured-output-table', '/docs/fundamentals/step-by-step/08-step-by-step'], to: '/docs/tutorials/tables-and-answers' },
          { from: ['/docs/core-concepts'], to: '/docs/intro' },
          { from: ['/docs/fundamentals/04-parameter-engine-params-class', '/docs/fundamentals/05-parameter-defaults-and-cache', '/docs/fundamentals/step-by-step/04-step-by-step', '/docs/fundamentals/step-by-step/05-step-by-step'], to: '/docs/scripting-reference/parameters' },
          { from: ['/docs/fundamentals/06-revit-vs-paracore-selection', '/docs/fundamentals/step-by-step/06-step-by-step'], to: '/docs/tutorials/reading-the-model' },
          { from: ['/docs/releases/v3.0.2'], to: '/docs/release-notes' },
          { from: ['/docs/tool-generator/creating-tools', '/docs/tool-generator/distributing-tools', '/docs/tool-generator/overview', '/docs/tool-generator/security'], to: '/docs/tool-generator' },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-QEHWHWW12T',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Paracore',
      logo: {
        alt: 'Paracore Logo',
        src: '/img/paracore-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialsSidebar',
          position: 'left',
          label: 'Tutorials',
        },
        { to: '/docs/release-notes', label: 'Releases', position: 'right' },
        { to: '/docs/getting-started/downloads', label: 'Download', position: 'left' },
        { to: '/docs/support', label: 'Support', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Paras Codarch',
              href: 'https://github.com/Sey56',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@Codarch46',
            },
          ],
        },
        {
          title: 'Services',
          items: [
            {
              label: '🏗️ Custom Automation',
              href: 'mailto:codarch46@gmail.com?subject=Custom%20Revit%20Automation%20Inquiry',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Privacy Policy',
              to: '/docs/privacy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paras Codarch. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },

  } satisfies Preset.ThemeConfig,
};

export default config;
