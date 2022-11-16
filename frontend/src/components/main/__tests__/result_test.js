import {render, screen, cleanup} from "@testing-library/react"
import Result from "../helpercomponent/result.component.js";
import renderer from 'react-test-renderer'

afterEach(() => {
  cleanup()
})


test('matches snapshot', () => {
  const tree = renderer.create(<Result props ={[1,2]}/>)
  expect(tree).toMatchSnapshot();
})


test('should have the text, up', () => {
  render(<Result props ={[1,2]}/>)
  const resultElement = screen.getByTestId('up-1')
  expect(resultElement).toBeInTheDocument();
  expect(resultElement).toHaveTextContent('UP');
})

test('should have the right value when passed in props for up', () => {
  render(<Result props ={[1,{up: 1, down: 2}]}/>)
  const resultElement = screen.getByTestId('up-2')
  expect(resultElement).toBeInTheDocument();
  expect(resultElement).toHaveTextContent(1);
})


test('should have the text, down', () => {
  render(<Result props ={[1,2]}/>)
  const resultElement = screen.getByTestId('down-1')
  expect(resultElement).toBeInTheDocument();
  expect(resultElement).toHaveTextContent('DOWN');
})

test('should have the right value when passed in props for down', () => {
  render(<Result props ={[1,{up: 1, down: 2}]}/>)
  const resultElement = screen.getByTestId('down-2')
  expect(resultElement).toBeInTheDocument();
  expect(resultElement).toHaveTextContent(2);
})

test('should have the right title when passed in props status', () => {
  render(<Result props ={[1,{up: 1, down: 2, Total: 3}]}/>)
  const resultElement = screen.getByTestId('resulttitle-1')
  expect(resultElement).toBeInTheDocument();
  expect(resultElement).toHaveTextContent('Total 3 Websites');
})

test('should have the right seconds when passed in props elapsed', () => {
  render(<Result props ={[1,{up: 1, down: 2, Total: 3, Elapsed:40}]}/>)
  const resultElement = screen.getByTestId('second-1')
  expect(resultElement).toBeInTheDocument();
  expect(resultElement).toHaveTextContent('40 second');
})

test('should have the right minute when passed in props elapsed', () => {
  render(<Result props ={[1,{up: 1, down: 2, Total: 3, Elapsed:97}]}/>)
  const resultElement = screen.getByTestId('minute-1')
  expect(resultElement).toBeInTheDocument();
  expect(resultElement).toHaveTextContent('1 minute 37 second');
})