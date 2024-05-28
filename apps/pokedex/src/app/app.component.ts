import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibNavComponent } from '@pokedex/core';
import { APP_MENU } from './app.consts';
import { PokeService } from 'libs/core/src/services/poke.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [
    RouterModule, 
    LibNavComponent,
  ],
  selector: 'app-root',
  template: `
    <div class="bg-slate-100 min-h-screen">
      <lib-nav class="bg-white mb-4 shadow"
        [items]="APP_MENU">
        <a routerLink="/">
          <img class="h-[50px]"
           src="assets/images/pokedex.png" />
        </a>
      </lib-nav>
      <div class="p-4">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {

  readonly APP_MENU = APP_MENU;
}
