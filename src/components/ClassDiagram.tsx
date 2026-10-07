import { cn } from '@/lib/utils'
import type { Change, ClassSpec, Member } from '@/content/types'

const changeStyle: Record<Change, { row: string; label: string; badge: string }> = {
  new: { row: 'border-added bg-added/10', label: 'mới', badge: 'bg-added/15 text-added' },
  changed: { row: 'border-changed bg-changed/10', label: 'sửa', badge: 'bg-changed/15 text-changed' },
}

function MemberRow({ m }: { m: Member }) {
  const c = m.change ? changeStyle[m.change] : null
  return (
    <li className={cn('flex items-start gap-2 border-l-2 border-transparent px-3 py-1.5', c?.row)}>
      <span
        className={cn('w-3 shrink-0 text-center font-bold', m.vis === '+' ? 'text-added' : 'text-destructive')}
        title={m.vis === '+' ? 'public' : m.vis === '-' ? 'private' : 'protected'}
      >
        {m.vis}
      </span>
      <span className="min-w-0 flex-1 break-words">{m.text}</span>
      {c && (
        <span className={cn('shrink-0 rounded px-1.5 py-px font-sans text-[11px] font-semibold', c.badge)}>
          {c.label}
        </span>
      )}
    </li>
  )
}

export function ClassBox({ spec }: { spec: ClassSpec }) {
  return (
    <div
      className={cn(
        'w-full max-w-md overflow-hidden rounded-xl bg-card font-mono text-[13px] ring-1 ring-foreground/15',
        spec.change === 'new' && 'ring-2 ring-added/60',
      )}
    >
      <div className="bg-primary px-3 py-2 text-center font-bold text-primary-foreground">{spec.name}</div>
      <ul className="divide-y divide-transparent py-1.5">
        {spec.attributes.map((m) => (
          <MemberRow key={m.text} m={m} />
        ))}
      </ul>
      <ul className="border-t border-dashed border-foreground/20 py-1.5">
        {spec.methods.map((m) => (
          <MemberRow key={m.text} m={m} />
        ))}
      </ul>
    </div>
  )
}

export function DiagramLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <b className="font-mono text-added">+</b> public
      </span>
      <span className="flex items-center gap-1.5">
        <b className="font-mono text-destructive">-</b> private
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded-sm border-l-2 border-added bg-added/20" /> thêm mới tuần này
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded-sm border-l-2 border-changed bg-changed/20" /> sửa so với tuần trước
      </span>
    </div>
  )
}
