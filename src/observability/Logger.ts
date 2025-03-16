import { ConfigService } from '@Src/config/ConfigService';
import { LogLevel, LogProps, TelemetryService } from '@Src/observability/TelemetryService';

export class Logger {
  private static telemetry = new TelemetryService();

  private static createStackTrace(): string {
    const stack = new Error().stack || '';
    // Remove the first couple lines (the ones that reference "Error" and createStackTrace)
    return stack.split('\n').slice(2).join('\n');
  }

  private static log(level: LogLevel, message: string, props?: LogProps) {
    const stack = this.createStackTrace();
    if (ConfigService.getOrThrow('NEXT_PUBLIC_NODE_ENV') === 'local') {
      console.log(`${level.toUpperCase()}: ${message}`, { ...props, stack });
    } else {
      this.telemetry.sendLog(level, message, stack, props);
    }
  }

  public static info(message: string, props?: LogProps) {
    this.log('info', message, props);
  }

  public static warn(message: string, props?: LogProps) {
    this.log('warn', message, props);
  }

  public static error(error: unknown, message?: string, props?: LogProps) {
    // If `error` is an `Error` instance, automatically parse
    // its message and stack. Or allow the user to provide both the
    // custom message + error object.
    const errorObj = error instanceof Error ? error : new Error(String(error));
    // (pull out stack, name, message, etc.)

    this.log('error', message || errorObj.message, {
      ...props,
      errorName: errorObj.name,
      errorMessage: errorObj.message,
      originalStack: errorObj.stack,
    });
  }

  public static debug(message: string, props?: LogProps) {
    this.log('debug', message, props);
  }
}
