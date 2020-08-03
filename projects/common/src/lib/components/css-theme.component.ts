
import { Component, OnInit } from '@angular/core';
import { CssThemeService } from '../css-theme/css-theme.service';

@Component({
  selector: 'app-css-theme',
  templateUrl: './css-theme.component.html',
  styleUrls: ['./css-theme.component.scss']
})
export class CssThemeComponent implements OnInit {

  constructor(protected themeService: CssThemeService) { }

  ngOnInit(): void {
  }

  public toggle(): void {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }

}
