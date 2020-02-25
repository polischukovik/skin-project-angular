import { Component } from '@angular/core';
import { LyTheme2, ThemeVariables } from '@alyle/ui';

const STYLES = (theme: ThemeVariables) => ({
  '@global': {
    body: {
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly classes = this.theme.addStyleSheet(STYLES);

  title = 'skin-site';

  constructor(private theme: LyTheme2) { }

}
