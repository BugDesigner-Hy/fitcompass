import { useSearchParams } from 'react-router-dom'
import { anatomyData } from '../../data/anatomyData'
import type { MuscleRole } from '../../domain/anatomy'
import {
  getBoneById,
  getExerciseById,
  getJointActionById,
  getMuscleById,
  getMusclesForExercise,
  getMusclesForJointAction,
} from '../../domain/anatomyGraph'
import { preferredMuscleView } from '../body-map/anatomyIndex'
import type { BodyMapMode, BodyView } from '../body-map/BodyMap'

export type ExplorerEntityType = 'muscle' | 'bone' | 'joint-action' | 'exercise'

export interface ExplorerSelection {
  type: ExplorerEntityType
  id: string
}

export interface MuscleHighlight {
  muscleId: string
  role: MuscleRole
}

const entityExists = (selection: ExplorerSelection) => {
  switch (selection.type) {
    case 'muscle':
      return Boolean(getMuscleById(anatomyData, selection.id))
    case 'bone':
      return Boolean(getBoneById(anatomyData, selection.id))
    case 'joint-action':
      return Boolean(getJointActionById(anatomyData, selection.id))
    case 'exercise':
      return Boolean(getExerciseById(anatomyData, selection.id))
  }
}

const entityTypes = new Set<ExplorerEntityType>([
  'muscle',
  'bone',
  'joint-action',
  'exercise',
])

export function parseExplorerSearch(searchParams: URLSearchParams) {
  const rawType = searchParams.get('type')
  const id = searchParams.get('id')
  const candidate =
    rawType && id && entityTypes.has(rawType as ExplorerEntityType)
      ? { type: rawType as ExplorerEntityType, id }
      : undefined
  return {
    mode: 'muscles' as const,
    view:
      searchParams.get('view') === 'back'
        ? ('back' as const)
        : ('front' as const),
    selection:
      candidate && candidate.type !== 'bone' && entityExists(candidate)
        ? candidate
        : undefined,
  }
}

function viewForRelatedMuscles(
  currentView: BodyView,
  muscleIds: readonly string[],
) {
  const preferred = muscleIds.map(preferredMuscleView)
  return preferred.includes(currentView)
    ? currentView
    : (preferred[0] ?? currentView)
}

export function useExplorerState() {
  const [searchParams, setSearchParams] = useSearchParams()
  const state = parseExplorerSearch(searchParams)

  const update = (
    changes: Partial<{
      mode: BodyMapMode
      view: BodyView
      selection?: ExplorerSelection
    }>,
  ) => {
    const next = new URLSearchParams(searchParams)
    const mode = changes.mode ?? state.mode
    const view = changes.view ?? state.view
    next.set('mode', mode)
    next.set('view', view)

    if ('selection' in changes) {
      if (changes.selection) {
        next.set('type', changes.selection.type)
        next.set('id', changes.selection.id)
      } else {
        next.delete('type')
        next.delete('id')
      }
    }
    setSearchParams(next)
  }

  const select = (selection: ExplorerSelection) => {
    let mode = state.mode
    let view = state.view
    if (selection.type === 'muscle') mode = 'muscles'
    if (selection.type === 'bone') return
    if (selection.type === 'joint-action') {
      mode = 'muscles'
      view = viewForRelatedMuscles(
        view,
        getMusclesForJointAction(anatomyData, selection.id).map(
          ({ muscle }) => muscle.id,
        ),
      )
    }
    if (selection.type === 'exercise') mode = 'muscles'
    update({ mode, view, selection })
  }

  const highlightedMuscles: MuscleHighlight[] =
    state.selection?.type === 'joint-action'
      ? getMusclesForJointAction(anatomyData, state.selection.id).map(
          ({ muscle, role }) => ({ muscleId: muscle.id, role }),
        )
      : state.selection?.type === 'exercise'
        ? getMusclesForExercise(anatomyData, state.selection.id).map(
            ({ muscle, role }) => ({ muscleId: muscle.id, role }),
          )
        : []

  return {
    ...state,
    highlightedMuscles,
    setMode: (mode: BodyMapMode) => update({ mode, selection: undefined }),
    setView: (view: BodyView) => update({ view }),
    select,
  }
}
