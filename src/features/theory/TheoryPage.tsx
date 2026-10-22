import { Link } from 'react-router-dom'
import { BackToTop } from '../../app/BackToTop'

const chapters = [
  { id: 'directions', title: '解剖姿势与方向' },
  { id: 'planes', title: '三个平面' },
  { id: 'joint-actions', title: '关节动作' },
  { id: 'muscle-roles', title: '肌肉角色' },
  { id: 'attachments', title: '起止点' },
  { id: 'contractions', title: '发力方式' },
] as const

const planes = [
  {
    id: 'sagittal',
    name: '矢状面',
    english: 'Sagittal plane',
    axis: '左 · 右',
    summary:
      '沿身体前后方向纵切，把身体分成左侧和右侧。正好通过中线的一张叫正中矢状面。',
    motion: '这个面上主要是屈曲和伸展，例如深蹲、卧推、弯举和箭步。',
    examples: [
      { name: '肩屈', href: '/?type=joint-action&id=shoulder-flexion' },
      { name: '屈肘', href: '/?type=joint-action&id=elbow-flexion' },
      { name: '髋屈', href: '/?type=joint-action&id=hip-flexion' },
    ],
  },
  {
    id: 'coronal',
    name: '冠状面',
    english: 'Coronal plane',
    axis: '前 · 后',
    summary:
      '沿身体左右方向纵切，把身体分成前侧和后侧。它也叫额状面，图谱里的动作说明用的是这个名字。',
    motion:
      '这个面上主要是外展和内收，例如侧平举、侧向弓步，以及躯干向一侧弯曲。',
    examples: [
      { name: '肩外展', href: '/?type=joint-action&id=shoulder-abduction' },
    ],
  },
  {
    id: 'transverse',
    name: '水平面',
    english: 'Transverse plane',
    axis: '上 · 下',
    summary: '和地面平行地切开，把身体分成上侧和下侧，也叫横切面。',
    motion:
      '这个面上主要是旋转，以及肩在身前水平靠拢或打开，例如转体和绳索夹胸。',
    examples: [
      {
        name: '肩水平内收',
        href: '/?type=joint-action&id=shoulder-horizontal-adduction',
      },
    ],
  },
] as const

const directions = [
  {
    title: '上与下',
    english: 'Superior / Inferior',
    body: '上是靠近头的方向，下是靠近脚的方向。水平面就是按上下把身体切开。',
  },
  {
    title: '前与后',
    english: 'Anterior / Posterior',
    body: '前是面朝的方向，后是背对的方向。冠状面按前后把身体切开。',
  },
  {
    title: '内侧与外侧',
    english: 'Medial / Lateral',
    body: '内侧靠近身体中线，外侧远离中线。内收是向中线靠，外展是离开中线。',
  },
  {
    title: '近端与远端',
    english: 'Proximal / Distal',
    body: '用在四肢上。近端离躯干更近，远端离躯干更远。上臂比前臂更靠近端。',
  },
] as const

const jointActions = [
  {
    title: '屈曲与伸展',
    english: 'Flexion / Extension',
    body: '屈曲让相邻两段身体的夹角变小，伸展让夹角变大或回到伸直。它们主要发生在矢状面。',
    examples: [
      { name: '肩屈', href: '/?type=joint-action&id=shoulder-flexion' },
      { name: '屈肘', href: '/?type=joint-action&id=elbow-flexion' },
      { name: '屈膝', href: '/?type=joint-action&id=knee-flexion' },
    ],
  },
  {
    title: '外展与内收',
    english: 'Abduction / Adduction',
    body: '外展让肢体离开中线，内收让肢体回到中线。它们主要发生在冠状面。',
    examples: [
      { name: '肩外展', href: '/?type=joint-action&id=shoulder-abduction' },
    ],
  },
  {
    title: '旋转',
    english: 'Rotation',
    body: '肢体绕自身长轴转动，例如前臂旋前、旋后，以及躯干左右转体。旋转主要发生在水平面。',
    examples: [],
  },
  {
    title: '水平内收',
    english: 'Horizontal adduction',
    body: '上臂抬到与地面接近平行后，再向身体中线靠拢。绳索夹胸就在这个方向上。',
    examples: [
      {
        name: '肩水平内收',
        href: '/?type=joint-action&id=shoulder-horizontal-adduction',
      },
    ],
  },
  {
    title: '跖屈与背屈',
    english: 'Plantarflexion / Dorsiflexion',
    body: '这是踝关节自己的说法。跖屈是足尖向下，背屈是足背向上靠近小腿。',
    examples: [
      { name: '踝跖屈', href: '/?type=joint-action&id=ankle-plantarflexion' },
      { name: '踝背屈', href: '/?type=joint-action&id=ankle-dorsiflexion' },
    ],
  },
] as const

const roles = [
  {
    title: '主动肌',
    english: 'Agonist',
    role: 'agonist',
    body: '完成这个动作的主要肌肉。杠铃卧推推起时，胸大肌是主动肌。',
  },
  {
    title: '协同肌',
    english: 'Synergist',
    role: 'synergist',
    body: '协助主动肌，或把动作引导到需要的方向。卧推里的三角肌前束和肱三头肌是协同肌。',
  },
  {
    title: '稳定肌',
    english: 'Stabilizer',
    role: 'stabilizer',
    body: '固定邻近关节，让主动肌有稳定的支点。卧推时前锯肌帮助稳定肩胛骨。',
  },
  {
    title: '拮抗肌',
    english: 'Antagonist',
    role: 'antagonist',
    body: '位于主动肌对面，负责相反方向的动作，并在主动肌收缩时适度放松。',
  },
] as const

