import * as React from 'react';

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

export default function useLog(message: string, config?: UseLogConfig): void;
export default function useLog(
  message: string,
  { level = 'log', shouldLogInProduction = false }: UseLogConfig = {}
): void {
  React.useEffect(() => {
    if (!shouldLogInProduction && process.env.NODE_ENV === 'production') return;
    switch (level) {
      case 'error':
        return console.error(message);
      case 'warn':
        return console.warn(message);
      case 'info':
        return console.info(message);
      case 'debug':
        return console.debug(message);
      case 'dir':
        return console.dir(message);
      case 'table':
        return console.table(message);
      case 'log':
        return console.log(message);
      default:
        throw new Error('Invalid log level');
    }
  }, [message, level, shouldLogInProduction]);
}
