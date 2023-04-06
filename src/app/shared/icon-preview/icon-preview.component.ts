import { Component, HostBinding, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-icon-preview',
  template: `<ion-icon [name]="icon"></ion-icon>`,
  styleUrls: ['icon-preview.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class IconPreviewComponent {
  /**
   * The name of the icon to display.
   */
  @Input() icon?: string | null;

  /**
   * The background color of the icon.
   */
  @Input() color?: string | null;

  /**
   * The size of the icon.
   */
  @Input() size: 'small' | 'large' = 'small';

  @HostBinding('style.background-color')
  get backgroundColor() {
    return `var(--color-${this.color})`;
  }
}
