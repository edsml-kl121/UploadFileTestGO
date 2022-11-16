import {render, screen, cleanup} from "@testing-library/react"
import OrButton from "../helpercomponent/orAndButton.component.js";
import renderer from 'react-test-renderer'

afterEach(() => {
  cleanup()
})


test('matches snapshot', () => {
  const tree = renderer.create(<OrButton/>)
  expect(tree).toMatchSnapshot();
})

test('should render or component', () => {
  render(<OrButton/>)
  const buttonElement = screen.getByTestId('or-1')
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent('OR');
})


test('should render have a button enabled', () => {
  render(<OrButton/>)
  const button = screen.getByTestId('button-1')
  expect(button).not.toBeDisabled();
})