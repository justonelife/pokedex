import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ResponsiveScreenService } from '../../services/responsive-screen.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

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
  providers: [ResponsiveScreenService]
})
export class LibNavComponent {
  public readonly responsiveScreenService = inject(ResponsiveScreenService);

  @Input() items!: MenuItem[];

}