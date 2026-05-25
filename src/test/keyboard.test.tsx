import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Keyboard } from '../components/Keyboard'

describe('Keyboard', () => {
  it('muestra botones numéricos, operaciones e igual', () => {
    const { container } = render(
      <Keyboard
        onNumber={() => {}}
        onOperation={() => {}}
        onEquals={() => {}}
      />,
    )

    expect(within(container).getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(within(container).getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(within(container).getByRole('button', { name: '=' })).toBeInTheDocument()
  })

  it('llama onNumber cuando se presiona un número', async () => {
    const user = userEvent.setup()
    const handleNumber = vi.fn()

    const { container } = render(
      <Keyboard
        onNumber={handleNumber}
        onOperation={() => {}}
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
        onNumber={() => {}}
        onOperation={handleOperation}
        onEquals={() => {}}
      />,
    )

    await user.click(within(container).getByRole('button', { name: '+' }))

    expect(handleOperation).toHaveBeenCalledWith('+')
  })

  it('llama onEquals cuando se presiona igual', async () => {
    const user = userEvent.setup()
    const handleEquals = vi.fn()

    const { container } = render(
      <Keyboard
        onNumber={() => {}}
        onOperation={() => {}}
        onEquals={handleEquals}
      />,
    )

    await user.click(within(container).getByRole('button', { name: '=' }))

    expect(handleEquals).toHaveBeenCalledTimes(1)
  })
})
