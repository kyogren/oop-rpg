import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <Compass className="size-10 text-muted-foreground" aria-hidden />
      <h1 className="mt-4 text-2xl font-bold">Lạc đường rồi!</h1>
      <p className="mt-2 text-muted-foreground">Vùng đất này không có trên bản đồ.</p>
      <Link to="/" className={buttonVariants({ className: 'mt-6' })}>
        Quay lại bản đồ
      </Link>
    </div>
  )
}
