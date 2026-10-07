import { Link } from 'react-router-dom'
import { ArrowRight, Check, Lock, MapPin, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { RegionIcon } from '@/components/RegionIcon'
import { cn } from '@/lib/utils'
import { site } from '@/content/site'
import { currentSlug, weeks } from '@/content/weeks'
import type { Week } from '@/content/types'

type Status = 'done' | 'current' | 'locked'

const statusOf = (w: Week): Status => (!w.unlocked ? 'locked' : w.slug === currentSlug ? 'current' : 'done')

const weekLabel = (w: Week) => (w.week ? `Tuần ${w.week}` : 'Cuối kỳ')

function Node({ w, status }: { w: Week; status: Status }) {
  return (
    <div
      className={cn(
        'relative grid size-12 place-items-center rounded-full border-4 border-background shadow-sm',
        status === 'done' && 'bg-card text-primary ring-2 ring-primary/50',
        status === 'current' && 'bg-gold text-gold-foreground',
        status === 'locked' && 'bg-muted text-muted-foreground',
      )}
    >
      {status === 'current' && <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 motion-reduce:hidden" />}
      {status === 'locked' ? <Lock className="size-5" aria-hidden /> : <RegionIcon name={w.icon} className="size-5" />}
      {status === 'done' && (
        <span className="absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-full bg-added text-white ring-2 ring-background">
          <Check className="size-3" strokeWidth={3} aria-hidden />
        </span>
      )}
    </div>
  )
}

function RegionCard({ w, status }: { w: Week; status: Status }) {
  const body = (
    <>
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="text-muted-foreground uppercase tracking-wide">{weekLabel(w)}</span>
        {status === 'current' && (
          <span className="flex items-center gap-1 rounded-full bg-gold/20 px-2 py-0.5 text-gold-foreground dark:text-gold">
            <MapPin className="size-3" aria-hidden /> Bạn đang ở đây
          </span>
        )}
        {status === 'locked' && <span className="text-muted-foreground">· Chưa mở khóa</span>}
      </div>
      <h3 className="mt-1 text-lg font-bold">{w.region}</h3>
      <p className="text-sm font-medium text-primary dark:text-primary">{w.concept}</p>
      <p className={cn('mt-2 text-sm text-muted-foreground', status === 'locked' && 'italic')}>
        {status === 'locked' ? w.quest : w.feature}
      </p>
      {status !== 'locked' && (
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Vào vùng đất <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      )}
    </>
  )

  const base = 'block rounded-xl bg-card p-4 ring-1 ring-foreground/10'
  if (status === 'locked') return <div className={cn(base, 'opacity-75')}>{body}</div>
  return (
    <Link
      to={`/tuan/${w.slug}`}
      className={cn(
        base,
        'group transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        status === 'current' && 'ring-2 ring-gold/70',
      )}
    >
      {body}
    </Link>
  )
}

export function MapPage() {
  const unlocked = weeks.filter((w) => w.unlocked).length
  const current = weeks.find((w) => w.slug === currentSlug)

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <section className="py-12 text-center sm:py-16">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">{site.course}</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{site.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-muted-foreground">{site.subtitle}</p>

        <div className="mx-auto mt-8 max-w-sm">
          <div className="flex justify-between text-sm font-medium">
            <span>Tiến độ hành trình</span>
            <span className="text-muted-foreground">
              {unlocked}/{weeks.length} vùng đất
            </span>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={weeks.length}
            aria-valuenow={unlocked}
          >
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-gold" style={{ width: `${(unlocked / weeks.length) * 100}%` }} />
          </div>
        </div>

        {current && (
          <Link to={`/tuan/${current.slug}`} className={cn(buttonVariants({ size: 'lg' }), 'mt-8 h-11 px-5 text-base')}>
            <Sparkles aria-hidden /> Tiếp tục: {current.region}
          </Link>
        )}
      </section>

      {/* Con đường hành trình: dải đứt nét ở giữa (máy tính) hoặc bên trái (điện thoại) */}
      <ol className="relative">
        <div
          className="absolute top-6 bottom-6 left-6 border-l-2 border-dashed border-foreground/20 md:left-1/2 md:-translate-x-px"
          aria-hidden
        />
        {weeks.map((w, i) => {
          const status = statusOf(w)
          const left = i % 2 === 0
          return (
            <li key={w.slug} className="relative pb-8 pl-18 last:pb-0 md:grid md:grid-cols-2 md:pl-0">
              <div className="absolute top-2 left-0 md:left-1/2 md:-translate-x-1/2">
                <Node w={w} status={status} />
              </div>
              <div className={cn(left ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:pl-12')}>
                <RegionCard w={w} status={status} />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
