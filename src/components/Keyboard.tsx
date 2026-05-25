import { CalcButton } from './CalcButton'

export interface KeyboardProps {
  onNumber: (value: string) => void
  onOperation: (value: '+' | '-' | '*') => void
  onEquals: () => void
}

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const operations: Array<'+' | '-' | '*'> = ['+', '-', '*']

export const Keyboard = ({
  onNumber,
  onOperation,
  onEquals,
}: KeyboardProps) => {
  return (
    <div>
      <div>
        {numbers.map((number) => (
          <CalcButton
            key={number}
            label={number}
            onClick={() => onNumber(number)}
          />
        ))}
      </div>
      <div>
        {operations.map((operation) => (
          <CalcButton
            key={operation}
            label={operation}
            onClick={() => onOperation(operation)}
          />
        ))}
        <CalcButton label="=" onClick={onEquals} />
      </div>
    </div>
  )
}
