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

const anatomyPath = (d: string) => <path d={d} data-anatomy-region="true" />

const anatomicalOval = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  waist = 0.82,
) =>
  anatomyPath(
    `M ${cx} ${cy - ry}
     C ${cx + rx * waist} ${cy - ry * 0.9}, ${cx + rx} ${cy - ry * 0.35}, ${cx + rx} ${cy}
     C ${cx + rx * 0.92} ${cy + ry * 0.5}, ${cx + rx * 0.55} ${cy + ry * 0.95}, ${cx} ${cy + ry}
     C ${cx - rx * 0.55} ${cy + ry * 0.95}, ${cx - rx * 0.92} ${cy + ry * 0.5}, ${cx - rx} ${cy}
     C ${cx - rx} ${cy - ry * 0.35}, ${cx - rx * waist} ${cy - ry * 0.9}, ${cx} ${cy - ry} Z`,
  )

const pairedEllipses = (
  leftCx: number,
  rightCx: number,
  cy: number,
  rx: number,
  ry: number,
) => (
  <>
    {anatomicalOval(leftCx, cy, rx, ry)}
    {anatomicalOval(rightCx, cy, rx, ry)}
  </>
)

const pairedPaths = (left: string, right: string) => (
  <>
    {anatomyPath(left)}
    {anatomyPath(right)}
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
    shape: pairedPaths(
      'M145 160 C137 169 130 184 128 203 L145 195 L153 171 Z',
      'M175 160 C183 169 190 184 192 203 L175 195 L167 171 Z',
    ),
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
    shape: anatomyPath(
      'M160 104 C151 121 137 132 106 154 C119 163 126 182 128 208 C141 198 151 190 160 184 C169 190 179 198 192 208 C194 182 201 163 214 154 C183 132 169 121 160 104 Z',
    ),
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
    shape: pairedPaths(
      'M108 147 C94 144 81 151 75 165 C78 180 86 188 96 190 C99 173 103 158 108 147 Z',
      'M212 147 C226 144 239 151 245 165 C242 180 234 188 224 190 C221 173 217 158 212 147 Z',
    ),
  },
  {
    id: 'lateral-deltoid',
    view: 'front',
    shape: pairedPaths(
      'M81 155 C66 162 62 178 68 197 C72 210 80 217 87 209 C91 192 93 173 89 158 Z',
      'M239 155 C254 162 258 178 252 197 C248 210 240 217 233 209 C229 192 227 173 231 158 Z',
    ),
  },
  {
    id: 'posterior-deltoid',
    view: 'back',
    shape: pairedPaths(
      'M110 150 C94 145 76 151 68 168 C67 185 77 201 91 204 C96 186 101 167 110 150 Z',
      'M210 150 C226 145 244 151 252 168 C253 185 243 201 229 204 C224 186 219 167 210 150 Z',
    ),
  },
  {
    id: 'supraspinatus',
    view: 'back',
    shape: pairedPaths(
      'M103 153 C119 144 139 145 150 154 C136 160 119 163 105 160 Z',
      'M217 153 C201 144 181 145 170 154 C184 160 201 163 215 160 Z',
    ),
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
    shape: pairedPaths(
      'M80 207 C66 218 62 246 68 275 C72 288 79 290 85 276 C90 250 88 223 80 207 Z',
      'M240 207 C254 218 258 246 252 275 C248 288 241 290 235 276 C230 250 232 223 240 207 Z',
    ),
  },
  {
    id: 'brachialis',
    view: 'front',
    shape: pairedPaths(
      'M70 269 C66 282 68 301 76 309 C85 301 89 285 84 267 Z',
      'M250 269 C254 282 252 301 244 309 C235 301 231 285 236 267 Z',
    ),
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
    shape: pairedPaths(
      'M79 203 C65 216 60 244 65 277 C68 295 77 307 84 291 C91 260 90 226 79 203 Z',
      'M241 203 C255 216 260 244 255 277 C252 295 243 307 236 291 C229 260 230 226 241 203 Z',
    ),
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
    shape: anatomyPath(
      'M145 213 Q160 207 175 213 L181 233 L178 322 Q160 331 142 322 L139 233 Z',
    ),
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
    shape: anatomyPath('M126 286 Q160 276 194 286 L191 317 Q160 326 129 317 Z'),
  },
  {
    id: 'gluteus-maximus',
    view: 'back',
    shape: pairedPaths(
      'M158 323 C145 313 118 318 105 337 C101 356 110 379 132 389 C148 384 157 367 158 345 Z',
      'M162 323 C175 313 202 318 215 337 C219 356 210 379 188 389 C172 384 163 367 162 345 Z',
    ),
  },
  {
    id: 'gluteus-medius',
    view: 'front',
    shape: pairedPaths(
      'M143 321 C126 313 108 318 98 335 C109 349 126 356 143 352 Z',
      'M177 321 C194 313 212 318 222 335 C211 349 194 356 177 352 Z',
    ),
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
    shape: pairedPaths(
      'M108 347 C99 357 98 380 106 405 L117 397 L121 354 Z',
      'M212 347 C221 357 222 380 214 405 L203 397 L199 354 Z',
    ),
  },
  {
    id: 'rectus-femoris',
    view: 'front',
    shape: pairedPaths(
      'M139 367 C126 389 123 432 128 478 C131 506 141 520 149 491 C154 445 153 399 139 367 Z',
      'M181 367 C194 389 197 432 192 478 C189 506 179 520 171 491 C166 445 167 399 181 367 Z',
    ),
  },
  {
    id: 'vastus-lateralis',
    view: 'front',
    shape: pairedPaths(
      'M119 372 C102 397 99 440 106 483 C110 510 121 526 130 505 C134 459 134 410 119 372 Z',
      'M201 372 C218 397 221 440 214 483 C210 510 199 526 190 505 C186 459 186 410 201 372 Z',
    ),
  },
  {
    id: 'vastus-medialis',
    view: 'front',
    shape: pairedPaths(
      'M153 452 C140 465 136 492 143 516 C151 523 158 513 158 496 C158 477 157 461 153 452 Z',
      'M167 452 C180 465 184 492 177 516 C169 523 162 513 162 496 C162 477 163 461 167 452 Z',
    ),
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
    shape: pairedPaths(
      'M150 385 C140 408 138 455 143 502 C146 519 153 516 156 498 L158 400 Z',
      'M170 385 C180 408 182 455 177 502 C174 519 167 516 164 498 L162 400 Z',
    ),
  },
  {
    id: 'semimembranosus',
    view: 'back',
    shape: pairedPaths(
      'M137 391 C124 420 122 465 128 508 C132 523 139 514 143 494 L148 397 Z',
      'M183 391 C196 420 198 465 192 508 C188 523 181 514 177 494 L172 397 Z',
    ),
  },
  {
    id: 'gastrocnemius',
    view: 'back',
    shape: pairedPaths(
      'M123 532 C104 550 105 590 119 619 C126 633 135 618 140 592 C143 565 137 542 123 532 Z',
      'M197 532 C216 550 215 590 201 619 C194 633 185 618 180 592 C177 565 183 542 197 532 Z',
    ),
  },
  {
    id: 'soleus',
    view: 'back',
    shape: pairedPaths(
      'M124 584 C114 607 117 645 128 663 C137 655 143 624 139 594 Z',
      'M196 584 C206 607 203 645 192 663 C183 655 177 624 181 594 Z',
    ),
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

export interface MuscleLabelLayout {
  x: number
  y: number
  targetX: number
  targetY: number
  align: 'start' | 'middle' | 'end'
  placement: 'internal' | 'callout'
  priority: 'primary' | 'secondary'
}

export const muscleLabelLayouts: Record<string, MuscleLabelLayout> = {
  'pectoralis-major': {
    x: 160,
    y: 178,
    targetX: 160,
    targetY: 178,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  'pectoralis-minor': {
    x: 18,
    y: 145,
    targetX: 137,
    targetY: 181,
    align: 'start',
    placement: 'callout',
    priority: 'secondary',
  },
  'serratus-anterior': {
    x: 20,
    y: 215,
    targetX: 101,
    targetY: 222,
    align: 'start',
    placement: 'callout',
    priority: 'primary',
  },
  'anterior-deltoid': {
    x: 18,
    y: 165,
    targetX: 91,
    targetY: 164,
    align: 'start',
    placement: 'callout',
    priority: 'primary',
  },
  'lateral-deltoid': {
    x: 302,
    y: 190,
    targetX: 238,
    targetY: 183,
    align: 'end',
    placement: 'callout',
    priority: 'primary',
  },
  'biceps-brachii': {
    x: 18,
    y: 252,
    targetX: 75,
    targetY: 246,
    align: 'start',
    placement: 'callout',
    priority: 'primary',
  },
  brachialis: {
    x: 18,
    y: 285,
    targetX: 78,
    targetY: 284,
    align: 'start',
    placement: 'callout',
    priority: 'secondary',
  },
  brachioradialis: {
    x: 18,
    y: 337,
    targetX: 68,
    targetY: 335,
    align: 'start',
    placement: 'callout',
    priority: 'secondary',
  },
  'wrist-flexors': {
    x: 20,
    y: 380,
    targetX: 57,
    targetY: 355,
    align: 'start',
    placement: 'callout',
    priority: 'secondary',
  },
  'rectus-abdominis': {
    x: 160,
    y: 266,
    targetX: 160,
    targetY: 266,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  'external-oblique': {
    x: 103,
    y: 272,
    targetX: 120,
    targetY: 250,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  'internal-oblique': {
    x: 292,
    y: 298,
    targetX: 190,
    targetY: 290,
    align: 'end',
    placement: 'callout',
    priority: 'secondary',
  },
  'transversus-abdominis': {
    x: 160,
    y: 309,
    targetX: 160,
    targetY: 303,
    align: 'middle',
    placement: 'internal',
    priority: 'secondary',
  },
  'gluteus-medius': {
    x: 292,
    y: 345,
    targetX: 201,
    targetY: 341,
    align: 'end',
    placement: 'callout',
    priority: 'primary',
  },
  'hip-adductors': {
    x: 160,
    y: 426,
    targetX: 160,
    targetY: 430,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  iliopsoas: {
    x: 160,
    y: 353,
    targetX: 160,
    targetY: 350,
    align: 'middle',
    placement: 'internal',
    priority: 'secondary',
  },
  'tensor-fasciae-latae': {
    x: 20,
    y: 370,
    targetX: 112,
    targetY: 374,
    align: 'start',
    placement: 'callout',
    priority: 'secondary',
  },
  'rectus-femoris': {
    x: 137,
    y: 442,
    targetX: 137,
    targetY: 442,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  'vastus-lateralis': {
    x: 292,
    y: 456,
    targetX: 202,
    targetY: 448,
    align: 'end',
    placement: 'callout',
    priority: 'primary',
  },
  'vastus-medialis': {
    x: 292,
    y: 500,
    targetX: 169,
    targetY: 490,
    align: 'end',
    placement: 'callout',
    priority: 'secondary',
  },
  'tibialis-anterior': {
    x: 292,
    y: 592,
    targetX: 194,
    targetY: 590,
    align: 'end',
    placement: 'callout',
    priority: 'primary',
  },
  trapezius: {
    x: 160,
    y: 145,
    targetX: 160,
    targetY: 145,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  'posterior-deltoid': {
    x: 20,
    y: 174,
    targetX: 88,
    targetY: 174,
    align: 'start',
    placement: 'callout',
    priority: 'primary',
  },
  supraspinatus: {
    x: 302,
    y: 150,
    targetX: 194,
    targetY: 154,
    align: 'end',
    placement: 'callout',
    priority: 'secondary',
  },
  infraspinatus: {
    x: 302,
    y: 185,
    targetX: 196,
    targetY: 187,
    align: 'end',
    placement: 'callout',
    priority: 'primary',
  },
  'rhomboid-major': {
    x: 160,
    y: 196,
    targetX: 160,
    targetY: 192,
    align: 'middle',
    placement: 'internal',
    priority: 'secondary',
  },
  'latissimus-dorsi': {
    x: 160,
    y: 238,
    targetX: 160,
    targetY: 235,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  'erector-spinae': {
    x: 160,
    y: 282,
    targetX: 160,
    targetY: 270,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  'triceps-brachii': {
    x: 20,
    y: 252,
    targetX: 74,
    targetY: 252,
    align: 'start',
    placement: 'callout',
    priority: 'primary',
  },
  'wrist-extensors': {
    x: 20,
    y: 355,
    targetX: 56,
    targetY: 355,
    align: 'start',
    placement: 'callout',
    priority: 'secondary',
  },
  'gluteus-maximus': {
    x: 160,
    y: 357,
    targetX: 160,
    targetY: 352,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  'biceps-femoris': {
    x: 20,
    y: 454,
    targetX: 124,
    targetY: 450,
    align: 'start',
    placement: 'callout',
    priority: 'primary',
  },
  semitendinosus: {
    x: 302,
    y: 440,
    targetX: 172,
    targetY: 454,
    align: 'end',
    placement: 'callout',
    priority: 'secondary',
  },
  semimembranosus: {
    x: 302,
    y: 475,
    targetX: 185,
    targetY: 459,
    align: 'end',
    placement: 'callout',
    priority: 'secondary',
  },
  gastrocnemius: {
    x: 160,
    y: 575,
    targetX: 160,
    targetY: 576,
    align: 'middle',
    placement: 'internal',
    priority: 'primary',
  },
  soleus: {
    x: 292,
    y: 625,
    targetX: 188,
    targetY: 620,
    align: 'end',
    placement: 'callout',
    priority: 'secondary',
  },
}

export function getRegions(mode: BodyMapMode, view: BodyView) {
  const regions = mode === 'muscles' ? muscleRegions : boneRegions
  return regions.filter((region) => region.view === view)
}

export function FigureBackdrop({ view }: { view: BodyView }) {
  const isFront = view === 'front'
  return (
    <g
      aria-hidden="true"
      className="body-map__anatomy"
      data-proportion-system="shared"
      data-testid="anatomy-line-art"
    >
      <path
        className="body-map__anatomy-base"
        d="M143 30 C131 39 126 55 129 73 C132 91 143 103 151 108 L148 123 C130 127 110 136 97 150 C88 160 82 177 79 198 L66 286 L42 382 C39 395 46 405 58 408 C70 411 77 403 80 391 L99 312 L109 280 L105 344 C100 373 99 414 102 472 C103 500 108 520 110 537 L104 649 C103 665 111 679 126 683 C140 686 148 676 149 660 L154 550 L166 550 L171 660 C172 676 180 686 194 683 C209 679 217 665 216 649 L210 537 C212 520 217 500 218 472 C221 414 220 373 215 344 L211 280 L221 312 L240 391 C243 403 250 411 262 408 C274 405 281 395 278 382 L254 286 L241 198 C238 177 232 160 223 150 C210 136 190 127 172 123 L169 108 C177 103 188 91 191 73 C194 55 189 39 177 30 C167 22 153 22 143 30 Z"
      />

      <g className="body-map__anatomy-contours">
        <path
          className="body-map__anatomy-contour"
          d="M143 30 C151 23 169 23 177 30"
        />
        <path
          className="body-map__anatomy-contour"
          d="M132 61 Q160 76 188 61"
        />
        <path
          className="body-map__anatomy-contour"
          d="M151 108 Q160 114 169 108"
        />
        <path
          className="body-map__anatomy-contour"
          d="M148 123 Q160 137 172 123"
        />
        <path
          className="body-map__anatomy-contour"
          d="M97 150 Q122 140 148 153"
        />
        <path
          className="body-map__anatomy-contour"
          d="M223 150 Q198 140 172 153"
        />
        <path
          className="body-map__anatomy-contour"
          d="M79 198 Q91 225 99 250"
        />
        <path
          className="body-map__anatomy-contour"
          d="M241 198 Q229 225 221 250"
        />
        <path
          className="body-map__anatomy-contour"
          d="M109 280 Q128 319 105 344"
        />
        <path
          className="body-map__anatomy-contour"
          d="M211 280 Q192 319 215 344"
        />
        <path
          className="body-map__anatomy-contour"
          d="M105 344 Q132 365 160 354 Q188 365 215 344"
        />
        <path
          className="body-map__anatomy-contour"
          d="M102 472 Q130 489 154 480"
        />
        <path
          className="body-map__anatomy-contour"
          d="M218 472 Q190 489 166 480"
        />
        <path
          className="body-map__anatomy-contour"
          d="M110 537 Q132 546 154 535"
        />
        <path
          className="body-map__anatomy-contour"
          d="M210 537 Q188 546 166 535"
        />
        <path
          className="body-map__anatomy-contour"
          d="M104 649 Q126 657 149 647"
        />
        <path
          className="body-map__anatomy-contour"
          d="M216 649 Q194 657 171 647"
        />
      </g>

      <g className="body-map__anatomy-fibers">
        {(isFront
          ? [
              'M112 160 Q135 171 155 174',
              'M208 160 Q185 171 165 174',
              'M109 184 Q134 194 154 196',
              'M211 184 Q186 194 166 196',
              'M145 220 L145 316',
              'M160 214 L160 324',
              'M175 220 L175 316',
              'M118 230 Q126 250 130 276',
              'M202 230 Q194 250 190 276',
              'M122 388 Q137 425 139 500',
              'M198 388 Q183 425 181 500',
              'M108 409 Q119 452 121 505',
              'M212 409 Q201 452 199 505',
              'M119 550 Q128 588 125 637',
              'M201 550 Q192 588 195 637',
              'M68 220 Q74 252 70 290',
              'M252 220 Q246 252 250 290',
            ]
          : [
              'M160 119 L160 330',
              'M117 153 Q143 161 154 179',
              'M203 153 Q177 161 166 179',
              'M105 188 Q129 205 145 238',
              'M215 188 Q191 205 175 238',
              'M110 219 Q132 245 143 287',
              'M210 219 Q188 245 177 287',
              'M145 222 L148 320',
              'M175 222 L172 320',
              'M112 350 Q135 339 157 356',
              'M208 350 Q185 339 163 356',
              'M117 389 Q128 438 129 505',
              'M203 389 Q192 438 191 505',
              'M141 388 Q147 440 148 510',
              'M179 388 Q173 440 172 510',
              'M113 550 Q128 574 129 629',
              'M207 550 Q192 574 191 629',
              'M68 220 Q75 252 70 290',
              'M252 220 Q245 252 250 290',
            ]
        ).map((d) => (
          <path className="body-map__anatomy-fiber" d={d} key={d} />
        ))}
      </g>
    </g>
  )
}
