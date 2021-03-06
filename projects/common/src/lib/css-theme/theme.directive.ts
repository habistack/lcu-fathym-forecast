import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols.interface';
import { CssThemeService } from './css-theme.service';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  private _destroy$ = new Subject();

  constructor(
    private _elementRef: ElementRef,
    private _themeService: CssThemeService
  ) {}

  ngOnInit() {
    const active = this._themeService.getActiveTheme();
    if (active) {
      this.updateTheme(active);
    }

    this._themeService.themeChange
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  updateTheme(theme: Theme) {
    // project properties onto the element
    // tslint:disable-next-line:forin
    for (const key in theme.properties) {
      this._elementRef.nativeElement.style.setProperty(key, theme.properties[key]);
    }

    // remove old theme
    for (const name of this._themeService.theme) {
      this._elementRef.nativeElement.classList.remove(`${name}-theme`);
    }

    // alias element with theme name
    this._elementRef.nativeElement.classList.add(`${theme.name}-theme`);
  }

}
