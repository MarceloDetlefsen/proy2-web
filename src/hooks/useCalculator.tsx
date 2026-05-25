import { useRef, useState } from 'react'

type Operation = '+' | '-' | '*'

const MAX_DISPLAY_LENGTH = 9
const MAX_RESULT = 999999999

const calculate = (
  left: number,
  right: number,
  operation: Operation,
): number => {
  switch (operation) {
  case '+':
    return left + right
  case '-':
    return left - right
  case '*':
    return left * right
  }
}

const isValidResult = (value: number): boolean =>
  Number.isFinite(value) && value >= 0 && value <= MAX_RESULT

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

  const handleNumber = (input: string) => {
    if (displayRef.current === 'ERROR') {
      storedValueRef.current = null
      operatorRef.current = null
      awaitingSecondOperandRef.current = false
      syncDisplay(input)
      return
    }

    const nextDisplay = awaitingSecondOperandRef.current || displayRef.current === ''
      ? input
      : displayRef.current + input

    if (nextDisplay.length > MAX_DISPLAY_LENGTH) {
      return
    }

    awaitingSecondOperandRef.current = false
    syncDisplay(nextDisplay)
  }

  const commitPendingOperation = (rightOperand: number) => {
    if (storedValueRef.current === null || operatorRef.current === null) {
      return rightOperand
    }

    const result = calculate(storedValueRef.current, rightOperand, operatorRef.current)

    if (!isValidResult(result)) {
      setError()
      return null
    }

    storedValueRef.current = result
    syncDisplay(String(result))
    return result
  }

  const handleOperation = (operation: Operation) => {
    if (displayRef.current === 'ERROR') {
      return
    }

    if (
      displayRef.current !== ''
      && !awaitingSecondOperandRef.current
    ) {
      const currentValue = Number(displayRef.current)

      if (storedValueRef.current === null) {
        storedValueRef.current = currentValue
      } else if (operatorRef.current !== null) {
        const result = commitPendingOperation(currentValue)
        if (result === null) {
          return
        }
      }
    }

    operatorRef.current = operation
    awaitingSecondOperandRef.current = true
  }

  const handleEquals = () => {
    if (
      displayRef.current === 'ERROR'
      || storedValueRef.current === null
      || operatorRef.current === null
      || displayRef.current === ''
    ) {
      return
    }

    const rightOperand = Number(displayRef.current)
    const result = calculate(storedValueRef.current, rightOperand, operatorRef.current)

    if (!isValidResult(result)) {
      setError()
      return
    }

    storedValueRef.current = result
    operatorRef.current = null
    awaitingSecondOperandRef.current = false
    syncDisplay(String(result))
  }

  return {
    display,
    handleNumber,
    handleOperation,
    handleEquals,
  }
}
