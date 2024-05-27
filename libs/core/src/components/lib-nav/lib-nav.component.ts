import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { LibNavItem } from './models/lib-nav-item.model';
import { ResponsiveScreenService } from '../../services/responsive-screen.service';

@Component({
  selector: 'lib-nav',
  templateUrl: './lib-nav.component.html',
  standalone: true,
  imports: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  },
  providers: [ResponsiveScreenService]
})
export class LibNavComponent {
  public readonly responsiveScreenService = inject(ResponsiveScreenService);

  @Input() items: LibNavItem[] = [];

}