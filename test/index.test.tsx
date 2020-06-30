import * as React from 'react';
import { render } from '@testing-library/react';
import useLog, { Level } from '../src';

interface TesterProps {
  message: string;
  level: Level;
}

function Tester({ message, level }: TesterProps): null {
  useLog(message, { level });
  return null;
}

describe(useLog, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Log message as level', () => {
    test('log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation();
      render(<Tester message="testing" level="log" />);
      expect(spy).toHaveBeenCalledWith('testing');
    });

    test('info', () => {
      const spy = jest.spyOn(console, 'info').mockImplementation();
      render(<Tester message="testing" level="info" />);
      expect(spy).toHaveBeenCalledWith('testing');
    });

    test('warn', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation();
      render(<Tester message="testing" level="warn" />);
      expect(spy).toHaveBeenCalledWith('testing');
    });

    test('error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();
      render(<Tester message="testing" level="error" />);
      expect(spy).toHaveBeenCalledWith('testing');
    });

    test('debug', () => {
      const spy = jest.spyOn(console, 'debug').mockImplementation();
      render(<Tester message="testing" level="debug" />);
      expect(spy).toHaveBeenCalledWith('testing');
    });

    test('dir', () => {
      const spy = jest.spyOn(console, 'dir').mockImplementation();
      render(<Tester message="testing" level="dir" />);
      expect(spy).toHaveBeenCalledWith('testing');
    });

    test('table', () => {
      const spy = jest.spyOn(console, 'table').mockImplementation();
      render(<Tester message="testing" level="table" />);
      expect(spy).toHaveBeenCalledWith('testing');
    });
  });

  test('Log after message change', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    const { rerender } = render(<Tester message="testing" level="log" />);
    expect(spy).toHaveBeenCalledWith('testing');
    rerender(<Tester message="testing-2" level="log" />);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith('testing-2');
  });
});
