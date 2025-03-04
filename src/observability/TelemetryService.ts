import axios from 'axios';
import { ConfigService } from '../config/ConfigService';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';
export type LogProps = Record<string, any>;

export class TelemetryService {
  public async sendLog(level: LogLevel, message: string, stack: string, props?: LogProps) {
    try {
      const baseURL = ConfigService.getOrThrow('VERCEL_URL')
        ? `https://${ConfigService.getOrThrow('VERCEL_URL')}`
        : 'http://localhost:3000'; // fallback for local dev

      await axios.post(`${baseURL}/api/log`, { level, message, stack, props });
    } catch (error) {
      console.error('Telemetry post error:', error);
    }
  }
}
