import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Keyboard } from '../components/Keyboard'

describe('Keyboard', () => {
  it('muestra botones numéricos, operaciones e igual', () => {
    const { container } = render(
      <Keyboard
        onClear={() => {}}
        onNumber={() => {}}
        onOperation={() => {}}
        onDecimal={() => {}}
        onToggleSign={() => {}}
        onEquals={() => {}}
      />,
    )

    expect(within(container).getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(within(container).getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(within(container).getByRole('button', { name: '%' })).toBeInTheDocument()
    expect(within(container).getByRole('button', { name: '=' })).toBeInTheDocument()
    expect(within(container).getByRole('button', { name: 'toggle sign' })).toBeInTheDocument()
    expect(within(container).getByRole('button', { name: 'decimal point' })).toBeInTheDocument()
  })

  it('llama onNumber cuando se presiona un número', async () => {
    const user = userEvent.setup()
    const handleNumber = vi.fn()

    const { container } = render(
      <Keyboard
        onClear={() => {}}
        onNumber={handleNumber}
        onOperation={() => {}}
        onDecimal={() => {}}
        onToggleSign={() => {}}
        onEquals={() => {}}
      />,
    )

    await user.click(within(container).getByRole('button', { name: '7' }))

    expect(handleNumber).toHaveBeenCalledWith('7')
  })

  it('llama onOperation cuando se presiona una operación', async () => {
    const user = userEvent.setup()
    const handleOperation = vi.fn()

    const { container } = render(
      <Keyboard
        onClear={() => {}}
        onNumber={() => {}}
        onOperation={handleOperation}
        onDecimal={() => {}}
        onToggleSign={() => {}}
        onEquals={() => {}}
      />,
    )

    await user.click(within(container).getByRole('button', { name: '+' }))

    expect(handleOperation).toHaveBeenCalledWith('+')
  })

  it('llama onOperation cuando se presiona modulo', async () => {
    const user = userEvent.setup()
    const handleOperation = vi.fn()

    const { container } = render(
      <Keyboard
        onClear={() => {}}
        onNumber={() => {}}
        onOperation={handleOperation}
        onDecimal={() => {}}
        onToggleSign={() => {}}
        onEquals={() => {}}
      />,
    )

    await user.click(within(container).getByRole('button', { name: '%' }))

    expect(handleOperation).toHaveBeenCalledWith('%')
  })

  it('llama onDecimal cuando se presiona punto', async () => {
    const user = userEvent.setup()
    const handleDecimal = vi.fn()

    const { container } = render(
      <Keyboard
        onClear={() => {}}
        onNumber={() => {}}
        onOperation={() => {}}
        onDecimal={handleDecimal}
        onToggleSign={() => {}}
        onEquals={() => {}}
      />,
    )

    await user.click(within(container).getByRole('button', { name: 'decimal point' }))

    expect(handleDecimal).toHaveBeenCalledTimes(1)
  })

  it('llama onToggleSign cuando se presiona +/-', async () => {
    const user = userEvent.setup()
    const handleToggleSign = vi.fn()

    const { container } = render(
      <Keyboard
        onClear={() => {}}
        onNumber={() => {}}
        onOperation={() => {}}
        onDecimal={() => {}}
        onToggleSign={handleToggleSign}
        onEquals={() => {}}
      />,
    )

    await user.click(within(container).getByRole('button', { name: 'toggle sign' }))

    expect(handleToggleSign).toHaveBeenCalledTimes(1)
  })

  it('llama onEquals cuando se presiona igual', async () => {
    const user = userEvent.setup()
    const handleEquals = vi.fn()

    const { container } = render(
      <Keyboard
        onClear={() => {}}
        onNumber={() => {}}
        onOperation={() => {}}
        onDecimal={() => {}}
        onToggleSign={() => {}}
        onEquals={handleEquals}
      />,
    )

    await user.click(within(container).getByRole('button', { name: '=' }))

    expect(handleEquals).toHaveBeenCalledTimes(1)
  })
})
