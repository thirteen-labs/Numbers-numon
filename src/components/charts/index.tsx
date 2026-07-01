import { Dimensions } from 'react-native';
import Svg, { Circle, Line, Rect, Text as SvgText } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';
import { calculatePinnacleAges } from '@/lib/numerology/cycles';
import { colorForNumber } from '@/lib/numerology/utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

export function PinnacleTimeline({ lifePath, pinnacleNumbers }: { lifePath: number; pinnacleNumbers: number[] }) {
  const ages = calculatePinnacleAges(lifePath);
  const theme = useTheme();
  const width = Math.min(SCREEN_WIDTH - 48, 400);
  const height = 80;
  const padding = 20;
  const barHeight = 20;
  const barY = 30;

  const totalYears = (ages[ages.length - 1]?.end ?? 81) - (ages[0]?.start ?? 0);
  const scale = (width - padding * 2) / totalYears;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Rect x={padding} y={barY} width={width - padding * 2} height={barHeight} rx={4} fill={theme.backgroundElement} />
      {pinnacleNumbers.map((num, i) => {
        const age = ages[i];
        if (!age) return null;
        const x = padding + (age.start - (ages[0]?.start ?? 0)) * scale;
        const w = Math.max(((age.end - age.start) * scale), 20);
        const color = colorForNumber(num, theme);
        return (
          <Rect key={i} x={x} y={barY} width={w} height={barHeight} rx={4} fill={color} opacity={0.8} />
        );
      })}
    </Svg>
  );
}

export function NumberRadar({ numbers, labels, size = 200 }: { numbers: number[]; labels: string[]; size?: number }) {
  const theme = useTheme();
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) - 20;
  const slice = (2 * Math.PI) / numbers.length;

  const points = numbers.map((n, i) => {
    const angle = -Math.PI / 2 + i * slice;
    const r = (n / 9) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  const grid = [3, 6, 9].map((level) => {
    const r = (level / 9) * radius;
    return (
      <Circle key={level} cx={cx} cy={cy} r={r} fill="none" stroke={theme.textSecondary} strokeWidth={0.5} opacity={0.3} />
    );
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {grid}
      {points.map((p, i) => {
        const next = points[(i + 1) % points.length];
        return <Line key={i} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke={theme.text} strokeWidth={1.5} opacity={0.6} />;
      })}
      {numbers.map((n, i) => {
        const p = points[i];
        return <Circle key={i} cx={p.x} cy={p.y} r={4} fill={colorForNumber(n, theme)} />;
      })}
      {labels.map((label, i) => {
        const angle = -Math.PI / 2 + i * slice;
        const lx = cx + (radius + 15) * Math.cos(angle);
        const ly = cy + (radius + 15) * Math.sin(angle);
        return <SvgText key={i} x={lx} y={ly} fontSize={10} fill={theme.text} textAnchor="middle" alignmentBaseline="middle">{label}</SvgText>;
      })}
    </Svg>
  );
}
