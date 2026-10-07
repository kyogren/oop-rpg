import { BookOpen, Castle, GraduationCap, Hammer, Swords, Tent, Trophy, type LucideProps } from 'lucide-react'
import type { RegionIcon as RegionIconName } from '@/content/types'

const icons = {
  village: Tent,
  castle: Castle,
  academy: GraduationCap,
  arena: Swords,
  forge: Hammer,
  library: BookOpen,
  trophy: Trophy,
}

export function RegionIcon({ name, ...props }: { name: RegionIconName } & LucideProps) {
  const Icon = icons[name]
  return <Icon aria-hidden {...props} />
}
