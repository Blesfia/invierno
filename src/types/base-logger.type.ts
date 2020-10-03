/**
 * Defines an abstract base logger for invierno.
 * @alias IBaseLogger
 */
export interface IBaseLogger {
  /** Logs a message with info level
   * @function
   * @param {string} message Message to log out
   * @param {any} params.{...} data to logout
   * @example
   * logger.info('Info message', { foo: 'bar' });
   */
  info(message: string, ...args: unknown[]): void;
  /** Logs a message with error level
   * @function
   * @param {string} message Message to log out
   * @param {any} params.{...} data to logout
   * @example
   * logger.error('error message', { foo: 'bar' });
   */
  error(message: string, ...args: unknown[]): void;
  /** Logs a message with warn level
   * @function
   * @param {string} message Message to log out
   * @param {any} params.{...} data to logout
   * @example
   * logger.warn('warn message', { foo: 'bar' });
   */
  warn(message: string, ...args: unknown[]): void;
}
