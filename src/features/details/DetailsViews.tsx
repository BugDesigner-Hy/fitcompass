import { useState } from 'react'
import { anatomyData } from '../../data/anatomyData'
import { getExerciseMedia } from '../../data/exerciseMedia'
import type {
  BodyRegion,
  ExerciseDifficulty,
  ExerciseEquipment,
  MuscleRole,
  ReviewStatus,
} from '../../domain/anatomy'
import {
  getBoneById,
  getExerciseById,
  getExercisesForMuscle,
  getJointActionById,
  getJointActionsForMuscle,
  getMuscleById,
  getMusclesForExercise,
  getMusclesForJointAction,
} from '../../domain/anatomyGraph'
import type { ExplorerSelection } from '../explorer/explorerState'
import { ExerciseMedia } from './ExerciseMedia'

const roleLabels: Record<MuscleRole, string> = {
  agonist: '主动肌',
  synergist: '协同肌',
  stabilizer: '稳定肌',
  antagonist: '拮抗肌',
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
  machine: '固定器械',
  kettlebell: '壶铃',
  'resistance-band': '弹力带',
  bench: '训练凳',
}

const difficultyLabels: Record<ExerciseDifficulty, string> = {
  beginner: '入门',
  intermediate: '中级',
  advanced: '进阶',
}

type SelectEntity = (selection: ExplorerSelection) => void

function EntityButton({
  selection,
  children,
  onSelect,
}: {
  selection: ExplorerSelection
  children: React.ReactNode
  onSelect: SelectEntity
}) {
  return (
    <button
      className="entity-link"
      onClick={() => onSelect(selection)}
      type="button"
    >
      {children}
    </button>
  )
}

function ReviewBadge({ status }: { status: ReviewStatus }) {
  return (
    <span className={`review-badge review-badge--${status}`}>
      {status === 'draft' ? '草稿 · 待专业审核' : '已专业审核'}
    </span>
  )
}

function RoleLabel({ role }: { role: MuscleRole }) {
  return (
    <span className={`role-label role--${role}`}>
      <i aria-hidden="true" />
      {roleLabels[role]}
    </span>
  )
}

function SourceLinks({ sourceIds }: { sourceIds: readonly string[] }) {
  const sources = sourceIds.flatMap((id) => {
    const source = anatomyData.sources.find((candidate) => candidate.id === id)
    return source ? [source] : []
  })
  return (
    <footer className="detail-sources">
      <h3>来源与署名</h3>
      {sources.map((source) => (
        <a href={source.url} key={source.id} rel="noreferrer" target="_blank">
          {source.title} · {source.license}
        </a>
      ))}
    </footer>
  )
}

function DetailHeader({
  eyebrow,
  nameZh,
  nameEn,
  reviewStatus,
}: {
  eyebrow: string
  nameZh: string
  nameEn: string
  reviewStatus: ReviewStatus
}) {
  return (
    <header className="detail-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id="details-title">{nameZh}</h2>
      <p className="detail-header__english">{nameEn}</p>
      <ReviewBadge status={reviewStatus} />
    </header>
  )
}

export function WelcomeDetail({ onSelect }: { onSelect: SelectEntity }) {
  return (
    <div className="detail-view detail-welcome">
      <p className="eyebrow">结构详情</p>
      <h2 id="details-title">开始探索</h2>
      <p>点击人体图谱中的结构，或搜索中文名、英文名和稳定 ID。</p>
      <div className="quick-links" aria-label="快速开始">
        <EntityButton
          onSelect={onSelect}
          selection={{ type: 'joint-action', id: 'shoulder-flexion' }}
        >
          肩屈
        </EntityButton>
        <EntityButton
          onSelect={onSelect}
          selection={{ type: 'joint-action', id: 'elbow-flexion' }}
        >
          屈肘
        </EntityButton>
        <EntityButton
          onSelect={onSelect}
          selection={{ type: 'exercise', id: 'barbell-bench-press' }}
        >
          杠铃卧推
        </EntityButton>
        <EntityButton
          onSelect={onSelect}
          selection={{ type: 'exercise', id: 'back-squat' }}
        >
          杠铃深蹲
        </EntityButton>
      </div>
    </div>
  )
}

