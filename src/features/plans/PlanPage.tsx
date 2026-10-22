import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { BackToTop } from '../../app/BackToTop'

type PlanAlternative = {
  id: string
  name: string
}

type PlanExercise = {
  id: string
  name: string
  sets: string
  rest: string
  alternatives: PlanAlternative[]
}

type PlanDay = {
  name: string
  focus: string
  duration: string
  note?: string
  exercises: PlanExercise[]
}

type Split = {
  id: string
  title: string
  summary: string
  week: string
  days: PlanDay[]
}

const alternatives: Record<string, PlanAlternative[]> = {
  'barbell-bench-press': [
    { id: 'push-up', name: '俯卧撑' },
    { id: 'parallel-bar-dip', name: '双杠臂屈伸' },
  ],
  'incline-dumbbell-press': [
    { id: 'barbell-bench-press', name: '杠铃卧推' },
    { id: 'push-up', name: '俯卧撑' },
  ],
  'dumbbell-overhead-press': [
    { id: 'barbell-overhead-press', name: '杠铃推举' },
  ],
  'barbell-overhead-press': [
    { id: 'dumbbell-overhead-press', name: '哑铃推举' },
  ],
  'cable-chest-fly': [
    { id: 'dumbbell-pullover', name: '哑铃上拉' },
    { id: 'push-up', name: '俯卧撑' },
  ],
  'dumbbell-pullover': [
    { id: 'cable-chest-fly', name: '绳索夹胸' },
    { id: 'push-up', name: '俯卧撑' },
  ],
  'parallel-bar-dip': [
    { id: 'push-up', name: '俯卧撑' },
    { id: 'close-grip-bench-press', name: '窄握卧推' },
  ],
  'dumbbell-lateral-raise': [{ id: 'upright-row', name: '直立划船' }],
  'triceps-pushdown': [
    { id: 'overhead-triceps-extension', name: '哑铃颈后臂屈伸' },
    { id: 'skull-crusher', name: '仰卧臂屈伸' },
  ],
  'close-grip-bench-press': [
    { id: 'triceps-pushdown', name: '绳索下压' },
    { id: 'overhead-triceps-extension', name: '哑铃颈后臂屈伸' },
  ],
  'overhead-triceps-extension': [
    { id: 'triceps-pushdown', name: '绳索下压' },
    { id: 'skull-crusher', name: '仰卧臂屈伸' },
  ],
  'skull-crusher': [
    { id: 'overhead-triceps-extension', name: '哑铃颈后臂屈伸' },
    { id: 'triceps-pushdown', name: '绳索下压' },
  ],
  'lat-pulldown': [
    { id: 'pull-up', name: '引体向上' },
    { id: 'chin-up', name: '反手引体向上' },
  ],
  'pull-up': [
    { id: 'lat-pulldown', name: '高位下拉' },
    { id: 'chin-up', name: '反手引体向上' },
  ],
  'barbell-row': [
    { id: 'one-arm-dumbbell-row', name: '单臂哑铃划船' },
    { id: 'seated-cable-row', name: '坐姿绳索划船' },
  ],
  'seated-cable-row': [
    { id: 'one-arm-dumbbell-row', name: '单臂哑铃划船' },
    { id: 'barbell-row', name: '杠铃俯身划船' },
  ],
  'one-arm-dumbbell-row': [
    { id: 'barbell-row', name: '杠铃俯身划船' },
    { id: 'seated-cable-row', name: '坐姿绳索划船' },
  ],
  'face-pull': [{ id: 'reverse-fly', name: '俯身反向飞鸟' }],
  'reverse-fly': [{ id: 'face-pull', name: '面拉' }],
  'back-extension': [
    { id: 'glute-bridge', name: '臀桥' },
    { id: 'romanian-deadlift', name: '罗马尼亚硬拉' },
  ],
  'barbell-curl': [
    { id: 'dumbbell-curl', name: '哑铃弯举' },
    { id: 'hammer-curl', name: '锤式弯举' },
  ],
  'hammer-curl': [
    { id: 'dumbbell-curl', name: '哑铃弯举' },
    { id: 'barbell-curl', name: '杠铃弯举' },
  ],
  'preacher-curl': [
    { id: 'dumbbell-curl', name: '哑铃弯举' },
    { id: 'barbell-curl', name: '杠铃弯举' },
  ],
  'back-squat': [
    { id: 'goblet-squat', name: '高脚杯深蹲' },
    { id: 'leg-press', name: '腿举' },
  ],
  'romanian-deadlift': [
    { id: 'single-leg-romanian-deadlift', name: '单腿罗马尼亚硬拉' },
    { id: 'glute-bridge', name: '臀桥' },
  ],
  'leg-press': [
    { id: 'goblet-squat', name: '高脚杯深蹲' },
    { id: 'bulgarian-split-squat', name: '保加利亚分腿蹲' },
  ],
  'bulgarian-split-squat': [
    { id: 'forward-lunge', name: '向前弓步' },
    { id: 'step-up', name: '登台阶' },
  ],
  'hip-thrust': [
    { id: 'glute-bridge', name: '臀桥' },
    { id: 'cable-glute-kickback', name: '绳索后踢腿' },
  ],
  'lying-leg-curl': [
    { id: 'single-leg-romanian-deadlift', name: '单腿罗马尼亚硬拉' },
    { id: 'romanian-deadlift', name: '罗马尼亚硬拉' },
  ],
  'leg-extension': [
    { id: 'goblet-squat', name: '高脚杯深蹲' },
    { id: 'step-up', name: '登台阶' },
  ],
  'standing-calf-raise': [
    { id: 'single-leg-calf-raise', name: '单腿提踵' },
    { id: 'seated-calf-raise', name: '坐姿提踵' },
  ],
  'seated-calf-raise': [
    { id: 'standing-calf-raise', name: '站姿提踵' },
    { id: 'single-leg-calf-raise', name: '单腿提踵' },
  ],
  crunch: [
    { id: 'front-plank', name: '平板支撑' },
    { id: 'reverse-crunch', name: '反向卷腹' },
  ],
}

