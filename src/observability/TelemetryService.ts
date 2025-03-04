import axios from 'axios';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';
export type LogProps = Record<string, any>;

export class TelemetryService {
  public async sendLog(level: LogLevel, message: string, stack: string, props?: LogProps) {
    try {
      // In the browser, use relative path
      if (typeof window !== 'undefined') {
        await axios.post('/api/log', { level, message, stack, props });
      } else {
        // On the server, use an absolute URL from process.env.VERCEL_URL or a fallback
        const baseURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
        await axios.post(`${baseURL}/api/log`, { level, message, stack, props });
      }
    } catch (error) {
      console.error('Telemetry post error:', error);
    }
  }
}
