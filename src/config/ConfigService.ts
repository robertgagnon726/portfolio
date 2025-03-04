export class ConfigService {
  private constructor() {}

  private static publicEnv: Record<EnvKey, string | undefined> = {
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
  };

  /**
   * Retrieve an environment variable by key, throwing an error if it's not defined.
   * Always returns a string (assuming the variable is present).
   */
  public static getOrThrow(envKey: EnvKey): string {
    const value = this.publicEnv[envKey];
    if (typeof value === 'undefined') {
      throw new Error(`Environment variable "${envKey}" is not set.`);
    }
    return value;
  }
}

type EnvKey = 'NEXT_PUBLIC_NODE_ENV' | 'VERCEL_URL';