const contractions = [
  {
    title: '向心收缩',
    english: 'Concentric',
    body: '肌肉变短，同时把负荷移动。卧推把杠铃从胸口推起，就是胸大肌的向心收缩。',
  },
  {
    title: '离心收缩',
    english: 'Eccentric',
    body: '肌肉在受力时被拉长，用来放慢动作。杠铃慢慢放到胸口，胸大肌是在做离心收缩。',
  },
  {
    title: '等长收缩',
    english: 'Isometric',
    body: '肌肉用力，但长度和关节角度基本不变。平板支撑，以及卧推在胸口停住的瞬间，都是等长收缩。',
  },
] as const

function ExampleLinks({
  examples,
}: {
  examples: ReadonlyArray<{ name: string; href: string }>
}) {
  if (examples.length === 0) return null
  return (
    <div className="theory-plane__links">
      {examples.map((example) => (
        <Link key={example.href} to={example.href}>
          {example.name}
        </Link>
      ))}
    </div>
  )
}

function SeeAlso({
  examples,
}: {
  examples: ReadonlyArray<{ name: string; href: string }>
}) {
  return (
    <div className="theory-see">
      <span>图谱中查看</span>
      <ExampleLinks examples={examples} />
    </div>
  )
}

export function TheoryPage() {
  return (
    <main className="content-page theory-page">
      <Link className="text-link" to="/">
        返回人体图谱
      </Link>
      <p className="eyebrow">解剖基础</p>
      <h1>理论知识</h1>
      <p>
        这些是阅读肌肉、关节和训练动作时会反复遇到的概念。可以从索引直接跳到某一节。
      </p>
      <nav aria-label="知识索引" className="theory-index">
        {chapters.map((chapter) => (
          <a href={`#${chapter.id}`} key={chapter.id}>
            {chapter.title}
          </a>
        ))}
      </nav>

      <section id="directions">
        <h2>解剖姿势与方向</h2>
        <p>
          描述方向时，默认身体直立、面朝前、双臂垂在体侧、掌心向前、双脚向前。前、后、左、右都从这个姿势来看，不随你当时怎么站而改变。
        </p>
        <div className="theory-grid">
          {directions.map((item) => (
            <article className="theory-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="detail-header__english">{item.english}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="planes">
        <h2>三个平面</h2>
        <p>
          描述关节往哪个方向活动时，常用三个互相垂直的平面。同一个关节可以在不同平面里做出不同的动作。
        </p>
        <figure className="theory-overview">
          <img
            alt="身体被矢状面、冠状面和水平面同时切开。图中 Sagittal plane 是矢状面，Frontal (coronal) plane 是冠状面，Transverse plane 是水平面。"
            src={`${import.meta.env.BASE_URL}assets/planes-of-body.jpg`}
          />
          <figcaption>
            图中 Sagittal plane 是矢状面，Frontal (coronal) plane
            是冠状面，也叫额状面，Transverse plane 是水平面。图示来自 OpenStax
            College《Anatomy & Physiology》，
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              rel="noreferrer"
              target="_blank"
            >
              CC BY 4.0
            </a>
            。
          </figcaption>
        </figure>
        <div className="theory-planes">
          {planes.map((plane) => (
            <article className="theory-plane" key={plane.id}>
              <p className="theory-plane__axis">{plane.axis}</p>
              <h3>{plane.name}</h3>
              <p className="detail-header__english">{plane.english}</p>
              <p>{plane.summary}</p>
              <p>{plane.motion}</p>
              <ExampleLinks examples={plane.examples} />
            </article>
          ))}
        </div>
      </section>

      <section id="joint-actions">
        <h2>关节动作</h2>
        <p>图谱里的动作名称，就是在说肢体相对这三个平面怎么移动。</p>
        <div className="theory-grid">
          {jointActions.map((item) => (
            <article className="theory-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="detail-header__english">{item.english}</p>
              <p>{item.body}</p>
              <ExampleLinks examples={item.examples} />
            </article>
          ))}
        </div>
      </section>

      <section id="muscle-roles">
        <h2>肌肉角色</h2>
        <p>
          一个动作通常有好几块肌肉参加，角色标记的是它们各自在做什么。颜色和图谱详情里的标签一致。
        </p>
        <div className="theory-grid">
          {roles.map((item) => (
            <article className="theory-card" key={item.title}>
              <h3 className={`theory-role theory-role--${item.role}`}>
                {item.title}
              </h3>
              <p className="detail-header__english">{item.english}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <SeeAlso
          examples={[
            {
              name: '杠铃卧推',
              href: '/?type=exercise&id=barbell-bench-press',
            },
          ]}
        />
      </section>

      <section id="attachments">
        <h2>起止点</h2>
        <p>
          起点是肌肉较固定的一端，止点是通常被拉动的一端。肌肉收缩时，止点向起点靠近。
        </p>
        <p>
          胸大肌覆盖胸廓前侧并连到上臂，所以收缩时能把上臂拉向胸前。这就是它能完成肩水平内收的原因。
        </p>
        <SeeAlso
          examples={[
            { name: '胸大肌', href: '/?type=muscle&id=pectoralis-major' },
          ]}
        />
      </section>

      <section id="contractions">
        <h2>发力方式</h2>
        <p>同一块肌肉在一个动作的不同阶段，发力方式会变。</p>
        <div className="theory-grid">
          {contractions.map((item) => (
            <article className="theory-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="detail-header__english">{item.english}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <SeeAlso
          examples={[
            {
              name: '杠铃卧推',
              href: '/?type=exercise&id=barbell-bench-press',
            },
          ]}
        />
      </section>
      <BackToTop />
    </main>
  )
}
