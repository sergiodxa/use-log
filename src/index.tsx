import { useEffect } from 'react';
import useConsistentValue from 'use-consistent-value';

export type Level =
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'debug'
  | 'dir'
  | 'table';

export interface UseLogConfig {
  level?: Level;
  shouldLogInProduction?: boolean;
}

export function useLog<Message = any>(
  message: Message,
  config?: UseLogConfig
): void;
export function useLog<Message = any>(
  message: Message,
  { level = 'log', shouldLogInProduction = false }: UseLogConfig = {}
): void {
  const value = useConsistentValue(message);
  function _throw() {
    throw new Error('Invalid log level');
  }
  useEffect(() => {
    if (!shouldLogInProduction && process.env.NODE_ENV === 'production') return;
    console[level] ? console[level](value) : _throw();
  }, [value, level, shouldLogInProduction]);
}

export default useLog;
