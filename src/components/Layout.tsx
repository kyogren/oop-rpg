import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Moon, Swords, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'
import { useTheme } from '@/lib/theme'

export function Layout() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()

  // Chuyển trang thì cuộn lên đầu
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Swords className="size-4.5" aria-hidden />
            </span>
            {site.title}
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Bản đồ
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            >
              {theme === 'dark' ? <Sun aria-hidden /> : <Moon aria-hidden />}
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>{site.course}</span>
          <span>Xây dựng cùng sinh viên, mỗi tuần một ít.</span>
        </div>
      </footer>
    </div>
  )
}
