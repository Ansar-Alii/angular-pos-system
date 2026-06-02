import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  private themeService = inject(ThemeService);
  private translate = inject(TranslateService);
  isDark = signal(false);
  
  constructor() {
    this.themeService.initializeTheme();
    this.isDark = this.themeService.isDarkMode;
    effect(() => {
      const isDark = this.isDark();
      const htmlElement = document.documentElement;
      if (isDark) {
        htmlElement.classList.add('dark');
        htmlElement.classList.remove('light');
      } else {
        htmlElement.classList.add('light');
        htmlElement.classList.remove('dark');
      }
    });
    this.translate.setDefaultLanguage('en');
    this.translate.use('en');
  }
}