import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

describe('App component', () => {
  test('renders app header', () => {
    const { getByText } = render(<App />)
    const headerElement = getByText(/My App/i)
    expect(headerElement).toBeInTheDocument()
  })
})
