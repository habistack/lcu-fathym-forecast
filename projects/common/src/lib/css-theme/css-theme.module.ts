import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeDirective } from './theme.directive';
import { CssThemeService } from './css-theme.service';
import { ThemeOptions, THEMES, ACTIVE_THEME } from './symbols.interface';

@NgModule({
  imports: [CommonModule],
  providers: [CssThemeService],
  declarations: [ThemeDirective],
  exports: [ThemeDirective]
})
export class CSSThemeModule {
  static forRoot(options: ThemeOptions): ModuleWithProviders<CSSThemeModule> {
    return {
      ngModule: CSSThemeModule,
      providers: [
        {
          provide: THEMES,
          useValue: options.themes
        },
        {
          provide: ACTIVE_THEME,
          useValue: options.active
        }
      ]
    };
  }
}