import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro', // Our new intro.mdx

    {
      type: 'category',
      label: 'Quick Start (Core)',
      items: [
        'getting-started/installation',
        'getting-started/downloads',
      ],
    },
    {
      type: 'category',
      label: 'User Guide (Core)',
      items: [
        'user-guide/topbar',
        'user-guide/sidebar',
        'user-guide/script-gallery',
        'user-guide/script-inspector',
        'user-guide/script-execution',
        'user-guide/parameters-presets',
        'user-guide/parameters-v3',
        'user-guide/code-editing-with-vscode',
        'user-guide/script-categories-and-metadata',
        'user-guide/corescript-globals',
        'user-guide/corescript-vscode',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Features (Cloud & Teams)',
      items: [
        {
          type: 'category',
          label: 'AI & Agent',
          items: [
            'user-guide/ai-script-generation',
            'user-guide/agentic-automation',
          ]
        },
        {
          type: 'category',
          label: 'Collaboration & Teams',
          items: [
            'collaboration/index',
            'collaboration/user-roles',
            'collaboration/workspace-management',
            'collaboration/git-workflow-basics',
            'collaboration/workflow-enforcement',
          ]
        },
        {
          type: 'category',
          label: 'Admin Guide',
          items: [
            'admin-guide/index',
            'admin-guide/team-management',
            'admin-guide/registered-workspaces',
          ]
        }
      ],
    },

  ],
};

export default sidebars;