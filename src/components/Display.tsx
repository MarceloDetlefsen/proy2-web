export interface DisplayProps {
  value: string
}

export const Display = ({ value }: DisplayProps) => {
  return (
    <output
      aria-label="calculator display"
      aria-live="polite"
      data-error={value === 'ERROR' ? 'true' : undefined}
    >
      {value || '0'}
    </output>
  )
}