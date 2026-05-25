import { useCalculator } from '../hooks/useCalculator'
import { Display } from './Display'
import { Keyboard } from './Keyboard'

export const Calculator = () => {
  const {
    display,
    handleNumber,
    handleOperation,
    handleEquals,
  } = useCalculator()

  return (
    <div className="calculator" role="application" aria-label="Calculator">
      <Display value={display} />
      <Keyboard
        onNumber={handleNumber}
        onOperation={handleOperation}
        onEquals={handleEquals}
      />
    </div>
  )
}
