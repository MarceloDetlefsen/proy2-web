import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CalcButton } from '../components/CalcButton'

describe('CalcButton', () => {
  it('muestra el label que recibe', () => {
    const { container } = render(<CalcButton label="7" onClick={() => {}} />)

    expect(within(container).getByRole('button', { name: '7' })).toBeInTheDocument()
  })

  it('ejecuta onClick al presionarlo', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    const { container } = render(<CalcButton label="+" onClick={handleClick} />)

    await user.click(within(container).getByRole('button', { name: '+' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
