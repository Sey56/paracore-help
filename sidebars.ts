import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',

    {
      type: 'category',
      label: '🚀 Getting Started',
      items: [
        'getting-started/index',
        'getting-started/installation',
        'getting-started/first-script',
        'getting-started/downloads',
      ],
    },

    {
      type: 'category',
      label: '🧠 Core Concepts',
      items: [
        'core-concepts/index',
        'core-concepts/architecture',
        'core-concepts/script-types',
      ],
    },

    {
      type: 'category',
      label: '✒️ Authoring',
      items: [
        'authoring/index',
        'authoring/gallery',
        'authoring/inspector',
        'authoring/ai-generation',
        'authoring/ai-debugging',
        'authoring/execution',
        'authoring/presets',
        'authoring/query-builder',
        'authoring/sentinels',
        'authoring/metadata',
        'authoring/vscode',
      ],
    },

    {
      type: 'category',
      label: '🛠️ Tool Generator',
      items: [
        'tool-generator/index',
        'tool-generator/overview',
        'tool-generator/creating-tools',
        'tool-generator/distributing-tools',
        'tool-generator/security',
      ],
    },

    {
      type: 'category',
      label: '📖 Scripting Reference',
      items: [
        'scripting-reference/index',
        'scripting-reference/globals',
        'scripting-reference/parameters',
        'scripting-reference/units',
        'scripting-reference/options',
        'scripting-reference/revit-elements',
        'scripting-reference/libraries',
      ],
    },

    {
      type: 'category',
      label: '🏢 Enterprise (Roadmap)',
      items: [
        'enterprise/index',
      ],
    },

    'release-notes',
    'support',
    'privacy',
  ],

  // NEW: Dedicated Tutorials Sidebar
  tutorialsSidebar: [
    'tutorials/index',
    {
      type: 'category',
      label: '🌟 Paracore Fundamentals',
      link: { type: 'generated-index' },
      items: [
        'tutorials/fundamentals/hello-revit',
        'tutorials/fundamentals/hello-wall',
        'tutorials/fundamentals/parametric-floor',
        'tutorials/fundamentals/element-selection',
        'tutorials/fundamentals/multi-file-script',
      ],
    },
    {
      type: 'category',
      label: '🏗️ Revit API Fundamentals',
      link: { type: 'generated-index' },
      items: [
        'tutorials/revit-api/reading-the-model',
        'tutorials/revit-api/parameters-deep-dive',
        'tutorials/revit-api/conditional-logic',
        'tutorials/revit-api/bulk-updates',
        'tutorials/revit-api/types-vs-instances',
      ],
    },
  ],
};

export default sidebars;
