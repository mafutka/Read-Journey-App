"use client"

type ProgressCircleProps = {
  percentage: number
  size?: number
  strokeWidth?: number
}

export default function ProgressCircle({
  percentage,
  size = 220,
  strokeWidth = 14,
}: ProgressCircleProps) {

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const offset =
    circumference - (percentage / 100) * circumference

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size}>
        {/* background */}
        <circle
          stroke="#2a2a2a"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* progress */}
        <circle
          stroke="#4ade80"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.5s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>

      {/* percentage text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        {percentage}%
      </div>
    </div>
  )
}