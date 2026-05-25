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