function move(
  id: string,
  name: string,
  sets: string,
  rest: string,
): PlanExercise {
  return {
    id,
    name,
    sets,
    rest,
    alternatives: alternatives[id] ?? [],
  }
}

const heavy = '休息 2–3 分钟'
const medium = '休息 90 秒'
const short = '休息 60–90 秒'

const splits: Split[] = [
  {
    id: 'three',
    title: '三分化',
    summary:
      '一周练 3 天。每块主要肌群集中练一次，所以当天要把组数做够。刚开始规律训练，用这一套。',
    week: '周一推，周三拉，周五腿。周二、周四、周末休息。',
    days: [
      {
        name: '第 1 天 · 推',
        focus: '胸、肩、肱三头',
        duration: '大约 70 分钟',
        exercises: [
          move('barbell-bench-press', '杠铃卧推', '4 组 × 6–10 次', heavy),
          move(
            'incline-dumbbell-press',
            '上斜哑铃卧推',
            '3 组 × 8–12 次',
            medium,
          ),
          move('dumbbell-overhead-press', '哑铃推举', '3 组 × 8–12 次', medium),
          move('cable-chest-fly', '绳索夹胸', '3 组 × 12–15 次', short),
          move(
            'dumbbell-lateral-raise',
            '哑铃侧平举',
            '4 组 × 12–15 次',
            short,
          ),
          move('triceps-pushdown', '绳索下压', '3 组 × 10–15 次', short),
        ],
      },
      {
        name: '第 2 天 · 拉',
        focus: '背、肱二头',
        duration: '大约 70 分钟',
        exercises: [
          move('lat-pulldown', '高位下拉', '4 组 × 6–10 次', heavy),
          move('barbell-row', '杠铃俯身划船', '4 组 × 6–10 次', heavy),
          move('seated-cable-row', '坐姿绳索划船', '3 组 × 8–12 次', medium),
          move('face-pull', '面拉', '3 组 × 12–15 次', short),
          move('barbell-curl', '杠铃弯举', '3 组 × 8–12 次', short),
          move('hammer-curl', '锤式弯举', '3 组 × 10–15 次', short),
        ],
      },
      {
        name: '第 3 天 · 腿',
        focus: '臀、大腿、小腿、腹',
        duration: '大约 75 分钟',
        exercises: [
          move('back-squat', '杠铃深蹲', '4 组 × 6–10 次', heavy),
          move('romanian-deadlift', '罗马尼亚硬拉', '3 组 × 8–12 次', heavy),
          move('leg-press', '腿举', '3 组 × 10–12 次', medium),
          move('lying-leg-curl', '俯卧腿弯举', '3 组 × 10–15 次', short),
          move('standing-calf-raise', '站姿提踵', '4 组 × 8–12 次', short),
          move('crunch', '卷腹', '3 组 × 12–15 次', short),
        ],
      },
    ],
  },
  {
    id: 'four',
    title: '四分化',
    summary:
      '一周练 4 天。胸和肩隔开，避免连续两天推。手臂不单独占一天：肱三头跟胸，肱二头跟背。三分化能做满、重量还在增加之后，再换这一套。',
    week: '周一胸，周二背，周四肩，周五腿。周三和周末休息。',
    days: [
      {
        name: '第 1 天 · 胸',
        focus: '胸、肱三头',
        duration: '大约 75 分钟',
        exercises: [
          move('barbell-bench-press', '杠铃卧推', '4 组 × 6–10 次', heavy),
          move(
            'incline-dumbbell-press',
            '上斜哑铃卧推',
            '3 组 × 8–12 次',
            medium,
          ),
          move('cable-chest-fly', '绳索夹胸', '3 组 × 12–15 次', short),
          move('close-grip-bench-press', '窄握卧推', '3 组 × 8–12 次', medium),
          move('triceps-pushdown', '绳索下压', '3 组 × 10–15 次', short),
          move(
            'overhead-triceps-extension',
            '哑铃颈后臂屈伸',
            '3 组 × 10–15 次',
            short,
          ),
        ],
      },
      {
        name: '第 2 天 · 背',
        focus: '背、肱二头',
        duration: '大约 75 分钟',
        exercises: [
          move('lat-pulldown', '高位下拉', '4 组 × 6–10 次', heavy),
          move('barbell-row', '杠铃俯身划船', '4 组 × 6–10 次', heavy),
          move(
            'one-arm-dumbbell-row',
            '单臂哑铃划船',
            '3 组 × 8–12 次',
            medium,
          ),
          move('face-pull', '面拉', '3 组 × 12–15 次', short),
          move('barbell-curl', '杠铃弯举', '3 组 × 8–12 次', short),
          move('hammer-curl', '锤式弯举', '3 组 × 10–15 次', short),
        ],
      },
      {
        name: '第 3 天 · 肩',
        focus: '三角肌前、中、后束',
        duration: '大约 55 分钟',
        exercises: [
          move('barbell-overhead-press', '杠铃推举', '4 组 × 6–10 次', heavy),
          move(
            'dumbbell-lateral-raise',
            '哑铃侧平举',
            '5 组 × 12–15 次',
            short,
          ),
          move('reverse-fly', '俯身反向飞鸟', '4 组 × 12–15 次', short),
          move('face-pull', '面拉', '3 组 × 15–20 次', short),
        ],
      },
      {
        name: '第 4 天 · 腿',
        focus: '臀、大腿、小腿、腹',
        duration: '大约 80 分钟',
        exercises: [
          move('back-squat', '杠铃深蹲', '4 组 × 6–10 次', heavy),
          move('romanian-deadlift', '罗马尼亚硬拉', '3 组 × 8–12 次', heavy),
          move('leg-press', '腿举', '3 组 × 10–12 次', medium),
          move('hip-thrust', '杠铃臀推', '3 组 × 8–12 次', medium),
          move('lying-leg-curl', '俯卧腿弯举', '3 组 × 10–15 次', short),
          move('leg-extension', '腿屈伸', '3 组 × 10–15 次', short),
          move('standing-calf-raise', '站姿提踵', '4 组 × 8–12 次', short),
          move('crunch', '卷腹', '3 组 × 12–15 次', short),
        ],
      },
    ],
  },
  {
    id: 'five',
    title: '五分化',
    summary:
      '一周练 5 天，每天集中一块。只适合三分化或四分化已经能稳定完成的人。刚开始训练不要用这一套。',
    week: '周一胸，周二背，周三肩，周四腿，周五手臂。周末休息。',
    days: [
      {
        name: '第 1 天 · 胸',
        focus: '胸',
        duration: '大约 65 分钟',
        note: '双杠臂屈伸让肩不舒服时，改成俯卧撑，每组在还剩大约 2 次时停下。',
        exercises: [
          move('barbell-bench-press', '杠铃卧推', '4 组 × 6–10 次', heavy),
          move(
            'incline-dumbbell-press',
            '上斜哑铃卧推',
            '4 组 × 8–12 次',
            medium,
          ),
          move('parallel-bar-dip', '双杠臂屈伸', '3 组 × 6–10 次', medium),
          move('cable-chest-fly', '绳索夹胸', '3 组 × 12–15 次', short),
          move('dumbbell-pullover', '哑铃上拉', '3 组 × 10–15 次', short),
        ],
      },
      {
        name: '第 2 天 · 背',
        focus: '背',
        duration: '大约 75 分钟',
        note: '引体向上一组做不满 6 次时，改用备选里的高位下拉，组数和次数不变。',
        exercises: [
          move('pull-up', '引体向上', '4 组 × 6–10 次', heavy),
          move('barbell-row', '杠铃俯身划船', '4 组 × 6–10 次', heavy),
          move('seated-cable-row', '坐姿绳索划船', '3 组 × 8–12 次', medium),
          move(
            'one-arm-dumbbell-row',
            '单臂哑铃划船',
            '3 组 × 10–12 次',
            medium,
          ),
          move('face-pull', '面拉', '3 组 × 12–15 次', short),
          move('back-extension', '罗马椅挺身', '3 组 × 10–15 次', short),
        ],
      },
      {
        name: '第 3 天 · 肩',
        focus: '三角肌前、中、后束',
        duration: '大约 60 分钟',
        exercises: [
          move('dumbbell-overhead-press', '哑铃推举', '4 组 × 8–12 次', heavy),
          move(
            'dumbbell-lateral-raise',
            '哑铃侧平举',
            '5 组 × 12–15 次',
            short,
          ),
          move('reverse-fly', '俯身反向飞鸟', '4 组 × 12–15 次', short),
          move('face-pull', '面拉', '3 组 × 15–20 次', short),
        ],
      },
      {
        name: '第 4 天 · 腿',
        focus: '臀、大腿、小腿',
        duration: '大约 90 分钟',
        exercises: [
          move('back-squat', '杠铃深蹲', '4 组 × 6–10 次', heavy),
          move('romanian-deadlift', '罗马尼亚硬拉', '3 组 × 8–12 次', heavy),
          move('leg-press', '腿举', '3 组 × 10–12 次', medium),
          move(
            'bulgarian-split-squat',
            '保加利亚分腿蹲',
            '3 组 × 8–12 次 / 侧',
            medium,
          ),
          move('hip-thrust', '杠铃臀推', '3 组 × 8–12 次', medium),
          move('lying-leg-curl', '俯卧腿弯举', '3 组 × 10–15 次', short),
          move('leg-extension', '腿屈伸', '3 组 × 10–15 次', short),
          move('standing-calf-raise', '站姿提踵', '4 组 × 8–12 次', short),
          move('seated-calf-raise', '坐姿提踵', '3 组 × 12–15 次', short),
        ],
      },
      {
        name: '第 5 天 · 手臂',
        focus: '肱三头、肱二头',
        duration: '大约 70 分钟',
        exercises: [
          move('close-grip-bench-press', '窄握卧推', '3 组 × 8–12 次', heavy),
          move('barbell-curl', '杠铃弯举', '3 组 × 8–12 次', medium),
          move('skull-crusher', '仰卧臂屈伸', '3 组 × 8–12 次', medium),
          move('hammer-curl', '锤式弯举', '3 组 × 10–15 次', short),
          move('triceps-pushdown', '绳索下压', '3 组 × 10–15 次', short),
          move('preacher-curl', '牧师凳弯举', '3 组 × 10–12 次', short),
        ],
      },
    ],
  },
]

