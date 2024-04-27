export interface NavigationInfo {
  href: string;
  title: string;
  description: string;
}

export const Navigation: Record<string, NavigationInfo[]> = {
  installation: [
    {
      href: '/installation/',
      title: 'Vanilla',
      description: 'Go to instructions for vanilla launcher',
    },
    {
      href: '/installation/prismlauncher/',
      title: 'Prism Launcher',
      description: 'Go to instructions for Prism Launcher',
    },
    {
      href: '/installation/legacy/',
      title: 'LiteLoader',
      description: 'Go to instructions for installing LiteLoader version',
    },
  ],
};
