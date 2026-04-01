import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',

    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/index',
        'getting-started/installation',
        'getting-started/first-script',
        'getting-started/downloads',
      ],
    },

    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/index',
        'core-concepts/architecture',
        'core-concepts/script-types',
        'core-concepts/active-data-workflows',
      ],
    },

    {
      type: 'category',
      label: 'Fundamentals',
      link: { type: 'doc', id: 'fundamentals/index' },
      items: [
        'fundamentals/01-script-sources-and-structure',
        'fundamentals/02-creating-and-managing-scripts',
        'fundamentals/03-editing-scripts-in-vscode',
        'fundamentals/04-parameter-engine-params-class',
        'fundamentals/05-parameter-defaults-and-cache',
        'fundamentals/06-revit-vs-paracore-selection',
        'fundamentals/07-visual-query-builder',
        'fundamentals/08-structured-output-table',
        'fundamentals/09-paracore-sentinels',
        'fundamentals/10-paracore-repl',
        {
          type: 'category',
          label: 'Step-by-Step Exercises',
          collapsed: true,
          items: [
            'fundamentals/step-by-step/exercise-01',
            'fundamentals/step-by-step/exercise-02',
            'fundamentals/step-by-step/exercise-03',
            'fundamentals/step-by-step/exercise-04',
            'fundamentals/step-by-step/exercise-05',
            'fundamentals/step-by-step/exercise-06',
            'fundamentals/step-by-step/exercise-07',
            'fundamentals/step-by-step/exercise-08',
            'fundamentals/step-by-step/exercise-09',
            'fundamentals/step-by-step/exercise-10',
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'Script Authoring',
      items: [
        'authoring/index',
        'authoring/gallery',
        'authoring/inspector',
        'authoring/ai-generation',
        'authoring/ai-debugging',
        'authoring/execution',
        'authoring/presets',
        'authoring/query-builder',
        'authoring/metadata',
        'authoring/vscode',
      ],
    },
    {
      type: 'category',
      label: 'Interactive REPL',
      items: [
        'interactive-repl/index',
      ],
    },
    {
      type: 'category',
      label: 'Sentinels (Watchdogs)',
      items: [
        'sentinels/index',
        'sentinels/deployment',
        'sentinels/control-window',
      ],
    },

    {
      type: 'category',
      label: 'Tool Generator',
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
      label: 'Scripting Reference',
      items: [
        'scripting-reference/index',
        'scripting-reference/extension-methods',
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
      label: 'Enterprise (Roadmap)',
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
      label: 'Code Examples',
      link: { type: 'generated-index' },
      items: [
        'tutorials/examples/hello-revit',
        'tutorials/examples/hello-wall',
        'tutorials/examples/parametric-floor',
        'tutorials/examples/element-selection',
        'tutorials/examples/modular-projects',
      ],
    },
    {
      type: 'category',
      label: 'Revit API Fundamentals',
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