const howTo = [
  '每次先走或慢跑 5 分钟。当天第一个动作再用大约一半的重量做 2 组，每组 8 次。这两套是热身，不算进下表的组数。',
  '表里的动作从需要整身出力的动作排到单关节动作，按这个顺序做，不要跳。重量选到一组完成表上的次数后，还剩下大约 1 到 2 次。前两周可以多留一点，先把动作做稳。做不满下限就减轻；动作稳定而且做满上限，下次加重。杠铃通常加 2.5 公斤，哑铃每只加 1 到 2 公斤。',
  '每一项下面有一到两个备选，是同一类动作、换成另一种器械。健身房没有主项的器械时，选一个备选替换这一项，组数和次数不变。主项和备选不要一起做。',
  '杠铃深蹲如果腰或膝守不住，先换成高脚杯深蹲，组数和次数不变。休息日可以散步，不要把同一天的内容再练一遍。关节刺痛就停这个动作；肌肉酸胀可以继续。',
]

function formatPlan(split: Split) {
  const lines = [
    split.title,
    '',
    split.summary,
    split.week,
    '',
    '怎么练',
    ...howTo,
    '',
  ]
  for (const day of split.days) {
    lines.push(day.name, `${day.focus} · ${day.duration}`)
    if (day.note) lines.push(day.note)
    day.exercises.forEach((exercise, index) => {
      lines.push(`${index + 1}. ${exercise.name}`)
      lines.push(`${exercise.sets} · ${exercise.rest}`)
      if (exercise.alternatives.length > 0) {
        lines.push(
          `备选：${exercise.alternatives.map((alternative) => alternative.name).join('、')}`,
        )
      }
      lines.push('')
    })
  }
  return `${lines.join('\n').trim()}\n`
}

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.left = '-9999px'
  document.body.appendChild(area)
  area.select()
  const copied = document.execCommand('copy')
  area.remove()
  if (!copied) throw new Error('copy failed')
}

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function PlanPage() {
  const [activeId, setActiveId] = useState(splits[0].id)
  const [copied, setCopied] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const firstPanel = useRef(true)
  const active = splits.find((split) => split.id === activeId) ?? splits[0]
  const activeIndex = Math.max(
    0,
    splits.findIndex((split) => split.id === active.id),
  )

  useLayoutEffect(() => {
    const frame = frameRef.current
    const panel = panelRef.current
    if (!frame || !panel) return
    if (prefersReducedMotion()) {
      frame.style.height = 'auto'
      return
    }
    const next = `${panel.offsetHeight}px`
    if (firstPanel.current) {
      firstPanel.current = false
      frame.style.height = next
      return
    }
    const frameId = window.requestAnimationFrame(() => {
      frame.style.height = next
    })
    return () => window.cancelAnimationFrame(frameId)
  }, [activeId])

  useEffect(() => {
    const onResize = () => {
      const frame = frameRef.current
      const panel = panelRef.current
      if (!frame || !panel) return
      frame.style.height = prefersReducedMotion()
        ? 'auto'
        : `${panel.offsetHeight}px`
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeId])

  useEffect(() => {
    if (!copied) return
    const timeoutId = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timeoutId)
  }, [copied])

  async function copyPlan() {
    try {
      await writeClipboard(formatPlan(active))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  function selectSplit(id: string) {
    if (id === activeId) return
    setCopied(false)
    const frame = frameRef.current
    if (frame && !prefersReducedMotion()) {
      frame.style.height = `${frame.getBoundingClientRect().height}px`
    }
    setActiveId(id)
    const bar = tabsRef.current
    if (!bar || bar.getBoundingClientRect().top >= 0) return
    const reduce = prefersReducedMotion()
    bar.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' })
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const current = splits.findIndex((split) => split.id === activeId)
    let next = current
    if (event.key === 'ArrowRight') next = (current + 1) % splits.length
    else if (event.key === 'ArrowLeft') {
      next = (current - 1 + splits.length) % splits.length
    } else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = splits.length - 1
    else return
    event.preventDefault()
    const id = splits[next].id
    selectSplit(id)
    document.getElementById(`plan-tab-${id}`)?.focus()
  }

  return (
    <main className="content-page plan-page">
      <Link className="text-link" to="/">
        返回人体图谱
      </Link>
      <p className="eyebrow">按表练</p>
      <h1>训练计划</h1>
      <p>
        下面三套都可以直接按表练。每套写了星期、动作顺序、组数、次数和组间休息。先选定一套，连续练满
        4 周，再决定要不要换成训练日更多的那套。
      </p>
      <section id="how">
        <h2>怎么练</h2>
        {howTo.slice(0, 3).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          <Link to="/?type=exercise&id=back-squat">杠铃深蹲</Link>
          如果腰或膝守不住，先换成
          <Link to="/?type=exercise&id=goblet-squat">高脚杯深蹲</Link>
          ，组数和次数不变。休息日可以散步，不要把同一天的内容再练一遍。关节刺痛就停这个动作；肌肉酸胀可以继续。
        </p>
      </section>
      <div className="plan-tabs" ref={tabsRef}>
        <div
          aria-label="训练分化"
          className="plan-tabs__bar"
          role="tablist"
          style={{ '--plan-index': activeIndex } as CSSProperties}
        >
          <span aria-hidden="true" className="plan-tabs__thumb" />
          {splits.map((split) => {
            const selected = split.id === active.id
            return (
              <button
                aria-controls={`plan-panel-${split.id}`}
                aria-selected={selected}
                className="plan-tabs__tab"
                id={`plan-tab-${split.id}`}
                key={split.id}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
                onClick={() => selectSplit(split.id)}
                onKeyDown={onTabKeyDown}
              >
                {split.title}
              </button>
            )
          })}
        </div>
        <button
          aria-live="polite"
          className="plan-copy"
          type="button"
          onClick={() => {
            void copyPlan()
          }}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            {copied ? (
              <path
                d="M5 12.5 9.2 17 19 7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            ) : (
              <>
                <rect
                  x="8"
                  y="7"
                  width="11"
                  height="13"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M5 16V5.5A1.5 1.5 0 0 1 6.5 4H15"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
              </>
            )}
          </svg>
          {copied ? '已复制' : '复制这份计划'}
        </button>
      </div>
      <div className="plan-switch" ref={frameRef}>
        <div
          aria-labelledby={`plan-tab-${active.id}`}
          className="plan-switch__panel"
          id={`plan-panel-${active.id}`}
          key={active.id}
          ref={panelRef}
          role="tabpanel"
        >
          <section id={active.id}>
            <h2>{active.title}</h2>
            <p>{active.summary}</p>
            <p className="plan-week">{active.week}</p>
            <div className="plan-days">
              {active.days.map((day) => (
                <article className="theory-card" key={day.name}>
                  <h3>{day.name}</h3>
                  <p className="detail-header__english">
                    {day.focus} · {day.duration}
                  </p>
                  {day.note ? <p>{day.note}</p> : null}
                  <ol className="plan-session">
                    {day.exercises.map((exercise) => (
                      <li key={exercise.id}>
                        <Link to={`/?type=exercise&id=${exercise.id}`}>
                          {exercise.name}
                        </Link>
                        <span className="plan-session__dose">
                          {exercise.sets} · {exercise.rest}
                        </span>
                        {exercise.alternatives.length > 0 ? (
                          <p className="plan-session__alts">
                            <span>备选</span>
                            {exercise.alternatives.map((alternative) => (
                              <Link
                                key={alternative.id}
                                to={`/?type=exercise&id=${alternative.id}`}
                              >
                                {alternative.name}
                              </Link>
                            ))}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <BackToTop />
    </main>
  )
}
