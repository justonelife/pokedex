import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'lib-nav',
  templateUrl: './lib-nav.component.html',
  standalone: true,
  imports: [
    MenubarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  },
})
export class LibNavComponent {

  @Input() items!: MenuItem[];

}