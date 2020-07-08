import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Theme, THEMES, ACTIVE_THEME } from './symbols.interface';

@Injectable({
  providedIn: 'root'
})

export class CssThemeService {

  themeChange = new EventEmitter<Theme>();

  constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string
  ) { }

  public getTheme(name: string): any {
    const theme = this.themes.find(t => t.name === name);
    if (!theme) {
      throw new Error(`Theme not found: '${name}'`);
    }
    return theme;
  }

  public getActiveTheme(): any {
    return this.getTheme(this.theme);
  }

  public getProperty(propName: string): any {
    return this.getActiveTheme().properties[propName];
  }

  public setTheme(name: string): void {
    this.theme = name;
    this.themeChange.emit( this.getActiveTheme());
  }

  public registerTheme(theme: Theme): void {
    this.themes.push(theme);
  }

  public updateTheme(name: string, properties: { [key: string]: string; }): void {
    const theme = this.getTheme(name);
    theme.properties = {
      ...theme.properties,
      ...properties
    };

    if (name === this.theme) {
      this.themeChange.emit(theme);
    }
  }
}
