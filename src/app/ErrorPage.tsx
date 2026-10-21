import { Link } from 'react-router-dom'

export function ErrorPage() {
  return (
    <main className="content-page">
      <p className="eyebrow">404</p>
      <h1>页面未找到</h1>
      <p>你访问的页面不存在或已被移动。</p>
      <Link className="text-link" to="/">
        返回人体图谱
      </Link>
    </main>
  )
}
