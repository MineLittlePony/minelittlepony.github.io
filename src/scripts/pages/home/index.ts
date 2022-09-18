import { getComponent } from '@/scripts/components/Component'
import { Hero } from '@/scripts/components/home/Hero'

document.addEventListener('DOMContentLoaded', () => {
  getComponent(Hero)
}, { once: true })
