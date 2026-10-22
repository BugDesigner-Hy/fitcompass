export interface DatasetMotion {
  src: string
  stillSrc: string | null
  sourceUrl: string
  upstreamName: string
}

export const datasetMotionByExerciseId: Readonly<
  Record<string, DatasetMotion>
> = {
  'barbell-bench-press': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0025-EIeI8Vf.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0025-EIeI8Vf.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0025-EIeI8Vf.gif',
    upstreamName: 'barbell bench press',
  },
  'incline-dumbbell-press': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0314-ns0SIbU.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0314-ns0SIbU.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0314-ns0SIbU.gif',
    upstreamName: 'dumbbell incline bench press',
  },
  'push-up': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0662-I4hDWkc.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0662-I4hDWkc.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0662-I4hDWkc.gif',
    upstreamName: 'push-up',
  },
  'cable-chest-fly': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0227-Pr9Rhf4.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0227-Pr9Rhf4.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0227-Pr9Rhf4.gif',
    upstreamName: 'cable standing fly',
  },
  'parallel-bar-dip': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0251-9WTm7dq.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0251-9WTm7dq.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0251-9WTm7dq.gif',
    upstreamName: 'chest dip',
  },
  'pull-up': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0652-lBDjFxJ.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0652-lBDjFxJ.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0652-lBDjFxJ.gif',
    upstreamName: 'pull-up',
  },
  'chin-up': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/1326-T2mxWqc.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/1326-T2mxWqc.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/1326-T2mxWqc.gif',
    upstreamName: 'chin-up',
  },
  'lat-pulldown': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/2330-LEprlgG.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/2330-LEprlgG.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/2330-LEprlgG.gif',
    upstreamName: 'cable lat pulldown full range of motion',
  },
  'barbell-row': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0027-eZyBC3j.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0027-eZyBC3j.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0027-eZyBC3j.gif',
    upstreamName: 'barbell bent over row',
  },
  'seated-cable-row': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0180-hvV79Si.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0180-hvV79Si.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0180-hvV79Si.gif',
    upstreamName: 'cable low seated row',
  },
  'one-arm-dumbbell-row': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0293-BJ0Hz5L.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0293-BJ0Hz5L.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0293-BJ0Hz5L.gif',
    upstreamName: 'dumbbell bent over row',
  },
  'dumbbell-pullover': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0375-9XjtHvS.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0375-9XjtHvS.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0375-9XjtHvS.gif',
    upstreamName: 'dumbbell pullover',
  },
  'dumbbell-overhead-press': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0426-A6wtbuL.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0426-A6wtbuL.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0426-A6wtbuL.gif',
    upstreamName: 'dumbbell standing overhead press',
  },
  'barbell-overhead-press': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/1457-Kyd9Rz5.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/1457-Kyd9Rz5.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/1457-Kyd9Rz5.gif',
    upstreamName: 'barbell standing wide military press',
  },
  'push-press': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/1700-FS63wTN.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/1700-FS63wTN.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/1700-FS63wTN.gif',
    upstreamName: 'dumbbell push press',
  },
  'dumbbell-lateral-raise': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0334-DsgkuIt.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0334-DsgkuIt.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0334-DsgkuIt.gif',
    upstreamName: 'dumbbell lateral raise',
  },
  'dumbbell-front-raise': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0310-3eGE2JC.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0310-3eGE2JC.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0310-3eGE2JC.gif',
    upstreamName: 'dumbbell front raise',
  },
  'reverse-fly': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0359-e25F58f.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0359-e25F58f.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0359-e25F58f.gif',
    upstreamName: 'dumbbell one arm reverse fly (with support)',
  },
  'upright-row': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0120-UDlhcO8.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0120-UDlhcO8.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0120-UDlhcO8.gif',
    upstreamName: 'barbell upright row',
  },
  'barbell-curl': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0031-25GPyDY.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0031-25GPyDY.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0031-25GPyDY.gif',
    upstreamName: 'barbell curl',
  },
  'dumbbell-curl': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0294-NbVPDMW.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0294-NbVPDMW.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0294-NbVPDMW.gif',
    upstreamName: 'dumbbell biceps curl',
  },
  'hammer-curl': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/1648-6em2Dxj.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/1648-6em2Dxj.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/1648-6em2Dxj.gif',
    upstreamName: 'dumbbell alternate seated hammer curl',
  },
  'preacher-curl': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0070-qOgPVf6.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0070-qOgPVf6.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0070-qOgPVf6.gif',
    upstreamName: 'barbell preacher curl',
  },
  'triceps-pushdown': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0241-gAwDzB3.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0241-gAwDzB3.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0241-gAwDzB3.gif',
    upstreamName: 'cable triceps pushdown (v-bar)',
  },
  'skull-crusher': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0061-iZop9xO.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0061-iZop9xO.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0061-iZop9xO.gif',
    upstreamName: 'barbell lying triceps extension',
  },
  'close-grip-bench-press': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0030-J6Dx1Mu.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0030-J6Dx1Mu.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0030-J6Dx1Mu.gif',
    upstreamName: 'barbell close-grip bench press',
  },
  'overhead-triceps-extension': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0109-dZl9Q27.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0109-dZl9Q27.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0109-dZl9Q27.gif',
    upstreamName: 'barbell standing overhead triceps extension',
  },
  'forearm-wrist-curl': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0126-82LxxkW.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0126-82LxxkW.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0126-82LxxkW.gif',
    upstreamName: 'barbell wrist curl',
  },
  'reverse-wrist-curl': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0082-LsZkfU6.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0082-LsZkfU6.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0082-LsZkfU6.gif',
    upstreamName: 'barbell reverse wrist curl',
  },
  'front-plank': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/2135-VBAWRPG.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/2135-VBAWRPG.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/2135-VBAWRPG.gif',
    upstreamName: 'weighted front plank',
  },
  'side-plank': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/3544-5VXmnV5.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/3544-5VXmnV5.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/3544-5VXmnV5.gif',
    upstreamName: 'bodyweight incline side plank',
  },
  'reverse-crunch': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0872-nCU1Ekp.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0872-nCU1Ekp.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0872-nCU1Ekp.gif',
    upstreamName: 'reverse crunch',
  },
  'hanging-knee-raise': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0011-03lzqwk.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0011-03lzqwk.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0011-03lzqwk.gif',
    upstreamName: 'assisted hanging knee raise',
  },
  'russian-twist': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0687-XVDdcoj.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0687-XVDdcoj.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0687-XVDdcoj.gif',
    upstreamName: 'russian twist',
  },
  'ab-wheel-rollout': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0103-xnInPfE.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0103-xnInPfE.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0103-xnInPfE.gif',
    upstreamName: 'barbell standing ab rollerout',
  },
  'back-extension': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0489-zhMwOwE.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0489-zhMwOwE.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0489-zhMwOwE.gif',
    upstreamName: 'hyperextension',
  },
  'back-squat': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0043-qXTaZnJ.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0043-qXTaZnJ.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0043-qXTaZnJ.gif',
    upstreamName: 'barbell full squat',
  },
  'front-squat': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0042-zG0zs85.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0042-zG0zs85.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0042-zG0zs85.gif',
    upstreamName: 'barbell front squat',
  },
  'goblet-squat': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/1760-yn8yg1r.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/1760-yn8yg1r.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/1760-yn8yg1r.gif',
    upstreamName: 'dumbbell goblet squat',
  },
  'leg-press': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0739-10Z2DXU.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0739-10Z2DXU.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0739-10Z2DXU.gif',
    upstreamName: 'sled 45в° leg press',
  },
  'forward-lunge': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0054-t8iSghb.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0054-t8iSghb.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0054-t8iSghb.gif',
    upstreamName: 'barbell lunge',
  },
  'bulgarian-split-squat': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0099-gGNQmVt.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0099-gGNQmVt.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0099-gGNQmVt.gif',
    upstreamName: 'barbell single leg split squat',
  },
  'step-up': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0114-Kxquu2E.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0114-Kxquu2E.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0114-Kxquu2E.gif',
    upstreamName: 'barbell step-up',
  },
  'leg-extension': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0585-my33uHU.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0585-my33uHU.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0585-my33uHU.gif',
    upstreamName: 'lever leg extension',
  },
  'conventional-deadlift': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0032-ila4NZS.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0032-ila4NZS.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0032-ila4NZS.gif',
    upstreamName: 'barbell deadlift',
  },
  'romanian-deadlift': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0085-wQ2c4XD.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0085-wQ2c4XD.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0085-wQ2c4XD.gif',
    upstreamName: 'barbell romanian deadlift',
  },
  'hip-thrust': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/1409-qKBpF7I.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/1409-qKBpF7I.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/1409-qKBpF7I.gif',
    upstreamName: 'barbell glute bridge',
  },
  'glute-bridge': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/1409-qKBpF7I.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/1409-qKBpF7I.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/1409-qKBpF7I.gif',
    upstreamName: 'barbell glute bridge',
  },
  'lying-leg-curl': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0586-17lJ1kr.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0586-17lJ1kr.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0586-17lJ1kr.gif',
    upstreamName: 'lever lying leg curl',
  },
  'good-morning': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0044-XlZ4lAC.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0044-XlZ4lAC.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0044-XlZ4lAC.gif',
    upstreamName: 'barbell good morning',
  },
  'kettlebell-swing': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0549-UHJlbu3.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0549-UHJlbu3.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0549-UHJlbu3.gif',
    upstreamName: 'kettlebell swing',
  },
  'single-leg-romanian-deadlift': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0085-wQ2c4XD.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0085-wQ2c4XD.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0085-wQ2c4XD.gif',
    upstreamName: 'barbell romanian deadlift',
  },
  'sumo-deadlift': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0117-KgI0tqW.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0117-KgI0tqW.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0117-KgI0tqW.gif',
    upstreamName: 'barbell sumo deadlift',
  },
  'standing-calf-raise': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/1372-8ozhUIZ.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/1372-8ozhUIZ.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/1372-8ozhUIZ.gif',
    upstreamName: 'barbell standing calf raise',
  },
  'seated-calf-raise': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0594-bOOdeyc.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0594-bOOdeyc.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0594-bOOdeyc.gif',
    upstreamName: 'lever seated calf raise',
  },
  'single-leg-calf-raise': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0409-1kB3Wmk.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0409-1kB3Wmk.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0409-1kB3Wmk.gif',
    upstreamName: 'dumbbell single leg calf raise',
  },
  'hip-abduction-machine': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0597-CHpahtl.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0597-CHpahtl.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0597-CHpahtl.gif',
    upstreamName: 'lever seated hip abduction',
  },
  'hip-adduction-machine': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0598-oHsrypV.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0598-oHsrypV.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0598-oHsrypV.gif',
    upstreamName: 'lever seated hip adduction',
  },
  'cable-glute-kickback': {
    src: 'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/0860-HEJ6DIX.gif',
    stillSrc:
      'https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/0860-HEJ6DIX.jpg',
    sourceUrl:
      'https://github.com/hasaneyldrm/exercises-dataset/blob/main/videos/0860-HEJ6DIX.gif',
    upstreamName: 'cable kickback',
  },
}
