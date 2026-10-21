/* eslint-disable react-refresh/only-export-components */
import type { ReactElement } from 'react'
import type { BodyMapMode, BodyView } from './BodyMap'

export interface BodyMapRegion {
  id: string
  view: BodyView
  shape: ReactElement
}

export const BODY_MAP_VIEWBOX_WIDTH = 320
export const BODY_MAP_VIEWBOX_HEIGHT = 710

const entityAnchors: Record<
  string,
  ReadonlyArray<readonly [number, number]>
> = {
  'pectoralis-major': [
    [120, 180],
    [200, 180],
  ],
  'pectoralis-minor': [
    [137, 181],
    [183, 181],
  ],
  'serratus-anterior': [
    [101, 222],
    [219, 222],
  ],
  'latissimus-dorsi': [
    [120, 235],
    [200, 235],
  ],
  trapezius: [[160, 160]],
  'rhomboid-major': [
    [138, 192],
    [182, 192],
  ],
  'erector-spinae': [
    [148, 270],
    [172, 270],
  ],
  'anterior-deltoid': [
    [91, 164],
    [229, 164],
  ],
  'lateral-deltoid': [
    [82, 183],
    [238, 183],
  ],
  'posterior-deltoid': [
    [88, 174],
    [232, 174],
  ],
  supraspinatus: [
    [126, 154],
    [194, 154],
  ],
  infraspinatus: [
    [124, 187],
    [196, 187],
  ],
  'biceps-brachii': [
    [75, 246],
    [245, 246],
  ],
  brachialis: [
    [78, 284],
    [242, 284],
  ],
  brachioradialis: [
    [68, 335],
    [252, 335],
  ],
  'triceps-brachii': [
    [74, 252],
    [246, 252],
  ],
  'wrist-flexors': [
    [57, 355],
    [263, 355],
  ],
  'wrist-extensors': [
    [56, 355],
    [264, 355],
  ],
  'rectus-abdominis': [[160, 260]],
  'external-oblique': [
    [120, 250],
    [200, 250],
  ],
  'internal-oblique': [
    [130, 290],
    [190, 290],
  ],
  'transversus-abdominis': [[160, 303]],
  'gluteus-maximus': [
    [132, 352],
    [188, 352],
  ],
  'gluteus-medius': [
    [119, 341],
    [201, 341],
  ],
  'hip-adductors': [
    [140, 430],
    [180, 430],
  ],
  iliopsoas: [
    [140, 350],
    [180, 350],
  ],
  'tensor-fasciae-latae': [
    [112, 374],
    [208, 374],
  ],
  'rectus-femoris': [
    [137, 441],
    [183, 441],
  ],
  'vastus-lateralis': [
    [118, 448],
    [202, 448],
  ],
  'vastus-medialis': [
    [151, 490],
    [169, 490],
  ],
  'biceps-femoris': [
    [124, 450],
    [196, 450],
  ],
  semitendinosus: [
    [148, 454],
    [172, 454],
  ],
  semimembranosus: [
    [135, 459],
    [185, 459],
  ],
  gastrocnemius: [
    [126, 576],
    [194, 576],
  ],
  soleus: [
    [132, 620],
    [188, 620],
  ],
  'tibialis-anterior': [
    [126, 590],
    [194, 590],
  ],
  clavicle: [
    [132, 153],
    [188, 153],
  ],
  scapula: [
    [123, 185],
    [197, 185],
  ],
  humerus: [
    [77, 239],
    [243, 239],
  ],
  radius: [
    [59, 350],
    [261, 350],
  ],
  ulna: [
    [69, 350],
    [251, 350],
  ],
  sternum: [[160, 207]],
  ribs: [
    [125, 215],
    [195, 215],
  ],
  'vertebral-column': [[160, 220]],
  pelvis: [[160, 350]],
  femur: [
    [134, 450],
    [186, 450],
  ],
  patella: [
    [135, 530],
    [185, 530],
  ],
  tibia: [
    [131, 600],
    [189, 600],
  ],
  fibula: [
    [117, 600],
    [203, 600],
  ],
  talus: [
    [124, 670],
    [196, 670],
  ],
}

export function getEntityAnchors(entityId: string) {
  return entityAnchors[entityId] ?? []
}

const pairedEllipses = (
  leftCx: number,
  rightCx: number,
  cy: number,
  rx: number,
  ry: number,
) => (
  <>
    <ellipse cx={leftCx} cy={cy} rx={rx} ry={ry} />
    <ellipse cx={rightCx} cy={cy} rx={rx} ry={ry} />
  </>
)

const pairedPaths = (left: string, right: string) => (
  <>
    <path d={left} />
    <path d={right} />
  </>
)

