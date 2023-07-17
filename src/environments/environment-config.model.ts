import { InjectionToken } from '@angular/core';

export interface IEnvironmentConfig {
  production: boolean;
  apiUrl: string;
}

export const ENV_CONFIG = new InjectionToken<IEnvironmentConfig>(
  'EnvironmentConfig'
);
