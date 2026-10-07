import { useState, type ReactNode } from 'react'
import { Check, Copy, ExternalLink, FileCode2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { site } from '@/content/site'

const KEYWORDS =
  'class|struct|public|private|protected|virtual|override|const|static|return|if|else|while|for|do|break|continue|new|delete|this|true|false|using|namespace|auto|operator|friend|template|typename'
const TYPES = 'void|bool|int|double|float|char|long|string|vector|ofstream|ifstream'

const TOKEN = new RegExp(
  `(\\/\\/.*$)|("(?:[^"\\\\]|\\\\.)*")|(^\\s*#\\s*\\w+.*$)|\\b(${KEYWORDS})\\b|\\b(${TYPES})\\b|\\b(\\d+(?:\\.\\d+)?)\\b`,
  'g',
)

// Tô màu C++ tối giản: comment, chuỗi, chỉ thị tiền xử lý, từ khóa, kiểu, số
function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of line.matchAll(TOKEN)) {
    const i = m.index ?? 0
    if (i > last) out.push(line.slice(last, i))
    const cls = m[1]
      ? 'text-[oklch(0.68_0.03_270)] italic'
      : m[2]
        ? 'text-[oklch(0.8_0.13_145)]'
        : m[3]
          ? 'text-[oklch(0.75_0.12_330)]'
          : m[4]
            ? 'text-[oklch(0.76_0.13_295)] font-semibold'
            : m[5]
              ? 'text-[oklch(0.8_0.1_210)]'
              : 'text-[oklch(0.82_0.13_65)]'
    out.push(
      <span key={i} className={cls}>
        {m[0]}
      </span>,
    )
    last = i + m[0].length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

interface Props {
  code: string
  filename?: string
  repoPath?: string // đường dẫn trong repo để mở trên GitHub
  className?: string
}

export function CodeBlock({ code, filename, repoPath, className }: Props) {
  const [copied, setCopied] = useState(false)
  const lines = code.replace(/\n$/, '').split('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Trình duyệt chặn clipboard: bỏ qua
    }
  }

  return (
    <div className={cn('overflow-hidden rounded-xl bg-code text-code-foreground ring-1 ring-foreground/10', className)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs">
        {filename && (
          <span className="flex min-w-0 items-center gap-1.5 font-mono text-white/70">
            <FileCode2 className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">{filename}</span>
          </span>
        )}
        <div className="ml-auto flex items-center gap-1">
          {site.repoUrl && repoPath && (
            <a
              href={`${site.repoUrl}/blob/${site.branch}/${repoPath}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-md px-2 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="size-3.5" aria-hidden />
              GitHub
            </a>
          )}
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            aria-label="Sao chép code"
          >
            {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
            {copied ? 'Đã chép' : 'Chép'}
          </button>
        </div>
      </div>
      {/* Tắt ligature: không để "<=" hiện thành "≤" khiến sinh viên gõ lại sai */}
      <pre className="overflow-x-auto py-3 font-mono text-[13px] leading-6 [font-variant-ligatures:none]">
        <code className="grid w-max min-w-full">
          {lines.map((line, i) => (
            <span key={i} className="grid grid-cols-[3rem_1fr] hover:bg-white/5">
              <span className="pr-4 text-right text-white/30 select-none">{i + 1}</span>
              <span className="pr-4 whitespace-pre">{highlight(line)}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
