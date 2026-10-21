export function AppShell() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <a className="brand" href="/" aria-label="肌动指南首页">
          <span className="brand-mark" aria-hidden="true">
            动
          </span>
          肌动指南
        </a>

        <div className="search" role="search">
          <label className="sr-only" htmlFor="anatomy-search">
            搜索肌肉、骨骼或训练动作
          </label>
          <input
            id="anatomy-search"
            type="search"
            placeholder="搜索肌肉、骨骼或训练动作"
          />
        </div>

        <fieldset className="mode-control">
          <legend className="sr-only">解剖浏览模式</legend>
          <label>
            <input defaultChecked name="mode" type="radio" value="muscle" />
            <span>肌肉</span>
          </label>
          <label>
            <input name="mode" type="radio" value="bone" />
            <span>骨骼</span>
          </label>
        </fieldset>
      </header>

      <main className="anatomy-layout" aria-label="人体解剖浏览器">
        <section className="body-map" aria-labelledby="body-map-title">
          <div>
            <p className="eyebrow">交互式人体图谱</p>
            <h1 id="body-map-title">探索身体结构</h1>
            <p>人体 SVG 图谱将在这里呈现。</p>
          </div>
        </section>

        <section className="details-panel" aria-labelledby="details-title">
          <p className="eyebrow">结构详情</p>
          <h2 id="details-title">解剖详情</h2>
          <p>选择人体图谱中的结构以查看相关信息。</p>
        </section>
      </main>
    </div>
  )
}
