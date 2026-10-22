import { useRef } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
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
  const location = useLocation()
  const navigationType = useNavigationType()
  const motion = useRef<{ path: string; name: 'none' | 'forward' | 'back' }>({
    path: location.pathname,
    name: 'none',
  })

  if (motion.current.path !== location.pathname) {
    motion.current = {
      path: location.pathname,
      name: navigationType === 'POP' ? 'back' : 'forward',
    }
  }

  return (
    <div
      className={`page-stage page-stage--${motion.current.name}`}
      key={location.pathname}
    >
      <Routes location={location}>
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
            <main className="content-page">
              <h1>开源许可</h1>
              <p>
                肌肉模型来自 Z-Anatomy（CC BY-SA 4.0），骨骼模型来自
                BodyParts3D（CC BY 4.0）。平面肌肉轮廓来自 Body
                Muscles（Apache-2.0，© Ivan
                Vulović）。模型文件保存在本仓库中，并在素材说明里署名。
              </p>
              <p>
                动作静图使用 RepDB 免费档。页面和本说明中的署名是：
                <a href="https://repdb.co" rel="noreferrer" target="_blank">
                  Exercise data by RepDB (repdb.co)
                </a>
                。这些图片只通过远程地址加载，完整数据集没有放进本仓库，付费预览动画也没有使用。
              </p>
              <p>
                已有的动作 GIF 仍从 exercises-dataset
                远程加载，只供当前项目展示。该仓库的 MIT 许可不覆盖这些
                GIF，因此原文件没有提交。ExerciseGymGifsDB、exercise-library
                的动图，以及 Vital Animations 免费包的原始视频，都没有加入仓库。
              </p>
            </main>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}
