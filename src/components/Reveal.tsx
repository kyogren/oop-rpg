import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/lib/motion'

// Trạng thái ẩn trước khi xuất hiện. Trên điện thoại luôn trượt từ dưới lên
// để không đẩy nội dung tràn ngang màn hình.
const hidden = {
  up: 'opacity-0 translate-y-6',
  left: 'opacity-0 translate-y-6 md:translate-y-0 md:-translate-x-10',
  right: 'opacity-0 translate-y-6 md:translate-y-0 md:translate-x-10',
}

interface Props {
  children: ReactNode
  from?: keyof typeof hidden
  delay?: number
  className?: string
}

export function Reveal({ children, from = 'up', delay = 0, className }: Props) {
  const [ref, shown] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: shown ? `${delay}ms` : undefined }}
      className={cn('transition duration-700 ease-out', !shown && hidden[from], className)}
    >
      {children}
    </div>
  )
}
