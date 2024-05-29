import { JsonPipe, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IPokemon, LazyLoadImageDirective, LibPokeTypeBadgeComponent } from "@pokedex/core";

@Component({
  selector: 'lib-poke-list',
  templateUrl: './lib-poke-list.component.html',
  standalone: true,
  imports: [
    JsonPipe,
    LazyLoadImageDirective,
    LibPokeTypeBadgeComponent,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibPokeListComponent {

  @Input() data: IPokemon[] | null = [];
}