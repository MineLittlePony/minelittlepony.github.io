export interface MenuEntry {
  name: string
  path: string
}

export const MenuEntries: MenuEntry[] = [
  { name: 'Home', path: '/' },
  { name: 'Installation', path: '/installation' },
  { name: 'Skinning', path: '/skinning' },
  { name: 'Tools', path: '/tools' },
  { name: 'FAQ', path: '/faq' },
  { name: 'About', path: '/about' },
]