export const muscleRegions: BodyMapRegion[] = [
  {
    id: 'pectoralis-major',
    view: 'front',
    shape: pairedPaths(
      'M105 154 Q132 140 157 158 L154 205 Q124 212 101 188 Z',
      'M215 154 Q188 140 163 158 L166 205 Q196 212 219 188 Z',
    ),
  },
  {
    id: 'pectoralis-minor',
    view: 'front',
    shape: pairedEllipses(137, 183, 181, 10, 24),
  },
  {
    id: 'serratus-anterior',
    view: 'front',
    shape: pairedPaths(
      'M101 194 L119 200 L108 252 L91 244 Z',
      'M219 194 L201 200 L212 252 L229 244 Z',
    ),
  },
  {
    id: 'latissimus-dorsi',
    view: 'back',
    shape: pairedPaths(
      'M105 195 Q127 177 151 190 L145 294 Q112 277 94 235 Z',
      'M215 195 Q193 177 169 190 L175 294 Q208 277 226 235 Z',
    ),
  },
  {
    id: 'trapezius',
    view: 'back',
    shape: <path d="M160 104 L106 154 L128 208 L160 184 L192 208 L214 154 Z" />,
  },
  {
    id: 'rhomboid-major',
    view: 'back',
    shape: pairedPaths(
      'M132 169 L154 180 L150 228 L123 207 Z',
      'M188 169 L166 180 L170 228 L197 207 Z',
    ),
  },
  {
    id: 'erector-spinae',
    view: 'back',
    shape: pairedPaths(
      'M144 221 Q150 210 156 220 L154 330 Q144 326 140 306 Z',
      'M176 221 Q170 210 164 220 L166 330 Q176 326 180 306 Z',
    ),
  },
  {
    id: 'anterior-deltoid',
    view: 'front',
    shape: pairedEllipses(91, 229, 164, 19, 25),
  },
  {
    id: 'lateral-deltoid',
    view: 'front',
    shape: pairedEllipses(82, 238, 183, 15, 29),
  },
  {
    id: 'posterior-deltoid',
    view: 'back',
    shape: pairedEllipses(88, 232, 174, 21, 28),
  },
  {
    id: 'supraspinatus',
    view: 'back',
    shape: pairedEllipses(126, 194, 154, 20, 7),
  },
  {
    id: 'infraspinatus',
    view: 'back',
    shape: pairedPaths(
      'M108 166 L145 174 L124 211 Z',
      'M212 166 L175 174 L196 211 Z',
    ),
  },
  {
    id: 'biceps-brachii',
    view: 'front',
    shape: pairedEllipses(75, 245, 246, 13, 43),
  },
  {
    id: 'brachialis',
    view: 'front',
    shape: pairedEllipses(78, 242, 284, 11, 24),
  },
  {
    id: 'brachioradialis',
    view: 'front',
    shape: pairedPaths(
      'M67 299 Q79 294 82 306 L65 374 Q55 370 57 353 Z',
      'M253 299 Q241 294 238 306 L255 374 Q265 370 263 353 Z',
    ),
  },
  {
    id: 'triceps-brachii',
    view: 'back',
    shape: pairedEllipses(74, 246, 252, 14, 52),
  },
  {
    id: 'wrist-flexors',
    view: 'front',
    shape: pairedPaths(
      'M57 316 L75 320 L59 397 L43 393 Z',
      'M263 316 L245 320 L261 397 L277 393 Z',
    ),
  },
  {
    id: 'wrist-extensors',
    view: 'back',
    shape: pairedPaths(
      'M56 318 L75 314 L62 397 L44 393 Z',
      'M264 318 L245 314 L258 397 L276 393 Z',
    ),
  },
  {
    id: 'rectus-abdominis',
    view: 'front',
    shape: <rect x="137" y="215" width="46" height="112" rx="18" />,
  },
  {
    id: 'external-oblique',
    view: 'front',
    shape: pairedPaths(
      'M111 225 L137 218 L137 318 L109 300 Z',
      'M209 225 L183 218 L183 318 L211 300 Z',
    ),
  },
  {
    id: 'internal-oblique',
    view: 'front',
    shape: pairedPaths(
      'M119 269 L138 256 L138 323 L113 308 Z',
      'M201 269 L182 256 L182 323 L207 308 Z',
    ),
  },
  {
    id: 'transversus-abdominis',
    view: 'front',
    shape: <rect x="126" y="286" width="68" height="34" rx="15" />,
  },
  {
    id: 'gluteus-maximus',
    view: 'back',
    shape: pairedEllipses(132, 188, 352, 34, 38),
  },
  {
    id: 'gluteus-medius',
    view: 'front',
    shape: pairedEllipses(119, 201, 341, 24, 20),
  },
  {
    id: 'hip-adductors',
    view: 'front',
    shape: pairedPaths(
      'M132 374 L157 371 L151 499 L125 466 Z',
      'M188 374 L163 371 L169 499 L195 466 Z',
    ),
  },
  {
    id: 'iliopsoas',
    view: 'front',
    shape: pairedPaths(
      'M135 318 L154 328 L151 390 L126 361 Z',
      'M185 318 L166 328 L169 390 L194 361 Z',
    ),
  },
  {
    id: 'tensor-fasciae-latae',
    view: 'front',
    shape: pairedEllipses(112, 208, 374, 11, 32),
  },
  {
    id: 'rectus-femoris',
    view: 'front',
    shape: pairedEllipses(137, 183, 441, 17, 77),
  },
  {
    id: 'vastus-lateralis',
    view: 'front',
    shape: pairedEllipses(118, 202, 448, 18, 79),
  },
  {
    id: 'vastus-medialis',
    view: 'front',
    shape: pairedEllipses(151, 169, 490, 13, 38),
  },
  {
    id: 'biceps-femoris',
    view: 'back',
    shape: pairedPaths(
      'M111 389 Q128 375 142 390 L133 520 Q113 513 105 481 Z',
      'M209 389 Q192 375 178 390 L187 520 Q207 513 215 481 Z',
    ),
  },
  {
    id: 'semitendinosus',
    view: 'back',
    shape: pairedEllipses(148, 172, 454, 11, 72),
  },
  {
    id: 'semimembranosus',
    view: 'back',
    shape: pairedEllipses(135, 185, 459, 10, 67),
  },
  {
    id: 'gastrocnemius',
    view: 'back',
    shape: pairedEllipses(126, 194, 576, 22, 57),
  },
  {
    id: 'soleus',
    view: 'back',
    shape: pairedEllipses(132, 188, 620, 16, 54),
  },
  {
    id: 'tibialis-anterior',
    view: 'front',
    shape: pairedPaths(
      'M120 535 Q137 527 140 543 L130 659 L112 652 Z',
      'M200 535 Q183 527 180 543 L190 659 L208 652 Z',
    ),
  },
]

