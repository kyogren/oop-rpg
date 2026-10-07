import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { MapPage } from '@/pages/MapPage'
import { WeekPage } from '@/pages/WeekPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

// HashRouter (#/tuan/...) để GitHub Pages không trả 404 khi tải lại trang con
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MapPage />} />
          <Route path="tuan/:slug" element={<WeekPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
