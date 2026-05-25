import { CalcButton } from './CalcButton'

const GITHUB_REPO_URL = 'https://github.com/MarceloDetlefsen/proy2-web.git'
const GITHUB_ICON_PATH = [
  'M12 2',
  'C6.48 2 2 6.48 2 12',
  'c0 4.42 2.86 8.17 6.84 9.5',
  '.5.09.68-.22.68-.48',
  '0-.24-.01-1.04-.01-1.89',
  '-2.78.6-3.37-1.23-3.37-1.23',
  '-.45-1.16-1.11-1.47-1.11-1.47',
  '-.91-.62.07-.61.07-.61',
  '1 .07 1.52 1.03 1.52 1.03',
  '.89 1.53 2.34 1.09 2.91.83',
  '.09-.65.35-1.09.63-1.34',
  '-2.22-.25-4.56-1.11-4.56-4.94',
  '0-1.09.39-1.98 1.03-2.68',
  '-.1-.25-.44-1.27.1-2.65',
  '0 0 .84-.27 2.75 1.02',
  '.8-.22 1.65-.33 2.5-.33',
  '.85 0 1.7.11 2.5.33',
  '1.9-1.29 2.74-1.02 2.74-1.02',
  '.54 1.38.2 2.4.1 2.65',
  '.64.7 1.03 1.59 1.03 2.68',
  '0 3.84-2.34 4.69-4.57 4.94',
  '.36.31.68.92.68 1.86',
  '0 1.34-.01 2.42-.01 2.75',
  '0 .27.18.58.69.48',
  'A10 10 0 0 0 22 12',
  'c0-5.52-4.48-10-10-10Z',
].join(' ')

export interface KeyboardProps {
  onClear: () => void
  onNumber: (value: string) => void
  onOperation: (value: '+' | '-' | '*' | '%') => void
  onDecimal: () => void
  onToggleSign: () => void
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
]

export const Keyboard = ({
  onClear,
  onNumber,
  onOperation,
  onDecimal,
  onToggleSign,
  onEquals,
}: KeyboardProps) => {
  return (
    <div className="keyboard" role="group" aria-label="Calculator keys">
      <div className="keyboard-row keyboard-row--utilities">
        <CalcButton
          label="AC"
          dataType="op"
          ariaLabel="clear"
          onClick={onClear}
        />
        <CalcButton
          label="+/-"
          dataType="op"
          ariaLabel="toggle sign"
          onClick={onToggleSign}
        />
        <CalcButton
          label="%"
          dataType="op"
          ariaLabel="%"
          onClick={() => onOperation('%')}
        />
        <button
          type="button"
          className="keyboard-row__github"
          data-type="op"
          aria-label="Open GitHub repository"
          onClick={() => window.open(GITHUB_REPO_URL, '_blank', 'noopener,noreferrer')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={GITHUB_ICON_PATH} />
          </svg>
        </button>
      </div>

      <div className="keyboard-row keyboard-row--numbers">
        {numbers.slice(0, 3).map(({ key, player }) => (
          <CalcButton
            key={key}
            label={key}
            dataKey={key}
            playerName={player}
            onClick={() => onNumber(key)}
          />
        ))}
        <CalcButton
          label="×"
          dataType="op"
          ariaLabel="*"
          onClick={() => onOperation('*')}
        />
      </div>

      <div className="keyboard-row keyboard-row--numbers">
        {numbers.slice(3, 6).map(({ key, player }) => (
          <CalcButton
            key={key}
            label={key}
            dataKey={key}
            playerName={player}
            onClick={() => onNumber(key)}
          />
        ))}
        <CalcButton
          label="−"
          dataType="op"
          ariaLabel="-"
          onClick={() => onOperation('-')}
        />
      </div>

      <div className="keyboard-row keyboard-row--numbers">
        {numbers.slice(6).map(({ key, player }) => (
          <CalcButton
            key={key}
            label={key}
            dataKey={key}
            playerName={player}
            onClick={() => onNumber(key)}
          />
        ))}
        <CalcButton
          label="+"
          dataType="op"
          ariaLabel="+"
          onClick={() => onOperation('+')}
        />
      </div>

      <div className="keyboard-row keyboard-row--bottom">
        <CalcButton
          label="0"
          dataKey="0"
          playerName="Lillard"
          onClick={() => onNumber('0')}
        />
        <CalcButton
          label="."
          dataType="op"
          ariaLabel="decimal point"
          onClick={onDecimal}
        />
        <CalcButton
          label="="
          dataType="equals"
          onClick={onEquals}
        />
      </div>
    </div>
  )
}
