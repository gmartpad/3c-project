import { render, screen } from '@testing-library/react'
import Home from '@pages/index'
import '@testing-library/jest-dom'
import { store } from '@store/store'
import { Provider } from 'react-redux'

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    const heading = screen.getByTestId("favoritesState")

    expect(heading).toBeInTheDocument()
  })
})