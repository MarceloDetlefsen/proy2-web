import { renderHook, act } from '@testing-library/react'
import { useCalculator } from '../hooks/useCalculator'

describe('Calculator', () => {
  describe('cuando el usuario presiona un número', () => {
    it('debe mostrarlo en el display', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.handleNumber('5'))
      expect(result.current.display).toBe('5')
    })

    it('debe concatenar si ya hay un número en el display', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('3'); result.current.handleNumber('7') })
      expect(result.current.display).toBe('37')
    })

    it('debe ignorar el dígito si ya hay 9 caracteres en el display', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { '123456789'.split('').forEach(n => result.current.handleNumber(n)) })
      act(() => result.current.handleNumber('1'))
      expect(result.current.display).toBe('123456789')
    })
  })

  describe('cuando el usuario presiona una operación', () => {
    it('debe limpiar el display para el siguiente número', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('5'); result.current.handleOperation('+') })
      act(() => result.current.handleNumber('3'))
      expect(result.current.display).toBe('3')
    })

    it('debe mostrar el resultado si ya había una operación pendiente', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('5'); result.current.handleOperation('+') })
      act(() => { result.current.handleNumber('3'); result.current.handleOperation('+') })
      expect(result.current.display).toBe('8')
    })
  })

  describe('cuando el usuario presiona AC', () => {
    it('debe limpiar el display y resetear la operación pendiente', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => {
        result.current.handleNumber('5')
        result.current.handleOperation('+')
        result.current.handleClear()
      })
      expect(result.current.display).toBe('')

      act(() => result.current.handleNumber('3'))
      expect(result.current.display).toBe('3')
    })
  })

  describe('cuando el usuario presiona modulo', () => {
    it('debe mostrar el residuo de la operación', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => {
        result.current.handleNumber('1')
        result.current.handleNumber('0')
        result.current.handleOperation('%')
      })
      act(() => {
        result.current.handleNumber('3')
        result.current.handleEquals()
      })
      expect(result.current.display).toBe('1')
    })
  })

  describe('cuando el usuario presiona punto decimal', () => {
    it('debe concatenarlo al número actual', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('1'); result.current.handleDecimal(); result.current.handleNumber('5') })
      expect(result.current.display).toBe('1.5')
    })

    it('debe ignorar un segundo punto decimal', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('1'); result.current.handleDecimal(); result.current.handleDecimal() })
      expect(result.current.display).toBe('1.')
    })
  })

  describe('cuando el usuario presiona +/-', () => {
    it('debe convertir el número en negativo', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('5'); result.current.handleToggleSign() })
      expect(result.current.display).toBe('-5')
    })

    it('debe volver al positivo al presionarlo otra vez', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => {
        result.current.handleNumber('5')
        result.current.handleToggleSign()
        result.current.handleToggleSign()
      })
      expect(result.current.display).toBe('5')
    })

    it('debe empezar el siguiente operando como negativo después de una operación', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('5'); result.current.handleOperation('+') })
      act(() => { result.current.handleToggleSign(); result.current.handleNumber('3'); result.current.handleEquals() })
      expect(result.current.display).toBe('2')
    })
  })

  describe('cuando el usuario presiona igual', () => {
    it('debe mostrar el resultado de la operación', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('4'); result.current.handleOperation('*') })
      act(() => { result.current.handleNumber('3'); result.current.handleEquals() })
      expect(result.current.display).toBe('12')
    })
  })

  describe('cuando el resultado es inválido', () => {
    it('debe mostrar ERROR si el resultado es negativo', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('3'); result.current.handleOperation('-') })
      act(() => { result.current.handleNumber('5'); result.current.handleEquals() })
      expect(result.current.display).toBe('ERROR')
    })

    it('debe mostrar ERROR si el resultado supera 999999999', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => { result.current.handleNumber('999999999'); result.current.handleOperation('+') })
      act(() => { result.current.handleNumber('1'); result.current.handleEquals() })
      expect(result.current.display).toBe('ERROR')
    })
  })
})
