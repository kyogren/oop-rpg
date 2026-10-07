import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Boxes,
  Code2,
  ExternalLink,
  FileText,
  Gift,
  Lock,
  ScrollText,
  Skull,
  Target,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClassBox, DiagramLegend } from '@/components/ClassDiagram'
import { CodeBlock } from '@/components/CodeBlock'
import { Markdown } from '@/components/Markdown'
import { RegionIcon } from '@/components/RegionIcon'
import { cn } from '@/lib/utils'
import { findWeek, weeks } from '@/content/weeks'
import { getCode, getWeekMarkdown } from '@/content/loaders'
import type { Week } from '@/content/types'
import { NotFoundPage } from './NotFoundPage'

function Section({ id, icon, title, children }: { id: string; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-4 flex items-center gap-2.5 text-xl font-bold">
        <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground [&_svg]:size-4.5">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function CodeFile({ path }: { path: string }) {
  const code = getCode(path)
  if (!code) return <p className="text-sm text-destructive">Không tìm thấy file code/{path}</p>
  return <CodeBlock code={code} filename={`code/${path}`} repoPath={`code/${path}`} />
}

function LockedPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-10 text-center text-muted-foreground">
      <Lock className="size-6" aria-hidden />
      <p className="max-w-sm text-sm">{children}</p>
    </div>
  )
}

function CodeSection({ w }: { w: Week }) {
  const tabs = [
    w.starterCode && { value: 'starter', label: 'Code bắt đầu' },
    w.solutionCode && { value: 'solution', label: 'Lời giải' },
  ].filter(Boolean) as { value: string; label: string }[]
  if (tabs.length === 0) return null

  const solution = w.solutionCode ? (
    w.solutionReleased ? (
      <CodeFile path={w.solutionCode} />
    ) : (
      <LockedPanel>Lời giải sẽ được mở sau buổi học. Hãy tự chiến đấu trước đã!</LockedPanel>
    )
  ) : null

  return (
    <Section id="code" icon={<Code2 />} title="Code">
      {tabs.length === 1 ? (
        w.starterCode ? <CodeFile path={w.starterCode} /> : solution
      ) : (
        <Tabs defaultValue={tabs[0].value}>
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="px-3">
                {t.label}
                {t.value === 'solution' && !w.solutionReleased && <Lock className="size-3.5" aria-hidden />}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="starter" className="mt-2">
            {w.starterCode && <CodeFile path={w.starterCode} />}
            <p className="mt-2 text-sm text-muted-foreground">Đây chính là lời giải của tuần trước, điểm xuất phát chung cho cả lớp.</p>
          </TabsContent>
          <TabsContent value="solution" className="mt-2">
            {solution}
          </TabsContent>
        </Tabs>
      )}
    </Section>
  )
}

function ExerciseSection({ w }: { w: Week }) {
  if (!w.exercises?.length) return null
  return (
    <Section id="bai-tap" icon={<Target />} title="Bài tập">
      <ul className="grid gap-3 sm:grid-cols-2">
        {w.exercises.map((e) => {
          const inner = (
            <>
              <div className="flex items-start gap-2">
                {e.boss && <Skull className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />}
                <h3 className="font-semibold">{e.title}</h3>
                {e.url && <ExternalLink className="mt-1 ml-auto size-3.5 shrink-0 text-muted-foreground" aria-hidden />}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
              {!e.url && !e.boss && <p className="mt-2 text-xs font-medium text-muted-foreground/80">Link Moodle sắp có</p>}
            </>
          )
          const cls = cn(
            'block h-full rounded-xl bg-card p-4 ring-1 ring-foreground/10',
            e.boss && 'bg-destructive/5 ring-destructive/30 sm:col-span-2',
          )
          return (
            <li key={e.title}>
              {e.url ? (
                <a href={e.url} target="_blank" rel="noreferrer" className={cn(cls, 'transition hover:ring-primary/40 hover:shadow-md')}>
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

function WeekNav({ w }: { w: Week }) {
  const i = weeks.indexOf(w)
  const prev = weeks[i - 1]
  const next = weeks[i + 1]
  const item = (target: Week, dir: 'prev' | 'next') => {
    const content = (
      <>
        <span className="text-xs text-muted-foreground">{dir === 'prev' ? 'Vùng trước' : 'Vùng tiếp theo'}</span>
        <span className={cn('flex items-center gap-1.5 font-semibold', dir === 'next' && 'justify-end')}>
          {dir === 'prev' && <ArrowLeft className="size-4" aria-hidden />}
          {target.region}
          {dir === 'next' && (target.unlocked ? <ArrowRight className="size-4" aria-hidden /> : <Lock className="size-4" aria-hidden />)}
        </span>
      </>
    )
    const cls = cn('flex flex-col gap-0.5 rounded-xl p-4 ring-1 ring-foreground/10', dir === 'next' && 'text-right sm:col-start-2')
    return target.unlocked ? (
      <Link to={`/tuan/${target.slug}`} className={cn(cls, 'bg-card transition hover:ring-primary/40')}>
        {content}
      </Link>
    ) : (
      <div className={cn(cls, 'opacity-60')}>{content}</div>
    )
  }
  return (
    <nav className="grid gap-3 sm:grid-cols-2" aria-label="Chuyển vùng đất">
      {prev && item(prev, 'prev')}
      {next && item(next, 'next')}
    </nav>
  )
}

export function WeekPage() {
  const { slug = '' } = useParams()
  const w = findWeek(slug)
  if (!w) return <NotFoundPage />

  const label = w.week ? `Tuần ${w.week}` : 'Cuối kỳ'
  const md = getWeekMarkdown(w.slug)

  return (
    <article className="mx-auto max-w-3xl px-4 pt-6 pb-16">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden /> Bản đồ
      </Link>

      <header className="mt-6 flex items-start gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <RegionIcon name={w.icon} className="size-7" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-balance">{w.region}</h1>
          <p className="mt-1 font-medium text-primary">{w.concept}</p>
          {w.reference && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <FileText className="size-4 shrink-0" aria-hidden /> {w.reference}
            </p>
          )}
        </div>
      </header>

      {!w.unlocked ? (
        <div className="mt-10">
          <LockedPanel>Vùng đất này chưa mở khóa. Hãy hoàn thành các vùng trước đó trên bản đồ!</LockedPanel>
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          <Section id="nhiem-vu" icon={<ScrollText />} title="Nhiệm vụ">
            <div className="rounded-xl border-l-4 border-gold bg-gold/10 p-5">
              <p className="leading-7 text-pretty">{w.quest}</p>
              <p className="mt-4 flex items-start gap-2 text-sm font-semibold">
                <Gift className="mt-0.5 size-4 shrink-0 text-gold-foreground dark:text-gold" aria-hidden />
                <span>
                  Phần thưởng: <span className="font-normal">{w.feature}</span>
                </span>
              </p>
            </div>
          </Section>

          {md && (
            <Section id="ky-nang" icon={<BookOpen />} title="Kỹ năng mới">
              <Markdown source={md} />
            </Section>
          )}

          {w.classes && (
            <Section id="so-do" icon={<Boxes />} title="Sơ đồ lớp">
              <DiagramLegend />
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {w.classes.map((c) => (
                  <ClassBox key={c.name} spec={c} />
                ))}
              </div>
            </Section>
          )}

          <CodeSection w={w} />
          <ExerciseSection w={w} />
        </div>
      )}

      <div className="mt-14">
        <WeekNav w={w} />
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
          Về bản đồ
        </Link>
      </div>
    </article>
  )
}
