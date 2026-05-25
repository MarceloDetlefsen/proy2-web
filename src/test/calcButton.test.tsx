import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CalcButton } from '../components/CalcButton'

describe('CalcButton', () => {
  it('muestra el label que recibe', () => {
    render(<CalcButton label="7" onClick={() => {}} />)

    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument()
  })

  it('ejecuta onClick al presionarlo', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<CalcButton label="+" onClick={handleClick} />)

    await user.click(screen.getByRole('button', { name: '+' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
