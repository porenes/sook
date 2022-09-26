import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ConnectWalletButton from '../../../components/wallet/connectWalletButton'

describe('Connect wallet button', () => {
  it('renders a button', () => {
    render(<ConnectWalletButton />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })
})