import { CalcButton } from './CalcButton'

export interface KeyboardProps {
  onNumber: (value: string) => void
  onOperation: (value: '+' | '-' | '*') => void
  onEquals: () => void
}

const numbers: Array<{ key: string; player: string }> = [
  { key: '7', player: 'Durant' },
  { key: '8', player: 'Allen' },
  { key: '9', player: 'McConnell' },
  { key: '4', player: 'Green' },
  { key: '5', player: 'Edwards' },
  { key: '6', player: 'LeBron' },
  { key: '1', player: 'Booker' },
  { key: '2', player: 'Irving' },
  { key: '3', player: 'CP3' },
  { key: '0', player: 'Lillard' },
]

const operations: Array<{ symbol: '+' | '-' | '*'; label: string }> = [
  { symbol: '+', label: '+' },
  { symbol: '-', label: '−' },
  { symbol: '*', label: '×' },
]

export const Keyboard = ({
  onNumber,
  onOperation,
  onEquals,
}: KeyboardProps) => {
  return (
    <div className="keyboard" role="group" aria-label="Calculator keys">
      <div className="keyboard-numbers">
        {numbers.map(({ key, player }) => (
          <CalcButton
            key={key}
            label={key}
            dataKey={key}
            playerName={player}
            onClick={() => onNumber(key)}
          />
        ))}
      </div>
      <div className="keyboard-ops">
        {operations.map(({ symbol, label }) => (
          <CalcButton
            key={symbol}
            label={label}
            dataType="op"
            ariaLabel={symbol}
            onClick={() => onOperation(symbol)}
          />
        ))}
        <CalcButton
          label="="
          dataType="equals"
          onClick={onEquals}
        />
      </div>
    </div>
  )
}
