import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () => {
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

// once = true: chỉ báo lần đầu phần tử lọt vào màn hình (dùng cho hiệu ứng xuất hiện)
// once = false: theo dõi liên tục (dùng để dừng animation khi cuộn khỏi màn hình)
export function useInView<T extends Element>({ once = true, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, rootMargin])

  return [ref, inView] as const
}
