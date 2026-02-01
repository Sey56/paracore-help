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
        'core-concepts/parameter-system',
      ],
    },

    {
      type: 'category',
      label: '✍️ Authoring',
      items: [
        'authoring/index',
        'authoring/gallery',
        'authoring/inspector',
        'authoring/ai-generation',
        'authoring/ai-debugging',
        'authoring/execution',
        'authoring/parameters',
        'authoring/presets',
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
      label: '📚 Tutorials',
      items: [
        'tutorials/index',
        'tutorials/hello-revit',
        'tutorials/hello-wall',
        'tutorials/parametric-floor',
        'tutorials/element-selection',
        'tutorials/multi-file-script',
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
};

export default sidebars;