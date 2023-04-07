import { render, screen } from '@testing-library/react'
import Home from '@pages/index'
import '@testing-library/jest-dom'
import { store } from '@store/store'
import { Provider } from 'react-redux'

describe('Home', () => {
  it('renders a paragraph showing the favoritesState redux value', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    const favoritesStateParagraph = screen.getByTestId("favoritesState")

    expect(favoritesStateParagraph).toBeInTheDocument()
  })
})