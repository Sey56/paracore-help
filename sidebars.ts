import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * One topic lives on exactly one page. Old URLs are kept as short redirect stubs,
 * but they are deliberately NOT listed here — the sidebar is the map of current docs.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',

    {
      type: 'category',
      label: 'Start here',
      items: [
        'getting-started/index',
        'getting-started/installation',
        'getting-started/downloads',
        'getting-started/first-script',
      ],
    },

    {
      type: 'category',
      label: 'Using the app',
      items: [
        'interactive-repl/index',
        'fundamentals/01-script-sources-and-structure',
        'fundamentals/03-editing-scripts-in-vscode',
        'scripting-reference/parameters',
        'fundamentals/07-visual-query-builder',
        'authoring/presets',
        'authoring/playlists',
        'sentinels/index',
        'tool-generator/index',
        {
          type: 'category',
          label: 'AI Assistant (Paracore-Gen)',
          items: [
            'ai-agent/index',
            'ai-agent/using-paracore-gen',
            'ai-agent/how-it-works',
          ],
        },
        'core-concepts/architecture',
      ],
    },

    {
      type: 'category',
      label: 'Extension Methods',
      link: { type: 'doc', id: 'extension-methods/index' },
      items: [
        'extension-methods/index',
        'extension-methods/parameter-accessors',
        'extension-methods/element-utilities',
        'extension-methods/door-window',
        'extension-methods/collection-queries',
        'extension-methods/collection-operations',
        'extension-methods/unit-helpers',
        'extension-methods/advanced',
      ],
    },

    {
      type: 'category',
      label: 'Scripting Reference',
      items: [
        'scripting-reference/index',
        'scripting-reference/globals',
        'scripting-reference/units',
        'scripting-reference/options',
        'scripting-reference/revit-elements',
        'scripting-reference/libraries',
      ],
    },

    'corescript-vscode/index',
    'release-notes',
    'support',
    'privacy',
  ],

  tutorialsSidebar: [
    'tutorials/index',
    'tutorials/the-repl',
    'tutorials/reading-the-model',
    'tutorials/parameters-deep-dive',
    'tutorials/tables-and-answers',
    'tutorials/creating-geometry',
    'tutorials/bulk-updates',
    'tutorials/types-vs-instances',
    'tutorials/doors-and-rooms',
    {
      type: 'category',
      label: 'Gallery Scripts',
      link: { type: 'doc', id: 'tutorials/more-automation' },
      items: [
        'tutorials/gallery-00-start-here',
        'tutorials/gallery-01-hello-wall',
        'tutorials/gallery-02-parameter-palette',
        'tutorials/gallery-03-pick-and-place',
        'tutorials/gallery-04-modular-scripts',
        'tutorials/gallery-05-units-and-conversions',
        'tutorials/gallery-06-dynamic-ui',
        'tutorials/gallery-07-file-io',
        'tutorials/gallery-08-multi-file',
      ],
    },
  ],
};

export default sidebars;
