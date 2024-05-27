import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibNavComponent } from '@pokedex/core';

@Component({
  standalone: true,
  imports: [RouterModule, LibNavComponent],
  selector: 'app-root',
  template: `
    <lib-nav class="bg-red-500">
      <img class="h-[50px]"
       src="assets/images/pokedex.png" />
    </lib-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
