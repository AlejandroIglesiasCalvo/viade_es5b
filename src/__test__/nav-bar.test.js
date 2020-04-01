import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from '../front-end/components/NavBar/nav-bar.component'

afterAll(cleanup)

describe.only('Nav Bar', () => {
  const { container } = render(
    <Router>
      <NavBar />
    </Router>
  )

  it('renders without crashing', () => {
    expect(container).toBeTruthy()
  })
})
