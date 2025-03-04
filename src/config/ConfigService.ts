export class ConfigService {
  private constructor() {}

  /**
   * Retrieve an environment variable by key, throwing an error if it's not defined.
   * Always returns a string (assuming the variable is present).
   */
  public static getOrThrow(envKey: EnvKey): string {
    const value = process.env[envKey];
    if (typeof value === 'undefined') {
      throw new Error(`Environment variable "${envKey}" is not set.`);
    }
    return value;
  }
}

type EnvKey = 'NODE_ENV' | 'NEXT_PUBLIC_BASE_URL';
