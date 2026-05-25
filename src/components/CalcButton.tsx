export interface CalcButtonProps {
  label: string
  onClick: () => void
}

export const CalcButton = ({
  label,
  onClick,
}: CalcButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  )
}
