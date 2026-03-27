import { motion } from 'framer-motion'


  currentTime: Date

  const sunris
  currentTime: Date
 

  if (currentMs < sunriseMs) {
  } else if (currentMs > sunsetMs) {
  } else {
  }
  
  const centerX = arcWidth / 2
  
  
  
  if (currentMs < sunriseMs) {
  
  } else if (currentMs > sunsetMs) {
    return { pri
  } else {
  
  }
  
  const arcWidth = 280
  const arcHeight = 120
  const centerX = arcWidth / 2
  const baseY = arcHeight
  
  const angle = Math.PI - (progress * Math.PI)
  const sunX = centerX + Math.cos(angle) * (arcWidth / 2 - 20)
  const sunY = baseY - Math.sin(angle) * (arcHeight - 20)
  
  const horizonGradientId = `horizon-gradient-${Math.random().toString(36).substr(2, 9)}`
  const arcGradientId = `arc-gradient-${Math.random().toString(36).substr(2, 9)}`
  const glowId = `sun-glow-${Math.random().toString(36).substr(2, 9)}`
  
  const getTimeColor = () => {
    if (progress < 0.1) return { primary: 'oklch(0.70 0.15 40)', secondary: 'oklch(0.65 0.20 30)' }
    if (progress > 0.9) return { primary: 'oklch(0.65 0.18 35)', secondary: 'oklch(0.60 0.20 25)' }
    return { primary: 'oklch(0.75 0.20 80)', secondary: 'oklch(0.80 0.18 100)' }
  }
  
  const colors = getTimeColor()
  
  return (
    <div className="relative w-full flex items-center justify-center py-4">
      <svg 
        width={arcWidth} 
        height={arcHeight + 10} 
        className="overflow-visible"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.05))' }}
      >
        <defs>
          <linearGradient id={horizonGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.95 0.02 180)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.92 0.04 200)" stopOpacity="0.1" />
          </linearGradient>
          
          <linearGradient id={arcGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.6" />
            <stop offset="50%" stopColor={colors.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.6" />
          </linearGradient>
          
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.6" />
            <stop offset="50%" stopColor={colors.primary} stopOpacity="0.3" />
              initial={{ scale: 0.8, opacity: 0 }}
          </radialGradient>
              }
        
              
          x="0" 
          y={baseY} 
          width={arcWidth} 
              initial
          fill={`url(#${horizonGradientId})`}
            <g>
        />
        
        <path
          d={`M 10 ${baseY} Q ${centerX} ${baseY - arcHeight + 10} ${arcWidth - 10} ${baseY}`}
          fill="none"
          stroke={`url(#${arcGradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 6"
                    ini
        />
        
        <path
          d={`M 10 ${baseY} Q ${centerX} ${baseY - arcHeight + 10} ${arcWidth - 10} ${baseY}`}
          fill="none"
                )
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${progress * 300} ${300}`}
            <motion.cir
        />
        
        {!isDay && currentMs > sunsetMs && (
            
            <motion.circle
                repeat:
              cy={sunY}
              r="22"
              fill={`url(#${glowId})`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
            />
                opacity: [0.3, 0.5, 0.3]
        <motion.
              transition={{
          fill={progress ===
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
          cy={baseY}
              cy={sunY}
          animate={
              fill="oklch(0.45 0.08 260)"
            ease: "easeInOut" 
              animate={{ scale: 1 }}
    </div>
            />

        )}

        {isDay && (

            <motion.circle

              cy={sunY}

              fill={`url(#${glowId})`}

              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}

            <motion.circle
              cx={sunX}
              cy={sunY}

              fill={colors.primary}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />

              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rayLength = 6
                const startRadius = 13
                const rad = (angle * Math.PI) / 180
                const x1 = sunX + Math.cos(rad) * startRadius
                const y1 = sunY + Math.sin(rad) * startRadius
                const x2 = sunX + Math.cos(rad) * (startRadius + rayLength)

                
                return (
                  <motion.line

                    x1={x1}
                    y1={y1}
                    x2={x2}

                    stroke={colors.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0.6, 1, 0.6],
                      scale: [0.9, 1.1, 0.9]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,

                      delay: i * 0.1
                    }}
                  />

              })}

          </>


        {!isDay && currentMs < sunriseMs && (
          <>
            <motion.circle
              cx={sunX}
              cy={sunY}
              r="22"
              fill={`url(#${glowId})`}
              initial={{ scale: 0.8, opacity: 0 }}

                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]

              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={sunX}

              r="8"

              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}

          </>

        
        <motion.circle
          cx="15"

          r="4"
          fill={progress === 0 ? colors.primary : 'oklch(0.70 0.08 200)'}
          initial={{ scale: 0 }}
          animate={{ scale: progress === 0 ? [1, 1.3, 1] : 1 }}
          transition={{ 

            repeat: progress === 0 ? Infinity : 0,
            ease: "easeInOut" 
          }}

        

          cx={arcWidth - 15}

          r="4"
          fill={progress === 1 ? colors.secondary : 'oklch(0.70 0.08 200)'}
          initial={{ scale: 0 }}
          animate={{ scale: progress === 1 ? [1, 1.3, 1] : 1 }}
          transition={{ 

            repeat: progress === 1 ? Infinity : 0,

          }}

      </svg>

  )

