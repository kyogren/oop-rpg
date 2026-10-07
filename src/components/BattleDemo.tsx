import { useEffect, useMemo, useState } from 'react'
import { Swords } from 'lucide-react'
import { cn } from '@/lib/utils'
import { prefersReducedMotion, useInView } from '@/lib/motion'
import { DRAGON, HERO, PixelSprite } from './PixelSprite'

type Side = 'hero' | 'dragon'

interface Fighter {
  name: string
  hp: number
  patk: number
  def: number
  speed: number
}

// Cùng chỉ số với main() trong code/week04/main.cpp
const FIGHTERS: Record<Side, Fighter> = {
  hero: { name: 'Hero', hp: 100, patk: 20, def: 5, speed: 10 },
  dragon: { name: 'Dragon', hp: 150, patk: 25, def: 8, speed: 7 },
}

interface Hit {
  attacker: Side
  damage: number
  hpAfter: number
}

// Mô phỏng trận đấu theo đúng luật tuần 4: ai nhanh đánh trước, sát thương = max(1, PAtk - Def)
function simulate(): Hit[] {
  const hp = { hero: FIGHTERS.hero.hp, dragon: FIGHTERS.dragon.hp }
  let attacker: Side = FIGHTERS.dragon.speed > FIGHTERS.hero.speed ? 'dragon' : 'hero'
  const hits: Hit[] = []
  while (true) {
    const defender: Side = attacker === 'hero' ? 'dragon' : 'hero'
    const damage = Math.max(1, FIGHTERS[attacker].patk - FIGHTERS[defender].def)
    hp[defender] = Math.max(0, hp[defender] - damage)
    hits.push({ attacker, damage, hpAfter: hp[defender] })
    if (hp[defender] === 0) return hits
    attacker = defender
  }
}

const other = (s: Side): Side => (s === 'hero' ? 'dragon' : 'hero')

// idle -> lunge (lao tới) -> hit (trúng đòn) -> idle lượt sau ... -> end -> chơi lại
type Phase = 'idle' | 'lunge' | 'hit' | 'end'
const DELAY: Record<Phase, number> = { idle: 650, lunge: 230, hit: 650, end: 3000 }

