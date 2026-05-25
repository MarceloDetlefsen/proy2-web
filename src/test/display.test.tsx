import { render, screen } from '@testing-library/react'

import { Display } from '../components/Display'

describe('Display', () => {
  it('muestra el valor que recibe', () => {
    render(<Display value="123" />)

    expect(screen.getByLabelText('calculator display')).toHaveTextContent('123')
  })

  it('actualiza lo que se renderiza cuando cambia el valor', () => {
    const { container, rerender } = render(<Display value="7" />)

    rerender(<Display value="ERROR" />)

    expect(container.querySelector('output')).toHaveTextContent('ERROR')
  })
})
