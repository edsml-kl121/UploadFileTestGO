import {render, screen, cleanup} from "@testing-library/react"
import Main from "../main.component.js";
import renderer from 'react-test-renderer'
jest.mock("axios");

afterEach(() => {
  cleanup()
})


test('matches snapshot', () => {
  const tree = renderer.create(<Main/>)
  expect(tree).toMatchSnapshot();
})

test('should have the right title', () => {
  render(<Main/>)
  const MainElement = screen.getByTestId('main-1')
  expect(MainElement).toBeInTheDocument();
  expect(MainElement).toHaveTextContent('Websites Checker');
})

test('should have the right message when before dropping the file', () => {
  render(<Main/>)
  const MainElement = screen.getByTestId('notdropping-1')
  expect(MainElement).toBeInTheDocument();
  expect(MainElement).toHaveTextContent('Drag your .csv file here to start uploading.');
})
