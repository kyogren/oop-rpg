// Sprite pixel-art vẽ bằng SVG: mỗi ký tự trong bản đồ là một ô màu, '.' là ô trống
interface Props {
  map: string[]
  palette: Record<string, string>
  pixel?: number
  flip?: boolean
  className?: string
  label: string
}

export function PixelSprite({ map, palette, pixel = 6, flip, className, label }: Props) {
  const w = Math.max(...map.map((r) => r.length))
  const h = map.length
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * pixel}
      height={h * pixel}
      shapeRendering="crispEdges"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      role="img"
      aria-label={label}
    >
      {map.flatMap((row, y) =>
        [...row].map((ch, x) =>
          palette[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[ch]} /> : null,
        ),
      )}
    </svg>
  )
}

export const HERO = {
  map: [
    '....HHHH......',
    '...HHHHHH.....',
    '...HSSSSH.....',
    '...SESSES...W.',
    '....SSSS...WW.',
    '..BBBBBBB.WW..',
    '.SBBBGGBBSW...',
    '.S.BBBBBB.W...',
    '...BBBBBB.....',
    '...LLL.LLL....',
    '...LL...LL....',
    '..FFF...FFF...',
  ],
  palette: {
    H: '#7a4a24',
    S: '#f2c9a0',
    E: '#2b2140',
    B: '#4f46b8',
    G: '#f2c14e',
    L: '#3a3352',
    F: '#2a2235',
    W: '#d9dde8',
  },
}

export const DRAGON = {
  map: [
    '..........GG......',
    '.........GGGG.....',
    'W.......GGGGGG....',
    'WW.....GGGEGGGRR..',
    'WWW...GGGGGGGRR...',
    'WWWW.GGGGGGG......',
    '.WWWGGGGGGG.......',
    '..WGGGGGGGGG......',
    '...GGBBBBGGGG.....',
    '..GGGBBBBGGGGG....',
    '..GG.GG...GG.GGG..',
    '..YY.YY...YY...GG.',
  ],
  palette: {
    G: '#3f9b5f',
    B: '#a6d98a',
    W: '#7b4fa8',
    E: '#ffdd55',
    R: '#e8553e',
    Y: '#f3ecd6',
  },
}
