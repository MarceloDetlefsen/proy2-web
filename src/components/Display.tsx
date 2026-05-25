export interface DisplayProps {
  value: string
}

export const Display = ({
  value,
}: DisplayProps) => {
  return (
    <output aria-label="calculator display">
      {value}
    </output>
  )
}