export const boneRegions: BodyMapRegion[] = [
  {
    id: 'clavicle',
    view: 'front',
    shape: pairedPaths(
      'M107 155 Q132 143 156 157',
      'M213 155 Q188 143 164 157',
    ),
  },
  {
    id: 'scapula',
    view: 'back',
    shape: pairedPaths(
      'M108 158 L145 169 L122 225 L100 190 Z',
      'M212 158 L175 169 L198 225 L220 190 Z',
    ),
  },
  {
    id: 'humerus',
    view: 'front',
    shape: pairedPaths('M83 185 L71 293', 'M237 185 L249 293'),
  },
  {
    id: 'radius',
    view: 'front',
    shape: pairedPaths('M69 307 L49 395', 'M251 307 L271 395'),
  },
  {
    id: 'ulna',
    view: 'front',
    shape: pairedPaths('M77 307 L61 397', 'M243 307 L259 397'),
  },
  {
    id: 'sternum',
    view: 'front',
    shape: <path d="M160 162 L168 185 L164 252 L156 252 L152 185 Z" />,
  },
  {
    id: 'ribs',
    view: 'front',
    shape: (
      <path d="M160 176 C112 163 103 194 117 240 M160 176 C208 163 217 194 203 240 M160 195 C121 185 115 211 123 250 M160 195 C199 185 205 211 197 250" />
    ),
  },
  {
    id: 'vertebral-column',
    view: 'back',
    shape: <path d="M160 112 L160 332" />,
  },
  {
    id: 'pelvis',
    view: 'front',
    shape: <path d="M109 321 Q160 347 211 321 L199 377 Q160 401 121 377 Z" />,
  },
  {
    id: 'femur',
    view: 'front',
    shape: pairedPaths('M132 382 L135 520', 'M188 382 L185 520'),
  },
  {
    id: 'patella',
    view: 'front',
    shape: pairedEllipses(135, 185, 530, 10, 12),
  },
  {
    id: 'tibia',
    view: 'front',
    shape: pairedPaths('M135 544 L128 660', 'M185 544 L192 660'),
  },
  {
    id: 'fibula',
    view: 'front',
    shape: pairedPaths('M117 545 L116 652', 'M203 545 L204 652'),
  },
  {
    id: 'talus',
    view: 'front',
    shape: pairedEllipses(124, 196, 670, 12, 8),
  },
]

export function getRegions(mode: BodyMapMode, view: BodyView) {
  const regions = mode === 'muscles' ? muscleRegions : boneRegions
  return regions.filter((region) => region.view === view)
}

export function FigureBackdrop({ view }: { view: BodyView }) {
  return (
    <g className="body-map__silhouette" aria-hidden="true">
      <circle cx="160" cy="68" r="42" />
      <path
        d={
          view === 'front'
            ? 'M126 111 Q93 136 84 177 L65 298 L40 399 L64 407 L91 318 L111 286 L104 350 L103 494 L111 535 L105 670 L136 681 L153 550 L167 550 L184 681 L215 670 L209 535 L217 494 L216 350 L209 286 L229 318 L256 407 L280 399 L255 298 L236 177 Q227 136 194 111 Z'
            : 'M125 111 Q95 132 84 178 L65 298 L41 399 L64 407 L91 318 L110 284 L104 348 L102 494 L111 535 L105 670 L136 681 L153 550 L167 550 L184 681 L215 670 L209 535 L218 494 L216 348 L210 284 L229 318 L256 407 L279 399 L255 298 L236 178 Q225 132 195 111 Z'
        }
      />
    </g>
  )
}
