import { JsonPipe, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { LazyLoadImageDirective } from "../../directives";
import { LibPokeTypeBadgeComponent } from "../lib-poke-type-badge";
import { IPokemon } from "../../interfaces";

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