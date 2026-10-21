import { Route, Routes } from 'react-router-dom'
import { AppShell } from './AppShell'
import { ErrorPage } from './ErrorPage'

function PlaceholderPage({
  title,
  children,
}: {
  title: string
  children: string
}) {
  return (
    <main className="content-page">
      <h1>{title}</h1>
      <p>{children}</p>
    </main>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />} />
      <Route
        path="/about"
        element={
          <PlaceholderPage title="关于健身指北">
            健身指北帮助你了解肌肉、关节与训练动作之间的联系。
          </PlaceholderPage>
        }
      />
      <Route
        path="/licenses"
        element={
          <PlaceholderPage title="开源许可">
            本项目使用的开源软件许可将在此列出。
          </PlaceholderPage>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
