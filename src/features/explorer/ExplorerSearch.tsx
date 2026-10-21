import { useId, useMemo, useState, type KeyboardEvent } from 'react'
import { anatomyData } from '../../data/anatomyData'
import type { BodyRegion, ExerciseEquipment } from '../../domain/anatomy'
import type { ExplorerEntityType, ExplorerSelection } from './explorerState'

type TypeFilter = ExplorerEntityType | 'all'

interface SearchItem extends ExplorerSelection {
  nameZh: string
  nameEn: string
  metadata: string
  region?: BodyRegion
  equipment?: ExerciseEquipment
}

const typeLabels: Record<ExplorerEntityType, string> = {
  muscle: '肌肉',
  bone: '骨骼',
  'joint-action': '关节动作',
  exercise: '训练动作',
}

const regionLabels: Record<BodyRegion, string> = {
  chest: '胸部',
  back: '背部',
  shoulders: '肩部',
  arms: '手臂',
  core: '核心',
  hips: '髋部',
  thighs: '大腿',
  'lower-legs': '小腿',
  trunk: '躯干',
}

const equipmentLabels: Record<ExerciseEquipment, string> = {
  bodyweight: '自重',
  barbell: '杠铃',
  dumbbell: '哑铃',
  cable: '绳索',
  machine: '器械',
  kettlebell: '壶铃',
  'resistance-band': '弹力带',
  bench: '训练凳',
}

const searchItems: SearchItem[] = [
  ...anatomyData.muscles.map((entity) => ({
    type: 'muscle' as const,
    id: entity.id,
    nameZh: entity.nameZh,
    nameEn: entity.nameEn,
    metadata: regionLabels[entity.bodyRegion],
    region: entity.bodyRegion,
  })),
  ...anatomyData.bones.map((entity) => ({
    type: 'bone' as const,
    id: entity.id,
    nameZh: entity.nameZh,
    nameEn: entity.nameEn,
    metadata: regionLabels[entity.bodyRegion],
    region: entity.bodyRegion,
  })),
  ...anatomyData.jointActions.map((entity) => ({
    type: 'joint-action' as const,
    id: entity.id,
    nameZh: entity.nameZh,
    nameEn: entity.nameEn,
    metadata:
      anatomyData.joints.find(({ id }) => id === entity.jointId)?.nameZh ??
      entity.jointId,
  })),
  ...anatomyData.exercises.map((entity) => ({
    type: 'exercise' as const,
    id: entity.id,
    nameZh: entity.nameZh,
    nameEn: entity.nameEn,
    metadata: equipmentLabels[entity.equipment],
    equipment: entity.equipment,
  })),
]

export function ExplorerSearch({
  onSelect,
}: {
  onSelect: (selection: ExplorerSelection) => void
}) {
  const listboxId = useId()
  const [query, setQuery] = useState('')
  const [type, setType] = useState<TypeFilter>('all')
  const [region, setRegion] = useState<BodyRegion | 'all'>('all')
  const [equipment, setEquipment] = useState<ExerciseEquipment | 'all'>('all')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [open, setOpen] = useState(false)

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    if (!normalized) return []
    return searchItems.filter((item) => {
      const matchesText = [item.nameZh, item.nameEn, item.id].some((value) =>
        value.toLocaleLowerCase().includes(normalized),
      )
      return (
        matchesText &&
        (type === 'all' || item.type === type) &&
        (region === 'all' || item.region === region) &&
        (equipment === 'all' || item.equipment === equipment)
      )
    })
  }, [equipment, query, region, type])

  const choose = (item: SearchItem) => {
    onSelect({ type: item.type, id: item.id })
    setOpen(false)
    setActiveIndex(-1)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      return
    }
    if (!results.length) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((current) => {
        const delta = event.key === 'ArrowDown' ? 1 : -1
        return (current + delta + results.length) % results.length
      })
    }
    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      choose(results[activeIndex])
    }
  }

  const clear = () => {
    setQuery('')
    setOpen(false)
    setActiveIndex(-1)
  }

  return (
    <div className="explorer-search" role="search">
      <div className="explorer-search__input">
        <label className="sr-only" htmlFor="anatomy-search">
          搜索肌肉、骨骼、关节动作或训练动作
        </label>
        <input
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined
          }
          id="anatomy-search"
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(Boolean(event.target.value))
            setActiveIndex(-1)
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="搜索名称或 ID"
          role="combobox"
          type="search"
          value={query}
        />
        {query && (
          <button aria-label="清除搜索" onClick={clear} type="button">
            ×
          </button>
        )}
      </div>

      <div className="explorer-search__filters">
        <label>
          <span className="sr-only">实体类型筛选</span>
          <select
            aria-label="实体类型筛选"
            onChange={(event) => setType(event.target.value as TypeFilter)}
            value={type}
          >
            <option value="all">全部类型</option>
            <option value="muscle">肌肉</option>
            <option value="bone">骨骼</option>
            <option value="joint-action">关节动作</option>
            <option value="exercise">训练动作</option>
          </select>
        </label>
        {(type === 'all' || type === 'muscle') && (
          <select
            aria-label="身体区域筛选"
            onChange={(event) =>
              setRegion(event.target.value as BodyRegion | 'all')
            }
            value={region}
          >
            <option value="all">全部区域</option>
            {Object.entries(regionLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
        {(type === 'all' || type === 'exercise') && (
          <select
            aria-label="器械筛选"
            onChange={(event) =>
              setEquipment(event.target.value as ExerciseEquipment | 'all')
            }
            value={equipment}
          >
            <option value="all">全部器械</option>
            {Object.entries(equipmentLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
      </div>

      {open && (
        <div className="explorer-search__results" id={listboxId} role="listbox">
          {results.length ? (
            results.map((item, index) => (
              <button
                aria-selected={index === activeIndex}
                className="explorer-search__result"
                id={`${listboxId}-${index}`}
                key={`${item.type}-${item.id}`}
                onClick={() => choose(item)}
                role="option"
                type="button"
              >
                <span>
                  <strong>{item.nameZh}</strong>
                  <small>{item.nameEn}</small>
                </span>
                <span className="search-result__meta">
                  {typeLabels[item.type]} · {item.metadata}
                </span>
              </button>
            ))
          ) : (
            <p className="explorer-search__empty">没有找到匹配结果</p>
          )}
        </div>
      )}
    </div>
  )
}
