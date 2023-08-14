import { fireEvent, getByRole, render, screen } from './tests/utils.ts'
import { ChallengingApp } from './ChallengingApp.tsx'

describe('App', () => {
  it('renders headline', () => {
    render(<ChallengingApp />)
    expect(
      screen.getByText('Challenging Data Visualization Dashboard'),
    ).toBeVisible()
  })

  it('renders an an element with the calculated sum of all the rows', () => {
    render(<ChallengingApp />)
    const totalSumElement = screen.getByText(/Total Sum: /)
    expect(totalSumElement).toBeVisible()
  })

  it('renders a list with clickable elements', () => {
    const consoleMock = vi.spyOn(console, 'log')

    render(<ChallengingApp />)
    const totalSumElement = screen.getAllByRole('listitem')
    const firstListItem = totalSumElement[0]
    if (firstListItem) {
      const buttonEl = getByRole(firstListItem, 'button', { name: 'Click me' })
      expect(buttonEl).toBeVisible()
      fireEvent.click(buttonEl)
      expect(consoleMock).toHaveBeenLastCalledWith('Item 0 clicked.')
    }
  })
})
