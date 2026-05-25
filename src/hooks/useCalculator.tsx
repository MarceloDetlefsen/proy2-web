import { useRef, useState } from 'react'

type Operation = '+' | '-' | '*' | '%' | '/'

const MAX_DISPLAY_LENGTH = 9
const MAX_RESULT = 999999999

const calculate = (
  left: number,
  right: number,
  operation: Operation,
): number => {
  switch (operation) {
  case '+': return left + right
  case '-': return left - right
  case '*': return left * right
  case '%': return left % right
  case '/': return left / right
  }
}

const isValidResult = (value: number): boolean =>
  Number.isFinite(value) && Math.abs(value) <= MAX_RESULT

const formatResult = (value: number): string | null => {
  if (!isValidResult(value)) return null

  if (Number.isInteger(value)) {
    const text = String(value)
    return text.length <= MAX_DISPLAY_LENGTH ? text : null
  }

  for (let precision = 8; precision >= 1; precision -= 1) {
    const text = Number(value.toPrecision(precision)).toString()
    if (text.length <= MAX_DISPLAY_LENGTH) return text
  }

  return null
}

export const useCalculator = () => {
  const [display, setDisplay] = useState('')

  const displayRef = useRef('')
  const storedValueRef = useRef<number | null>(null)
  const operatorRef = useRef<Operation | null>(null)
  const awaitingSecondOperandRef = useRef(false)

  const syncDisplay = (value: string) => {
    displayRef.current = value
    setDisplay(value)
  }

  const setError = () => {
    storedValueRef.current = null
    operatorRef.current = null
    awaitingSecondOperandRef.current = false
    syncDisplay('ERROR')
  }

  const handleClear = () => {
    storedValueRef.current = null
    operatorRef.current = null
    awaitingSecondOperandRef.current = false
    syncDisplay('')
  }

  const clearPendingOperation = () => {
    storedValueRef.current = null
    operatorRef.current = null
    awaitingSecondOperandRef.current = false
  }

  const getDisplayForInput = (input: string) => {
    const current = displayRef.current
    if (awaitingSecondOperandRef.current || current === '' || current === 'ERROR') return input
    if (current === '0' && input !== '.') return input
    if (current === '-0' && input !== '.') return `-${input}`
    return current + input
  }

  const handleNumber = (input: string) => {
    if (displayRef.current === 'ERROR') {
      clearPendingOperation()
      syncDisplay(input)
      return
    }
    const nextDisplay = getDisplayForInput(input)
    if (nextDisplay.length > MAX_DISPLAY_LENGTH) return
    awaitingSecondOperandRef.current = false
    syncDisplay(nextDisplay)
  }

  const commitPendingOperation = (rightOperand: number) => {
    if (storedValueRef.current === null || operatorRef.current === null) return rightOperand
    if (operatorRef.current === '/' && rightOperand === 0) {
      setError()
      return null
    }
    const result = calculate(storedValueRef.current, rightOperand, operatorRef.current)
    const displayValue = formatResult(result)
    if (displayValue === null) {
      setError()
      return null
    }
    storedValueRef.current = Number(displayValue)
    syncDisplay(displayValue)
    return storedValueRef.current
  }

  const handleDecimal = () => {
    if (displayRef.current === 'ERROR') {
      clearPendingOperation()
      syncDisplay('0.')
      return
    }
    if (displayRef.current.includes('.')) return
    const nextDisplay = awaitingSecondOperandRef.current || displayRef.current === ''
      ? '0.'
      : displayRef.current === '-'
        ? '-0.'
        : `${displayRef.current}.`
    if (nextDisplay.length > MAX_DISPLAY_LENGTH) return
    awaitingSecondOperandRef.current = false
    syncDisplay(nextDisplay)
  }

  const handleToggleSign = () => {
    if (displayRef.current === 'ERROR') return
    const current = displayRef.current
    const nextDisplay = awaitingSecondOperandRef.current || current === ''
      ? '-'
      : current.startsWith('-')
        ? current.slice(1)
        : `-${current}`
    if (nextDisplay.length > MAX_DISPLAY_LENGTH) return
    awaitingSecondOperandRef.current = false
    syncDisplay(nextDisplay)
  }

  const handleOperation = (operation: Operation) => {
    if (displayRef.current === 'ERROR' || displayRef.current === '-') return
    if (displayRef.current !== '' && !awaitingSecondOperandRef.current) {
      const currentValue = Number(displayRef.current)
      if (storedValueRef.current === null) {
        storedValueRef.current = currentValue
      } else if (operatorRef.current !== null) {
        const result = commitPendingOperation(currentValue)
        if (result === null) return
      }
    }
    operatorRef.current = operation
    awaitingSecondOperandRef.current = true
  }

  const handleEquals = () => {
    if (
      displayRef.current === 'ERROR' ||
      displayRef.current === '-' ||
      storedValueRef.current === null ||
      operatorRef.current === null ||
      displayRef.current === ''
    ) return
    const rightOperand = Number(displayRef.current)
    if (operatorRef.current === '/' && rightOperand === 0) {
      setError()
      return
    }
    const result = calculate(storedValueRef.current, rightOperand, operatorRef.current)
    const displayValue = formatResult(result)
    if (displayValue === null) {
      setError()
      return
    }
    storedValueRef.current = Number(displayValue)
    operatorRef.current = null
    awaitingSecondOperandRef.current = false
    syncDisplay(displayValue)
  }

  return {
    display,
    handleClear,
    handleNumber,
    handleDecimal,
    handleToggleSign,
    handleOperation,
    handleEquals,
  }
}