function MuscleDetail({
  id,
  onSelect,
}: {
  id: string
  onSelect: SelectEntity
}) {
  const muscle = getMuscleById(anatomyData, id)
  if (!muscle) return <WelcomeDetail onSelect={onSelect} />
  const actions = getJointActionsForMuscle(anatomyData, id)
  const exercises = getExercisesForMuscle(anatomyData, id)
  return (
    <article className="detail-view">
      <DetailHeader
        eyebrow={regionLabels[muscle.bodyRegion]}
        nameEn={muscle.nameEn}
        nameZh={muscle.nameZh}
        reviewStatus={muscle.reviewStatus}
      />
      <p>{muscle.summary}</p>
      <section>
        <h3>主要功能</h3>
        <ul>
          {muscle.functions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      {(muscle.origin || muscle.insertion) && (
        <section>
          <h3>起止点</h3>
          {muscle.origin && <p>起点：{muscle.origin}</p>}
          {muscle.insertion && <p>止点：{muscle.insertion}</p>}
        </section>
      )}
      <section>
        <h3>相关关节动作</h3>
        <div className="relation-list">
          {actions.map(({ jointAction, role }) => (
            <div className="relation-row" key={jointAction.id}>
              <EntityButton
                onSelect={onSelect}
                selection={{ type: 'joint-action', id: jointAction.id }}
              >
                {jointAction.nameZh}
              </EntityButton>
              <RoleLabel role={role} />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3>相关训练动作</h3>
        <div className="exercise-card-list">
          {exercises.map(({ exercise, role }) => (
            <div
              className="exercise-card exercise-card--compact"
              key={exercise.id}
            >
              <ExerciseMedia
                compact
                exerciseName={exercise.nameZh}
                media={getExerciseMedia(exercise.id)}
              />
              <EntityButton
                onSelect={onSelect}
                selection={{ type: 'exercise', id: exercise.id }}
              >
                {exercise.nameZh}
              </EntityButton>
              <small>{equipmentLabels[exercise.equipment]}</small>
              <RoleLabel role={role} />
            </div>
          ))}
        </div>
      </section>
      <SourceLinks sourceIds={muscle.sourceIds} />
    </article>
  )
}

function BoneDetail({ id, onSelect }: { id: string; onSelect: SelectEntity }) {
  const bone = getBoneById(anatomyData, id)
  if (!bone) return <WelcomeDetail onSelect={onSelect} />
  const relatedJoints = bone.relatedJointIds.flatMap((jointId) => {
    const joint = anatomyData.joints.find(({ id }) => id === jointId)
    return joint ? [joint] : []
  })
  return (
    <article className="detail-view">
      <DetailHeader
        eyebrow={regionLabels[bone.bodyRegion]}
        nameEn={bone.nameEn}
        nameZh={bone.nameZh}
        reviewStatus={bone.reviewStatus}
      />
      <p>{bone.summary}</p>
      <section>
        <h3>相关关节</h3>
        <ul>
          {relatedJoints.map((joint) => (
            <li key={joint.id}>
              {joint.nameZh} <small>{joint.nameEn}</small>
            </li>
          ))}
        </ul>
      </section>
      <SourceLinks sourceIds={bone.sourceIds} />
    </article>
  )
}

function JointActionDetail({
  id,
  onSelect,
}: {
  id: string
  onSelect: SelectEntity
}) {
  const action = getJointActionById(anatomyData, id)
  if (!action) return <WelcomeDetail onSelect={onSelect} />
  const joint = anatomyData.joints.find(({ id }) => id === action.jointId)
  const related = getMusclesForJointAction(anatomyData, id)
  return (
    <article className="detail-view">
      <DetailHeader
        eyebrow={joint?.nameZh ?? action.jointId}
        nameEn={action.nameEn}
        nameZh={action.nameZh}
        reviewStatus={action.reviewStatus}
      />
      <p>{action.description}</p>
      <section>
        <h3>参与肌肉</h3>
        <div className="relation-list">
          {related.map(({ muscle, role }) => (
            <div className="relation-row" key={muscle.id}>
              <EntityButton
                onSelect={onSelect}
                selection={{ type: 'muscle', id: muscle.id }}
              >
                {muscle.nameZh}
              </EntityButton>
              <RoleLabel role={role} />
            </div>
          ))}
        </div>
      </section>
      <SourceLinks sourceIds={action.sourceIds} />
    </article>
  )
}

function ExerciseDetail({
  id,
  onSelect,
}: {
  id: string
  onSelect: SelectEntity
}) {
  const [stepsExpanded, setStepsExpanded] = useState(false)
  const exercise = getExerciseById(anatomyData, id)
  if (!exercise) return <WelcomeDetail onSelect={onSelect} />
  const related = getMusclesForExercise(anatomyData, id)
  return (
    <article className="detail-view">
      <DetailHeader
        eyebrow={`${equipmentLabels[exercise.equipment]} · ${difficultyLabels[exercise.difficulty]}`}
        nameEn={exercise.nameEn}
        nameZh={exercise.nameZh}
        reviewStatus={exercise.reviewStatus}
      />
      <ExerciseMedia
        exerciseName={exercise.nameZh}
        media={getExerciseMedia(exercise.id)}
      />
      <section>
        <h3>目标肌肉</h3>
        <div className="relation-list">
          {related.map(({ muscle, role }) => (
            <div className="relation-row" key={muscle.id}>
              <EntityButton
                onSelect={onSelect}
                selection={{ type: 'muscle', id: muscle.id }}
              >
                {muscle.nameZh}
              </EntityButton>
              <RoleLabel role={role} />
            </div>
          ))}
        </div>
      </section>
      <section className="exercise-steps">
        <button
          aria-expanded={stepsExpanded}
          onClick={() => setStepsExpanded((expanded) => !expanded)}
          type="button"
        >
          {stepsExpanded ? '收起动作步骤' : '展开动作步骤'}
        </button>
        {stepsExpanded && (
          <ol aria-label="动作步骤">
            {exercise.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        )}
      </section>
      <SourceLinks sourceIds={exercise.sourceIds} />
    </article>
  )
}

export function DetailsView({
  selection,
  onSelect,
}: {
  selection?: ExplorerSelection
  onSelect: SelectEntity
}) {
  if (!selection) return <WelcomeDetail onSelect={onSelect} />
  switch (selection.type) {
    case 'muscle':
      return <MuscleDetail id={selection.id} onSelect={onSelect} />
    case 'bone':
      return <BoneDetail id={selection.id} onSelect={onSelect} />
    case 'joint-action':
      return <JointActionDetail id={selection.id} onSelect={onSelect} />
    case 'exercise':
      return <ExerciseDetail id={selection.id} onSelect={onSelect} />
  }
}
