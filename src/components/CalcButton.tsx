export interface CalcButtonProps {
  label: string
  onClick: () => void
  dataType?: 'op' | 'equals'
  dataKey?: string
  ariaLabel?: string
  playerName?: string
}

export const CalcButton = ({
  label,
  onClick,
  dataType,
  dataKey,
  ariaLabel,
  playerName,
}: CalcButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-type={dataType}
      data-key={dataKey}
      aria-label={ariaLabel ?? label}
    >
      <span className="btn-number">{label}</span>
      {playerName && <span className="btn-name">{playerName}</span>}
    </button>
  )
}
