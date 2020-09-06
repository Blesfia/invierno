import { IBaseLogger } from '../types';

export class ConsoleLogger implements IBaseLogger {
  constructor(private context: string) {}

  private buildMessage(message: string, args: unknown[]) {
    const logMessage = `[${this.context}] - ${message}`;
    if (args.length) {
      return [logMessage, args];
    }
    return [logMessage];
  }
  public info(message: string, ...args: unknown[]): void {
    console.info(...this.buildMessage(message, args));
  }

  public error(message: string, ...args: unknown[]): void {
    console.error(...this.buildMessage(message, args));
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(...this.buildMessage(message, args));
  }
}
