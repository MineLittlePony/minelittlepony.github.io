import { getComponent } from '@/scripts/components/Component'
import { Tools } from '@/scripts/components/tools/Tools'

document.addEventListener('DOMContentLoaded', () => {
  getComponent(Tools)
}, { once: true })
