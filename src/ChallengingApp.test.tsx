import { fireEvent, getByRole, render, screen, waitFor } from './tests/utils.ts'
import { ChallengingApp } from './ChallengingApp.tsx'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

afterAll(() => {
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('renders headline', () => {
    render(<ChallengingApp />)
    expect(
      screen.getByText('Challenging Data Visualization Dashboard'),
    ).toBeVisible()
  })

  it('renders an an element with the calculated sum of all the rows', async () => {
    render(<ChallengingApp />)
    const totalSumElement = await waitFor(() => screen.getByText(/Total Sum: /))
    expect(totalSumElement).toBeVisible()
  })

  it('renders a list with clickable elements', async () => {
    const consoleMock = vi.spyOn(console, 'log')

    render(<ChallengingApp />)
    const totalSumElement = await waitFor(() => screen.getAllByRole('listitem'))
    const firstListItem = totalSumElement[0]
    if (firstListItem) {
      const buttonEl = getByRole(firstListItem, 'button', { name: 'Click me' })
      expect(buttonEl).toBeVisible()
      fireEvent.click(buttonEl)
      expect(consoleMock).toHaveBeenLastCalledWith('Item 0 clicked.')
    }
  })
})
