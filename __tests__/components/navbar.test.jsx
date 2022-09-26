import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Navbar from '../../components/navbar'

describe('Navbar unconnected', () => {
  it('renders a Navbar with a title that links to the homepage', async () => {
      render(<Navbar />)
    const homeLink = screen.getByText("Sook")
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute("href","/")
  })
  it('renders a Navbar with a connect wallet button', async () => {
      render(<Navbar />)
      
    const connectButton = screen.getByText("Connect")
    expect(connectButton).toBeInTheDocument()
    
  })
})