function HpBar({ side, hp }: { side: Side; hp: number }) {
  const max = FIGHTERS[side].hp
  const pct = (hp / max) * 100
  return (
    <div className={cn('w-full max-w-36', side === 'dragon' && 'ml-auto')}>
      <div className={cn('flex items-baseline justify-between gap-2 text-xs font-bold text-white', side === 'dragon' && 'flex-row-reverse')}>
        <span>{FIGHTERS[side].name}</span>
        <span className="font-mono font-normal text-white/80 tabular-nums">
          {hp}/{max}
        </span>
      </div>
      <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-black/40 ring-1 ring-white/20">
        <div
          className={cn(
            'h-full rounded-full transition-[width,background-color] duration-500 ease-out',
            pct > 50 ? 'bg-emerald-400' : pct > 25 ? 'bg-amber-400' : 'bg-red-500',
            side === 'dragon' && 'ml-auto',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function BattleDemo({ className }: { className?: string }) {
  const hits = useMemo(simulate, [])
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, rootMargin: '0px' })
  const [still] = useState(prefersReducedMotion)
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')

  const running = visible && !still

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => {
      if (phase === 'idle') setPhase('lunge')
      else if (phase === 'lunge') setPhase('hit')
      else if (phase === 'hit') {
        if (hits[i].hpAfter === 0) setPhase('end')
        else {
          setI(i + 1)
          setPhase('idle')
        }
      } else {
        setI(0)
        setPhase('idle')
      }
    }, DELAY[phase])
    return () => clearTimeout(t)
  }, [running, phase, i, hits])

  // HP hiện tại suy ra từ các đòn đã trúng
  const landed = phase === 'hit' || phase === 'end' ? i + 1 : i
  const hp = { hero: FIGHTERS.hero.hp, dragon: FIGHTERS.dragon.hp }
  for (const h of hits.slice(0, landed)) hp[other(h.attacker)] = h.hpAfter

  const current = hits[i]
  const lunging = phase === 'lunge' ? current.attacker : null
  const struck = phase === 'hit' ? other(current.attacker) : null
  const winner = phase === 'end' ? current.attacker : null
  const loser = winner ? other(winner) : null

  const log =
    landed === 0
      ? `${FIGHTERS.hero.name} nhanh hơn (Speed ${FIGHTERS.hero.speed} > ${FIGHTERS.dragon.speed}), ra đòn trước!`
      : (() => {
          const h = hits[landed - 1]
          return `${FIGHTERS[h.attacker].name} đánh ${FIGHTERS[other(h.attacker)].name} ${h.damage} sát thương`
        })()

  const fighter = (side: Side) => (
    <div className="relative flex flex-col items-center">
      {/* Số sát thương bay lên; key đổi theo lượt để animation chạy lại */}
      {struck === side && (
        <span
          key={i}
          className="pointer-events-none absolute -top-4 left-1/2 animate-float-up font-mono text-2xl font-extrabold text-red-400 [text-shadow:0_2px_0_#000]"
        >
          -{current.damage}
        </span>
      )}
      <div
        className={cn(
          'transition-transform duration-200 ease-out',
          lunging === side && (side === 'hero' ? 'translate-x-6' : '-translate-x-6'),
        )}
      >
        {/* Mỗi animation một lớp bọc riêng để không ghi đè thuộc tính animation của nhau */}
        <div className={cn(!still && !loser && 'animate-bob')} style={side === 'dragon' ? { animationDelay: '0.4s' } : undefined}>
          <div
            className={cn(
              'transition-[filter,opacity] duration-300',
              struck === side && 'animate-shake brightness-200 saturate-50',
              loser === side && 'opacity-50 grayscale',
            )}
          >
            {side === 'hero' ? (
              <PixelSprite {...HERO} pixel={7} label="Hero" />
            ) : (
              <PixelSprite {...DRAGON} pixel={7} flip label="Dragon" />
            )}
          </div>
        </div>
      </div>
      {/* Bóng dưới chân */}
      <div className="mt-1 h-2 w-16 rounded-[50%] bg-black/30 blur-[2px]" />
    </div>
  )

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#2d2a6e] via-[#4b3f8f] to-[#c98a5a] p-4 shadow-xl ring-1 ring-foreground/10 sm:p-5',
        className,
      )}
    >
      {/* Sao lấp lánh trên trời */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,.8)_1px,transparent_1.5px)] [background-size:38px_38px] opacity-25" aria-hidden />
      {/* Mặt đất */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-[#5b3b2a] to-[#3a2519]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-20 h-1 bg-[#7fae4f]" aria-hidden />

      <div className="relative flex items-start justify-between gap-4">
        <HpBar side="hero" hp={hp.hero} />
        <Swords className="mt-2 size-5 shrink-0 text-gold" aria-hidden />
        <HpBar side="dragon" hp={hp.dragon} />
      </div>

      <div className="relative mt-12 flex items-end justify-between px-1 sm:px-4">
        {fighter('hero')}
        {fighter('dragon')}
      </div>

      {winner && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="animate-pop-in rounded-xl bg-black/70 px-5 py-3 text-center ring-1 ring-gold/60 backdrop-blur-sm">
            <p className="text-xl font-extrabold text-gold">{FIGHTERS[winner].name} thắng!</p>
            <p className="text-xs text-white/75">Tuần sau Hero sẽ mạnh hơn…</p>
          </div>
        </div>
      )}

      <p className="relative mt-4 min-h-10 rounded-lg bg-black/45 px-3 py-2 font-mono text-xs leading-relaxed text-white/90 sm:text-[13px]" aria-live="off">
        <span className="text-gold">&gt;</span> {log}
      </p>
    </div>
  )
}
