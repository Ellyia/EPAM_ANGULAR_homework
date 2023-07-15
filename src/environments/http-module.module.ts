import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentConfig, ENV_CONFIG } from './environment-config.model';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class HttpModule {
  static forRoot(config: EnvironmentConfig): ModuleWithProviders {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: ENV_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
