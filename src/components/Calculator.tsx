import { useCalculator } from '../hooks/useCalculator'
import { Display } from './Display'
import { Keyboard } from './Keyboard'

export const Calculator = () => {
  const {
    display,
    handleClear,
    handleNumber,
    handleDecimal,
    handleToggleSign,
    handleOperation,
    handleEquals,
  } = useCalculator()

  return (
    <div className="calculator" role="application" aria-label="Calculator">
      <div className="calculator__header">
        <h2>NBA CALCULATOR</h2>
      </div>
      <Display value={display} />
      <Keyboard
        onClear={handleClear}
        onNumber={handleNumber}
        onOperation={handleOperation}
        onDecimal={handleDecimal}
        onToggleSign={handleToggleSign}
        onEquals={handleEquals}
      />
    </div>
  )
}
