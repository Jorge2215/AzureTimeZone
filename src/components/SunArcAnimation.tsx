import { motion } from 'framer-motion'

interface SunArcAnimationProps {
  currentTime: Date
  sunrise: Date
  sunset: Date
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value))
}

function getProgress(current: Date, sunrise: Date, sunset: Date): number {
  const currentMs = current.getTime()
  const sunriseMs = sunrise.getTime()
  const sunsetMs = sunset.getTime()

  if (currentMs <= sunriseMs) return 0
  if (currentMs >= sunsetMs) return 1

  const dayLength = sunsetMs - sunriseMs
  if (dayLength <= 0) return 0

  return clamp((currentMs - sunriseMs) / dayLength)
}

export function SunArcAnimation({ currentTime, sunrise, sunset }: SunArcAnimationProps) {
  const arcWidth = 280
  const arcHeight = 120
  const baseY = arcHeight
  const centerX = arcWidth / 2

  const progress = getProgress(currentTime, sunrise, sunset)
  const isDay = progress > 0 && progress < 1

  const angle = Math.PI - progress * Math.PI
  const sunX = centerX + Math.cos(angle) * (arcWidth / 2 - 16)
  const sunY = baseY - Math.sin(angle) * (arcHeight - 16)

  return (
    <div className="relative w-full flex items-center justify-center py-4">
      <svg
        width={arcWidth}
        height={arcHeight + 10}
        className="overflow-visible"
        role="img"
        aria-label="Sun position arc"
      >
        <path
          d={`M 10 ${baseY} Q ${centerX} ${baseY - arcHeight + 10} ${arcWidth - 10} ${baseY}`}
          fill="none"
          stroke="oklch(0.75 0.04 220 / 0.45)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />

        <path
          d={`M 10 ${baseY} Q ${centerX} ${baseY - arcHeight + 10} ${arcWidth - 10} ${baseY}`}
          fill="none"
          stroke={isDay ? 'oklch(0.78 0.18 88)' : 'oklch(0.65 0.06 250)'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${progress * 300} 300`}
        />

        <motion.circle
          cx={sunX}
          cy={sunY}
          r={isDay ? 9 : 7}
          fill={isDay ? 'oklch(0.82 0.18 88)' : 'oklch(0.70 0.05 250)'}
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <circle cx="15" cy={baseY} r="4" fill="oklch(0.62 0.08 200)" />
        <circle cx={arcWidth - 15} cy={baseY} r="4" fill="oklch(0.62 0.08 200)" />
      </svg>
    </div>
  )
}
