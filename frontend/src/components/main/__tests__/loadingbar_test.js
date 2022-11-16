import {render, screen, cleanup} from "@testing-library/react"
import Loadingbar from "../helpercomponent/loadingbar.component.js";
import renderer from 'react-test-renderer'

afterEach(() => {
  cleanup()
})


test('matches snapshot', () => {
  const tree = renderer.create(<Loadingbar props={[1,2]}/>)
  expect(tree).toMatchSnapshot();
})

test('should have expected file path', () => {
  render(<Loadingbar props ={["test.csv",2]}/>)
  const LoadingbarElement = screen.getByTestId('path-1')
  expect(LoadingbarElement).toBeInTheDocument();
  expect(LoadingbarElement).toHaveTextContent('test.csv');
})

test('should have expected progress percent', () => {
  render(<Loadingbar props ={["test.csv", 47]}/>)
  const LoadingbarElement = screen.getByTestId('progress-1')
  expect(LoadingbarElement).toBeInTheDocument();
  expect(LoadingbarElement).toHaveTextContent(47);
})
