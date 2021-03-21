import { Component } from '@angular/core';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{
    provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
    useValue: { position: 'after' } as MatTooltipDefaultOptions
  }]
})
export class AppComponent {
  title = 'cloud-init-gen';
}
