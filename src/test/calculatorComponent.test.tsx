import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Calculator } from '../components/Calculator'

describe('Calculator component', () => {
  it('conecta display, teclado y hook', async () => {
    const user = userEvent.setup()
    const { container } = render(<Calculator />)

    const getDisplay = () => container.querySelector('output')

    expect(getDisplay()).toHaveTextContent('')

    await user.click(within(container).getByRole('button', { name: '5' }))
    await user.click(within(container).getByRole('button', { name: '+' }))
    await user.click(within(container).getByRole('button', { name: '3' }))
    await user.click(within(container).getByRole('button', { name: '=' }))

    expect(getDisplay()).toHaveTextContent('8')
  })
})
