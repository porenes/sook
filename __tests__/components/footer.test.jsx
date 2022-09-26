import { render, screen } from '@testing-library/react'
import Footer from '../../components/footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('renders a flame', () => {
    render(<Footer />)

    const flame = screen.getByText("🔥")

    expect(flame).toBeInTheDocument()
  })
})