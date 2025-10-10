import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro', // Our new intro.mdx

    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/first-login',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'user-guide/topbar',
        'user-guide/sidebar',
        'user-guide/script-gallery',
        'user-guide/script-inspector',
        'user-guide/code-editing',
        'user-guide/script-execution',
        'user-guide/parameters-presets',
      ],
    },
    {
      type: 'category',
      label: 'Collaboration',
      items: [
        'collaboration/index', // Overview
        'collaboration/user-roles',
        'collaboration/workspace-management',
        'collaboration/git-workflow-basics',
        'collaboration/workflow-enforcement',
      ],
    },
    {
      type: 'category',
      label: 'Admin Guide',
      items: [
        'admin-guide/index', // Introduction
        'admin-guide/team-management',
        'admin-guide/registered-workspaces',
      ],
    },
  ],
};

export default sidebars;