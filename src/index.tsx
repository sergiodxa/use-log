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
  useEffect(() => {
    if (!shouldLogInProduction && process.env.NODE_ENV === 'production') return;
    switch (level) {
      case 'error':
        return console.error(value);
      case 'warn':
        return console.warn(value);
      case 'info':
        return console.info(value);
      case 'debug':
        return console.debug(value);
      case 'dir':
        return console.dir(value);
      case 'table':
        return console.table(value);
      case 'log':
        return console.log(value);
      default:
        throw new Error('Invalid log level');
    }
  }, [value, level, shouldLogInProduction]);
}

export default useLog;
